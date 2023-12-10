import Hospede from "../Modelo/Hospede.js";
import conectar from "./Conexao.js";


export default class HospedeBD {

  async gravarHospede(hospede) {
    if (hospede instanceof Hospede) {
        const conexao = await conectar();

        try {
            const sqlHospede = "INSERT INTO hospede (nome, endereco, email) VALUES (?, ?, ?)";
            const valoresHospede = [hospede.nome, hospede.endereco, hospede.email];

            const [resultadoHospede] = await conexao.query(sqlHospede, valoresHospede);

            hospede.codigo = resultadoHospede.insertId;

            return resultadoHospede.insertId;
        } catch (erro) {
            throw erro;
        }
    }
}

  async alterar(hospede) {
    if(hospede instanceof Hospede) {
        const conexao = await conectar();

        try {
            const sqlHospede = "UPDATE hospede SET nome = ?, endereco = ?, email = ? WHERE codigo = ?";
            const valoresHospede = [hospede.nome, hospede.endereco, hospede.email, hospede.codigo];
            await conexao.query(sqlHospede, valoresHospede);
        }
        catch(erro) {
            throw erro;
        }
    }
}


  async excluir(hospede) {
    if(hospede instanceof Hospede) {
      const conexao = await conectar();

      try {
        const sqlPessoaFisica = "DELETE FROM pessoafisica WHERE codHospede = ?";
        const valoresPessoaFisica = [hospede.codigo];
        await conexao.query(sqlPessoaFisica, valoresPessoaFisica);
  
        // Excluir registros relacionados em pessoajuridica
        const sqlPessoaJuridica = "DELETE FROM pessoajuridica WHERE codHospede = ?";
        const valoresPessoaJuridica = [hospede.codigo];
        await conexao.query(sqlPessoaJuridica, valoresPessoaJuridica);
  
        // Finalmente, excluir o registro na tabela hospede
        const sqlHospede = "DELETE FROM hospede WHERE codigo = ?";
        const valoresHospede = [hospede.codigo];
        await conexao.query(sqlHospede, valoresHospede);


      }
      catch(erro) {
        throw erro;
      }

    }
}


async consultar(termo) {
    const conexao = await conectar();

    const termoCpf = termo ? `%${termo}%` : '%';
    const termoCnpj = termo ? `%${termo}%` : '%';

    const sql = `
                SELECT
                    h.codigo,
                    h.nome,
                    h.endereco,
                    h.email,
                    pf.cpfUsuario AS documento,
                    pf.rgUsuario AS documentoSecundario,
                    NULL AS cnpj,
                    'Pessoa Física' AS tipo,
                    t.codigo AS codigoTelefone,
                    t.ddd,
                    t.numero
                FROM
                    hospede h
                    LEFT JOIN pessoafisica pf ON h.codigo = pf.codHospede
                    LEFT JOIN telefone t ON h.codigo = t.codHospede
                WHERE
                    pf.cpfUsuario LIKE ?

                UNION

                SELECT
                    h.codigo,
                    h.nome,
                    h.endereco,
                    h.email,
                    NULL AS documento,
                    NULL AS documentoSecundario,
                    pj.cnpjUsuario AS cnpj,
                    'Pessoa Jurídica' AS tipo,
                    t.codigo AS codigoTelefone,
                    t.ddd,
                    t.numero
                FROM
                    hospede h
                    LEFT JOIN pessoajuridica pj ON h.codigo = pj.codHospede
                    LEFT JOIN telefone t ON h.codigo = t.codHospede
                WHERE
                    pj.cnpjUsuario LIKE ?
                ORDER BY codigo;
            `;

    const valores = [termoCpf, termoCnpj];
    const [rows] = await conexao.query(sql, valores);

    const resultadoFinal = [];

    for (let i = 0; i < rows.length; i++) {
        const item = {
            codigo: rows[i].codigo,
            nome: rows[i].nome,
            endereco: rows[i].endereco,
            email: rows[i].email,
            tipo: rows[i].tipo,
            telefones: []  
        };


        if (rows[i].codigoTelefone) {
            const telefone = {
                codigoTelefone: rows[i].codigoTelefone,
                ddd: rows[i].ddd,
                numero: rows[i].numero
            };
            item.telefones.push(telefone);
        }

        if (rows[i].tipo === 'Pessoa Física') {
            item.cpf = rows[i].documento; 
            item.rg = rows[i].documentoSecundario; 
        } else if (rows[i].tipo === 'Pessoa Jurídica') {
            item.cnpj = rows[i].cnpj;
        }

        const existingEntry = resultadoFinal.find(entry => entry.codigo === item.codigo);

        if (existingEntry) {
            existingEntry.telefones.push(...item.telefones);
        } else {
            resultadoFinal.push(item);
        }
    }

    return resultadoFinal;
}


  
  async consultarPorCodigo(codigo) {
    const conexao = await conectar();
    const sql = `
    SELECT
        h.codigo,
        h.nome,
        h.endereco,
        h.email,
        pf.cpfUsuario AS cpf,
        pf.rgUsuario AS rg,
        pj.cnpjUsuario AS cnpj,
        CASE
            WHEN pf.cpfUsuario IS NOT NULL THEN 'Pessoa Física'
            WHEN pj.cnpjUsuario IS NOT NULL THEN 'Pessoa Jurídica'
        END AS tipo,
        t.codigo AS codigoTelefone,
        t.ddd,
        t.numero
    FROM
        hospede h
        LEFT JOIN pessoafisica pf ON h.codigo = pf.codHospede
        LEFT JOIN pessoajuridica pj ON h.codigo = pj.codHospede
        LEFT JOIN telefone t ON h.codigo = t.codHospede
    WHERE
        h.codigo = ?;
    `;

    try {
        // Executa a consulta
        const [rows] = await conexao.query(sql, [codigo]);

        const resultadoFinal = [];

        for (let i = 0; i < rows.length; i++) {
            // Processa os resultados
            const item = {
                codigo: rows[i].codigo,
                nome: rows[i].nome,
                endereco: rows[i].endereco,
                email: rows[i].email,
                tipo: rows[i].tipo,
                telefones: {
                    codigoTelefone: rows[i].codigoTelefone,
                    ddd: rows[i].ddd,
                    numero: rows[i].numero
                }
            };

            if (rows[i].tipo === 'Pessoa Física') {
                item.cpf = rows[i].cpf;
                item.rg = rows[i].rg;
            } else if (rows[i].tipo === 'Pessoa Jurídica') {
                item.cnpj = rows[i].cnpj;
            }

            resultadoFinal.push(item);
        }

        return resultadoFinal;
    } catch (erro) {
        console.error(erro);
        throw erro;
<<<<<<< HEAD
    }}
=======
    }

}
>>>>>>> b14a8985a15665cf556b38d191cbd8fa5b6ce9d2


}