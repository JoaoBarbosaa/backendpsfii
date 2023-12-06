import Hospede from "../Modelo/Hospede.js/index.js";
import conectar from "./Conexao.js";

export default class HospedeBD {

    async adicionar(hospede) {

        if (hospede instanceof Hospede) {
            const conexao = await conectar();
            const sql = "INSERT INTO hospede(cpf,nome,rg,email,telefone,endereco)\
                                            VALUES(?,?,?,?,?,?)";
            const valores = [hospede.cpf, hospede.nome, hospede.rg, hospede.email, hospede.telefone, hospede.endereco];
            const resultado =  await conexao.query(sql,valores);
            return await resultado[0].insertID;
        }

    }

    async alterar(hospede) {

        if (hospede instanceof Hospede) {
            const conexao = await conectar();
            const sql = "UPDATE hospede SET cpf=? nome=?,rg=?,email=?,telefone=?,endereco=?\
                                             WHERE idhospede=?";
            const valores = [hospede.cpf, hospede.nome, hospede.rg, hospede.email, hospede.telefone, hospede.endereco, hospede.idhospede];
            await conexao.query(sql, valores);
        }

    }

    async excluir(hospede) {

        if (hospede instanceof Hospede) {
            const conexao = await conectar();
            const sql = "DELETE FROM hospede WHERE idhospede=?";
            const valores = [hospede.idhospede];
            await conexao.query(sql, valores);
        }

    }

    async consultar(termo) {

        const conexao = await conectar();
        const sql = "SELECT * FROM hospede WHERE nome LIKE ? ORDER BY nome ASC";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaHospedes = [];
        for (const row of rows) {
            const hospede = new Hospede(row['idhospede'], row['cpf'], row['nome'], row['rg'], row['email'], row['telefone'], row['endereco']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }

    async consultaridhospede(idhospede) {

        const conexao = await conectar();
        const sql = "SELECT * FROM hospede WHERE idhospede = ?";
        const valores = [idhospede]
        const [rows] = await conexao.query(sql, valores);
        const listaHospedes = [];
        for (const row of rows) {
            const hospede = new Hospede(row['idhospede'], row['cpf'], row['nome'], row['rg'], row['email'], row['telefone'], row['endereco']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }

    async consultarNome(term) {
        const conexao = await conectar();
        const sql = "SELECT * FROM hospede WHERE nome LIKE ?"
        const valores = [`%${term}%`]
        const [rows] = await conexao.query(sql, valores);
        const listaHospedes = [];
        for (const row of rows) {
            const hospede = new Hospede(row['idhospede'],row['cpf'], row['nome'], row['rg'], row['email'], row['telefone'], row['endereco']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }

}