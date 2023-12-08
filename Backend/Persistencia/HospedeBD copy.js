import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";
import conectar from "./Conexao.js";


export default class HospedeBD {

  async gravarHospede(hospede) {
    const conexao = await conectar();

    try {
        const sql = "INSERT INTO hospede (nome, email, endereco) VALUES (?, ?, ?)";
        const valores = [hospede.nome, hospede.email, hospede.endereco];

        const [resultado] = await conexao.query(sql, valores);

        hospede.codigo = resultado.insertId;

        // Verifica se é uma PessoaFisica
        if (hospede instanceof PessoaFisica) {
            const sqlPessoaFisica = "INSERT INTO pessoafisica (cpf, rg, hospede_codigo) VALUES (?, ?, ?)";
            const valoresPessoaFisica = [hospede.cpf, hospede.rg, resultado.insertId];
            await conexao.query(sqlPessoaFisica, valoresPessoaFisica);
        }
        // Verifica se é uma PessoaJuridica
        else if (hospede instanceof PessoaJuridica) {
            const sqlPessoaJuridica = "INSERT INTO pessoajuridica (cnpj, hospede_codigo) VALUES (?, ?)";
            const valoresPessoaJuridica = [hospede.cnpj, resultado.insertId];
            await conexao.query(sqlPessoaJuridica, valoresPessoaJuridica);
        }

        return resultado.insertId;
    } catch (erro) {
        throw erro;
    }
}

    




  async atualizar(hospede) {
    const conexao = await conectar();

    const sql = "UPDATE hospede SET nome = ?, email = ?, endereco = ? WHERE codigo = ?";
    const valores = [hospede.nome, hospede.email, hospede.endereco, hospede.codigo];

    const [resultado] = await conexao.query(sql, valores);

    if (resultado.affectedRows !== 1) {
      throw new Error("Falha ao atualizar o hóspede.");
    }
  }

  async excluir(codigo) {
    const conexao = await conectar();

    const excluirPessoaFisicaSQL = "DELETE FROM pessoafisica WHERE hospede_codigo = ?";
    await conexao.query(excluirPessoaFisicaSQL, [codigo]);

    // Excluir dados da tabela pessoa juridica
    const excluirPessoaJuridicaSQL = "DELETE FROM pessoajuridica WHERE hospede_codigo = ?";
    await conexao.query(excluirPessoaJuridicaSQL, [codigo]);
    // Excluir dados da tabela hospede
    const excluirHospedeSQL = "DELETE FROM hospede WHERE codigo = ?";
    const [resultadoExclusao] = await conexao.query(excluirHospedeSQL, [codigo]);

    // Verificar se a exclusão foi bem-sucedida
    if (resultadoExclusao.affectedRows !== 1) {
      throw new Error("Falha ao excluir hospede.");
    }

    // Retorna true para indicar que a exclusão foi bem-sucedida
    return true;
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