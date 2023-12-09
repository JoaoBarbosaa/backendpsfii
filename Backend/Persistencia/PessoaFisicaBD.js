import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";

import conectar from "./Conexao.js";


export default class PessoaFisicaBD {

    async gravarPF(pessoafisica) {
        if (pessoafisica instanceof PessoaFisica) {
            const conexao = await conectar();

            const sql = "INSERT INTO pessoafisica ( cpfUsuario, rgUsuario, codHospede) VALUES (?, ?, ?)";
            const valores = [pessoafisica.cpfUsuario, pessoafisica.rgUsuario, pessoafisica.codHospede];

            const [resultado] = await conexao.query(sql, valores);
            
        }
    }



    //funcionando Excluir e consultar

    async alterar(pessoaFisica) {

        if (pessoaFisica instanceof PessoaFisica) {
            const conexao = await conectar();

            const sql = "UPDATE fisica SET nome = ?, endereco = ?, email = ?, cpf = ?, rg = ? WHERE codigo = ?";
            const valores = [pessoaFisica.nome, pessoaFisica.endereco, pessoaFisica.email, pessoaFisica.cpf, pessoaFisica.rg, pessoaFisica.codigo];

            await conexao.query(sql, valores);
        }

    }



    async excluir(pessoaFisica) {
        
        if (pessoaFisica instanceof PessoaFisica) {
            const conexao = await conectar();
            const sql = "DELETE FROM fisica WHERE codigo = ?";
            const valor = [pessoaFisica.codigo];
            await conexao.query(sql, valor);

        }
    }


    async consultarPF(termo) {
        const conexao = await conectar();

        const termoCpf = termo ? `%${termo}%` : '%';
        const termoCnpj = termo ? `%${termo}%` : '%';

        const sql = `
        SELECT
            pf.codigo,
            pf.nome,
            pf.endereco,
            pf.email,
            pf.cpf,
            pf.rg,
            t.codigo AS codigoTelefone,
            t.ddd,
            t.numero
            FROM
                fisica pf
            LEFT JOIN
                telefone t ON pf.codigo = t.codHospede
            WHERE
                pf.cpf LIKE ?;

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
                cpf: rows[i].cpf,
                rg: rows[i].rg,
                telefones: {
                    codigoTelefone: rows[i].codigoTelefone,
                    ddd: rows[i].ddd,
                    numero: rows[i].numero
                }

            };

            resultadoFinal.push(item);
        }

        return resultadoFinal;
    }

}