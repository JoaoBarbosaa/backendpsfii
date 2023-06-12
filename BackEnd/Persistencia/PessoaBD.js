import Pessoa from "../Modelo/Pessoa.js";
import conectar from "./Conexao.js";

export default class PessoaBD {

    async adicionar(pessoa) {

        if (pessoa instanceof Pessoa) {
            const conexao = await conectar();
            const sql = "INSERT INTO pessoa(cpf,categoria,nome,sexo,email,telefone,cidade,endereco,cep,dataNasc)\
                                            VALUES(?,?,?,?,?,?,?,?,?,?)";
            const valores = [pessoa.cpf, pessoa.categoria, pessoa.nome, pessoa.sexo, pessoa.email,
            pessoa.telefone, pessoa.cidade, pessoa.endereco, pessoa.cep, pessoa.dataNasc];
            await conexao.query(sql, valores);
        }

    }

    async alterar(pessoa) {

        if (pessoa instanceof Pessoa) {
            const conexao = await conectar();
            const sql = "UPDATE pessoa SET categoria=?,nome=?,sexo=?,email=?,telefone=?,cidade=?,endereco=?,cep=?,dataNasc=?\
                                             WHERE cpf=?";
            const valores = [pessoa.categoria, pessoa.nome, pessoa.sexo, pessoa.email, pessoa.telefone,
            pessoa.cidade, pessoa.endereco, pessoa.cep, pessoa.dataNasc, pessoa.cpf];
            await conexao.query(sql, valores);
        }

    }

    async excluir(pessoa) {

        if (pessoa instanceof Pessoa) {
            const conexao = await conectar();
            const sql = "DELETE FROM pessoa WHERE cpf=?";
            const valores = [pessoa.cpf];
            await conexao.query(sql, valores);
        }

    }

    async consultar(termo) {

        const conexao = await conectar();
        const sql = "SELECT * FROM pessoa WHERE nome LIKE ? ORDER BY nome ASC";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaPessoas = [];
        for (const row of rows) {
            const pessoa = new Pessoa(row['cpf'], row['categoria'], row['nome'], row['sexo'], row['email'], row['telefone'],
                row['cidade'], row['endereco'], row['cep'], row['dataNasc']);
            listaPessoas.push(pessoa);
        }
        return listaPessoas;
    }

    async consultarCPF(cpf) {

        const conexao = await conectar();
        const sql = "SELECT * FROM pessoa WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql, valores);
        const listaPessoas = [];
        for (const row of rows) {
            const pessoa = new Pessoa(row['cpf'], row['categoria'], row['nome'], row['sexo'], row['email'], row['telefone'],
                row['cidade'], row['endereco'], row['cep'], row['dataNasc']);
            listaPessoas.push(pessoa);
        }
        return listaPessoas;
    }

    async consultarNome(term) {
        const conexao = await conectar();
        const sql = "SELECT * FROM pessoa WHERE nome LIKE ?"
        const valores = [`%${term}%`]
        const [rows] = await conexao.query(sql, valores);
        const listaPessoas = [];
        for (const row of rows) {
            const pessoa = new Pessoa(row['cpf'], row['categoria'], row['nome'], row['sexo'], row['email'], row['telefone'],
                row['cidade'], row['endereco'], row['cep'], row['dataNasc']);
            listaPessoas.push(pessoa);
        }
        return listaPessoas;
    }

}