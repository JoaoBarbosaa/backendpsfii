import Hospede from "./Conexao.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";
import conectar from "./Conexao.js";


export default class HospedeBD {

    async gravar(hospede) {
        const conexao = await conectar();

        const sql = "INSERT INTO hospede (nome, email, endereco) VALUES (?, ?, ?)";
        const valores = [hospede.nome, hospede.email, hospede.endereco];

        const [resultado] = await conexao.query(sql, valores);

        if (resultado.affectedRows !== 1) {
            throw new Error("Falha ao inserir hospede.");
        }

        return resultado.insertId;
    }

    async gravarPessoaFisica(hospede) {
        const conexao = await conectar();

        const sql = "INSERT INTO pessoafisica (hospede_codigo, cpf, rg) VALUES (?, ?, ?)";
        const valores = [hospede.codigo, hospede.cpf, hospede.rg];

        const [resultado] = await conexao.query(sql, valores);

        if (resultado.affectedRows !== 1) {
            throw new Error("Falha ao inserir pessoa física.");
        }

        return resultado.insertId;
    }

    async gravarPessoaJuridica(hospede) {
        const conexao = await conectar();

        const sql = "INSERT INTO pessoajuridica (hospede_codigo, cnpj) VALUES (?, ?)";
        const valores = [hospede.codigo, hospede.cnpj];

        const [resultado] = await conexao.query(sql, valores);

        if (resultado.affectedRows !== 1) {
            throw new Error("Falha ao inserir pessoa jurídica.");
        }

        return resultado.insertId;
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