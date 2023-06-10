import Usuario from "../Modelo/Usuario.js";
import conectar from "./Conexao.js";

export default class UsuarioBD{

    async adicionar(usuario){

        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "INSERT INTO usuario(cpf,nome,senha)\
                                            VALUES(?,?,?)";
            const valores = [usuario.cpf,usuario.nome,usuario.senha];
            await conexao.query(sql,valores);
        }

    }

    async alterar(usuario){

        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "UPDATE usuario SET nome=?, senha = ? WHERE cpf=?";
            const valores = [usuario.nome,usuario.senha,usuario.cpf];
            await conexao.query(sql,valores);
        }

    }

    async excluir(usuario){
        
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "DELETE FROM usuario WHERE cpf=?";
            const valores = [usuario.cpf];
            await conexao.query(sql,valores);
        }

    }

    async consultar(termo){

        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE nome LIKE ? ORDER BY nome ASC";
        const valores = ['%'+termo+'%']
        const [rows] = await conexao.query(sql,valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuario = new Usuario(row['cpf'],row['nome'],row['senha']);
            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }

    async consultarCPF(cpf){
        
        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql,valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuario = new Usuario(row['cpf'],row['nome'],row['senha']);
                            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }

    async consultarNome(term){
        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE nome LIKE ?"
        const valores = [`%${term}%`]
        const [rows] = await conexao.query(sql, valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuario = new Usuario(row['cpf'],row['nome'],row['senha']);
            listaUsuarios.push(usuario)
        }
        return listaUsuarios;
    }
}