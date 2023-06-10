import Autor from "../Modelo/Autor.js";
import conectar from "./Conexao.js";


export default class {

    async incluir(autor){
        if (autor instanceof Autor){
            const conexao = await conectar();
            const sql = "INSERT INTO autor(nome,nacionalidade) \
            VALUES(?,?)";
            const valores = [autor.nome,autor.nacionalidade];
            const resultado = await conexao.query(sql,valores)
            return await resultado[0].insertId;
        }
    }


    async alterar(autor){
        if (autor instanceof Autor){
            const conexao = await conectar();
            const sql = "UPDATE autor SET nome=?, nacionalidade = ? WHERE codigo=?";

            const valores = [autor.nome,autor.nacionalidade,autor.codigo];
            await conexao.query(sql,valores)
        }
    }


    async excluir(autor){
        if (autor instanceof Autor){
            const conexao = await conectar();
            const sql = "DELETE FROM autor WHERE codigo=?";
            const valores = [autor.codigo];
            await conexao.query(sql,valores)
        }
    }



    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM autor WHERE nome LIKE ? ORDER BY nome ASC"
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaAutor = [];
        for(const row of rows){
            const autor = new Autor(row['codigo'],row['nome'],row['nacionalidade']);
            listaAutor.push(autor)
        }
        return listaAutor;
    }


    
    async consultarCodigo(codigo){
        const conexao = await conectar();
        const sql = "SELECT * FROM autor WHERE codigo = ?"
        const valores = [codigo]
        const [rows] = await conexao.query(sql, valores);
        const listaAutor = [];
        for(const row of rows){
            const autor = new Autor(row['codigo'],row['nome'],row['nacionalidade']);
            listaAutor.push(autor)
        }
        return listaAutor;
    }

    async consultarNome(term){
        const conexao = await conectar();
        const sql = "SELECT * FROM autor WHERE nome LIKE ?"
        const valores = [`%${term}%`]
        const [rows] = await conexao.query(sql, valores);
        const listaAutor = [];
        for(const row of rows){
            const autor = new Autor(row['codigo'],row['nome'],row['nacionalidade']);
            listaAutor.push(autor)
        }
        return listaAutor;
    }
}