import HospedePessoaJuridica from "../Modelo/HospedeJuridico.js";
import conectar from "./Conexao.js";

export default class PessoaJuridicaBD {

    async gravarPJ(pessoaJuridica) {
        if (pessoaJuridica instanceof HospedePessoaJuridica) {
            const conexao = await conectar();

            const sql = "INSERT INTO pessoajuridica (cnpjUsuario, codHospede) VALUES (?, ?)";
            const valores = [pessoaJuridica.cnpjUsuario, pessoaJuridica.codHospede];

            const [resultado] = await conexao.query(sql, valores);
        }
    }

    async alterar(pessoaJuridica) {
        if (pessoaJuridica instanceof HospedePessoaJuridica) {
            const conexao = await conectar();

            const sql = "UPDATE pessoajuridica SET cnpjUsuario  WHERE codHospede = ?";
            const valores = [pessoaJuridica.cnpjUsuario, pessoaJuridica.codHospede];

            await conexao.query(sql, valores);
        }
    }

    async excluir(pessoaJuridica) {
        if (pessoaJuridica instanceof HospedePessoaJuridica) {
            const conexao = await conectar();
            const sql = "DELETE FROM pessoajuridica WHERE codHospede = ?";
            const valor = [pessoaJuridica.codigo];
            await conexao.query(sql, valor);
        }
    }

    async consultarPJ(termo) {
        const conexao = await conectar();
        const termoCnpj = termo ? `%${termo}%` : '%';

        const sql = `
                        SELECT
                            h.codigo,
                            h.nome,
                            h.endereco,
                            h.email,
                            pj.cnpjUsuario,
                            t.codigo AS codigoTelefone,
                            t.ddd,
                            t.numero
                        FROM
                            hospede h
                        LEFT JOIN
                            pessoajuridica pj ON h.codigo = pj.codHospede
                        LEFT JOIN
                            telefone t ON pj.codigo = t.codHospede
                        WHERE
                            pj.cnpjUsuario LIKE ?;
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
