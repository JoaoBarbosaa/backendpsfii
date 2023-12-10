import HospedePessoaFisica from "../Modelo/HospedeFisico.js";
import conectar from "./Conexao.js";


export default class PessoaFisicaBD {

    async gravarPF(pessoafisica) {
        if (pessoafisica instanceof HospedePessoaFisica) {
            const conexao = await conectar();

            const sql = "INSERT INTO pessoafisica ( cpfUsuario, rgUsuario, codHospede) VALUES (?, ?, ?)";
            const valores = [pessoafisica.cpfUsuario, pessoafisica.rgUsuario, pessoafisica.codHospede];

            const [resultado] = await conexao.query(sql, valores);
            
        }
    }


    async atualizarpf(pessoaFisica) {

        if (pessoaFisica instanceof HospedePessoaFisica) {
            const conexao = await conectar();

            const sql = "UPDATE pessoafisica SET cpfUsuario = ?, rgUsuario = ? WHERE codHospede = ?";
            const valores = [pessoaFisica.cpfUsuario, pessoaFisica.rgUsuario, pessoaFisica.codHospede];

            await conexao.query(sql, valores);
        }

    }



    async excluir(pessoaFisica) {
        
        if (pessoaFisica instanceof HospedePessoaFisica) {
            const conexao = await conectar();
            const sql = "DELETE FROM pessoafisica WHERE codHospede = ?";
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
                    SELECT
                    h.codigo,
                    h.nome,
                    h.endereco,
                    h.email,
                    pf.cpfUsuario,
                    pf.rgUsuario,
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