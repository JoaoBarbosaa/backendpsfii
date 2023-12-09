import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";
import conectar from "./Conexao.js";

export default class PessoaJuridicaBD {

    async gravarPJ(pessoaJuridica) {
        if (pessoaJuridica instanceof PessoaJuridica) {
            const conexao = await conectar();

            const sql = "INSERT INTO juridica (nome, endereco, email, cnpj) VALUES (?, ?, ?, ?)";
            const valores = [pessoaJuridica.nome, pessoaJuridica.endereco, pessoaJuridica.email, pessoaJuridica.cnpj];

            const [resultado] = await conexao.query(sql, valores);

            pessoaJuridica.codigo = resultado.insertId;

            return resultado.insertId;
        }
    }

    async alterar(pessoaJuridica) {
        if (pessoaJuridica instanceof PessoaJuridica) {
            const conexao = await conectar();

            const sql = "UPDATE juridica SET nome = ?, endereco = ?, email = ?, cnpj = ? WHERE codigo = ?";
            const valores = [pessoaJuridica.nome, pessoaJuridica.endereco, pessoaJuridica.email, pessoaJuridica.cnpj, pessoaJuridica.codigo];

            await conexao.query(sql, valores);
        }
    }

    async excluir(pessoaJuridica) {
        if (pessoaJuridica instanceof PessoaJuridica) {
            const conexao = await conectar();
            const sql = "DELETE FROM juridica WHERE codigo = ?";
            const valor = [pessoaJuridica.codigo];
            await conexao.query(sql, valor);
        }
    }

    async consultarPJ(termo) {
        const conexao = await conectar();
        const termoCnpj = termo ? `%${termo}%` : '%';

        const sql = `
            SELECT
                pj.codigo,
                pj.nome,
                pj.endereco,
                pj.email,
                pj.cnpj,
                t.codigo AS codigoTelefone,
                t.ddd,
                t.numero
            FROM
                juridica pj
            LEFT JOIN
                telefone t ON pj.codigo = t.codHospede
            WHERE
                pj.cnpj LIKE ?;
        `;

        const valores = [termoCnpj];
        const [rows] = await conexao.query(sql, valores);

        const resultadoFinal = [];

        for (let i = 0; i < rows.length; i++) {
            const item = {
                codigo: rows[i].codigo,
                nome: rows[i].nome,
                endereco: rows[i].endereco,
                email: rows[i].email,
                cnpj: rows[i].cnpj,
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
