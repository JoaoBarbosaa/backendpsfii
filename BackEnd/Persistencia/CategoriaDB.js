import Categoria from "../Modelo/categoria.js";
import conectar from "./Conexao.js";

export default class {

    async incluir(categoria){

        if (categoria instanceof Categoria){
            const conexao = await conectar();
            const sql="INSERT INTO categoria(categoria) VALUES(?)";
            const valores = [categoria.categoria];
            const resultado = await conexao.query(sql,valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(categoria){

        if (categoria instanceof Categoria){
            const conexao = await conectar();
            const sql="UPDATE categoria SET categoria=? WHERE codigo=?";
            const valores = [categoria.categoria,categoria.codigo];
            await conexao.query(sql,valores);
        }
    }

    async excluir(categoria){

        if (categoria instanceof Categoria){
            const conexao = await conectar();
            const sql="DELETE FROM categoria WHERE codigo=?";
            const valores = [categoria.codigo];
            await conexao.query(sql,valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM  categoria WHERE categoria LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaCategoria = [];
        for(const row of rows){
            const categoria = new Categoria(row['codigo'],row['categoria']);
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }

    async consultarCodigo(codigo){
        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE codigo = ?";
        const valores = [codigo]
        const [rows] = await conexao.query(sql, valores);
        const listaCategoria = [];
        for(const row of rows){
            const categoria = new Categoria(row['codigo'],row['categoria']);
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }

    async consultarCategoria(term){
        const conexao = await conectar();
        const sql = "SELECT * FROM categoria WHERE categoria LIKE ?";
        const valores = [`%${term}%`]
        const [rows] = await conexao.query(sql, valores);

        const listaCategoria = [];

        for(const row of rows){
            const categoria = new Categoria(row['codigo'],row['categoria']);
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }
}