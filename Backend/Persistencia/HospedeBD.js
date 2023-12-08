import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";
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

            // Verifica se é uma PessoaFisica ou PessoaJuridica
            if (hospede instanceof PessoaFisica) {
                const sqlPessoaFisica = "INSERT INTO pessoafisica (cpf, rg, hospede_codigo) VALUES (?, ?, ?)";
                const valoresPessoaFisica = [hospede.cpf, hospede.rg, resultadoHospede.insertId];
                await conexao.query(sqlPessoaFisica, valoresPessoaFisica);
            } else if (hospede instanceof PessoaJuridica) {
                const sqlPessoaJuridica = "INSERT INTO pessoajuridica (cnpj, hospede_codigo) VALUES (?, ?)";
                const valoresPessoaJuridica = [hospede.cnpj, resultadoHospede.insertId];
                await conexao.query(sqlPessoaJuridica, valoresPessoaJuridica);
            }

            return resultadoHospede.insertId;
        } catch (erro) {
            throw erro;
        }
    }
}



    //funcionando Excluir e consultar

  async alterar(hospede) {
    if(hospede instanceof Hospede) {
        const conexao = await conectar();

        try {
            // Atualizar registros relacionados em pessoafisica
            const sqlPessoaFisica = "UPDATE pessoafisica SET cpf = ?, rg = ? WHERE hospede_codigo = ?";
            const valoresPessoaFisica = [hospede.cpf, hospede.rg, hospede.codigo];
            await conexao.query(sqlPessoaFisica, valoresPessoaFisica);

            // Atualizar registros relacionados em pessoajuridica
            const sqlPessoaJuridica = "UPDATE pessoajuridica SET cnpj = ? WHERE hospede_codigo = ?";
            const valoresPessoaJuridica = [hospede.cnpj, hospede.codigo];
            await conexao.query(sqlPessoaJuridica, valoresPessoaJuridica);

            // Finalmente, atualizar o registro na tabela hospede
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
        const sqlPessoaFisica = "DELETE FROM pessoafisica WHERE hospede_codigo = ?";
        const valoresPessoaFisica = [hospede.codigo];
        await conexao.query(sqlPessoaFisica, valoresPessoaFisica);
  
        // Excluir registros relacionados em pessoajuridica
        const sqlPessoaJuridica = "DELETE FROM pessoajuridica WHERE hospede_codigo = ?";
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
            pf.cpf,
            pf.rg,
            NULL AS cnpj,
            'Pessoa Física' AS tipo,
            t.codigo AS codigoTelefone,
            t.ddd,
            t.numero
        FROM
            hospede h
            LEFT JOIN pessoafisica pf ON h.codigo = pf.hospede_codigo
            LEFT JOIN telefone t ON h.codigo = t.codHospede
        WHERE
            pf.cpf LIKE ?
    
        UNION
    
        SELECT
            h.codigo,
            h.nome,
            h.endereco,
            h.email,
            NULL AS cpf,
            NULL AS rg,
            pj.cnpj,
            'Pessoa Jurídica' AS tipo,
            t.codigo AS codigoTelefone,
            t.ddd,
            t.numero
        FROM
            hospede h
            LEFT JOIN pessoajuridica pj ON h.codigo = pj.hospede_codigo
            LEFT JOIN telefone t ON h.codigo = t.codHospede
        WHERE
            pj.cnpj LIKE ?
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
  }

  ///// Não está funcionado

  async consultarCodigo(codigo) {
    const conexao = await conectar();

    const sql = `
        -- Consulta para Pessoa Física
        SELECT
            h.codigo,
            h.nome,
            h.endereco,
            h.email,
            pf.cpf,
            pf.rg,
            NULL AS cnpj,
            'Pessoa Física' AS tipo,
            t.codigo AS codigoTelefone,
            t.ddd,
            t.numero
        FROM
            hospede h
            LEFT JOIN pessoafisica pf ON h.codigo = pf.hospede_codigo
            LEFT JOIN telefone t ON h.codigo = t.codHospede
        WHERE
            h.codigo = ? AND pf.cpf IS NOT NULL
        
        UNION
        
        -- Consulta para Pessoa Jurídica
        SELECT
            h.codigo,
            h.nome,
            h.endereco,
            h.email,
            NULL AS cpf,
            NULL AS rg,
            pj.cnpj,
            'Pessoa Jurídica' AS tipo,
            t.codigo AS codigoTelefone,
            t.ddd,
            t.numero
        FROM
            hospede h
            LEFT JOIN pessoajuridica pj ON h.codigo = pj.hospede_codigo
            LEFT JOIN telefone t ON h.codigo = t.codHospede
        WHERE
            h.codigo = ? AND pj.cnpj IS NOT NULL
        
        `;

    const valores = [codigo, codigo];
    const [rows] = await conexao.query(sql, valores);

    const resultadoFinal = [];

    for (let i = 0; i < rows.length; i++) {
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
  }


}