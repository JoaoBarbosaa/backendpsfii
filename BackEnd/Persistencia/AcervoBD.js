import Acervo from "../Modelo/Acervo.js"
import conectar from "./Conexao.js";

export default class AcervoBD{

    async incluir(acervo){

        if(acervo instanceof Acervo){
            const conexao = await conectar();
            const sql = "INSERT INTO acervo(tituloDoLivro, editora, edicao, anoDePublicacao) VALUES(?,?,?,?)"
            const valores = [acervo.tituloDoLivro,acervo.editora,acervo.edicao,acervo.anoDePublicacao]
            const resultado =  await conexao.query(sql,valores);
            return await resultado[0].insertID;
        }
    }

    async alterar(acervo){
        if(acervo instanceof Acervo){
            const conexao = await conectar();
            const sql = "UPDATE acervo SET tituloDoLivro=?, editora=?, edicao=?, anoDePublicacao=? WHERE codigoRegisto=? "
            const valores = [acervo.tituloDoLivro, acervo.editora, acervo.edicao, acervo.anoDePublicacao, acervo.codigoRegisto]
            await conexao.query(sql, valores)
        }
    }

    async excluir(acervo){
        if(acervo instanceof Acervo){
            const conexao = await conectar();
            const sql = "DELETE FROM acervo WHERE codigoRegisto=?";
            const valores = [acervo.codigoRegisto]
            await conexao.query(sql, valores)
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM acervo WHERE tituloDoLivro LIKE ? ORDER BY tituloDoLivro ASC";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);

        const listaLivros = [];

        for(const row of rows){
            const acervo = new Acervo(row['codigoRegisto'],row['tituloDoLivro'],row['editora'],row['edicao'],row['anoDePublicacao']);
            listaLivros.push(acervo);
        }
        return listaLivros
    }

    async consultarcodigoRegisto(codigoRegisto){
        const conexao = await conectar();
        const sql = "SELECT * FROM acervo WHERE codigoRegisto = ?";
        const valores = [codigoRegisto]
        const [rows] = await conexao.query(sql, valores);

        const listaLivros = [];

        for(const row of rows){
            const acervo = new Acervo(row['codigoRegisto'],row['tituloDoLivro'],row['editora'],row['edicao'],row['anoDePublicacao']);
            listaLivros.push(acervo);
        }
        return listaLivros;
    }

    async consultarTituloDoLivro(term){
        const conexao = await conectar();
        const sql = "SELECT * FROM acervo WHERE tituloDoLivro LIKE ?";
        const valores = [`%${term}%`]
        const [rows] = await conexao.query(sql, valores);

        const listaLivros = [];

        for(const row of rows){
            const acervo = new Acervo(row['codigoRegisto'],row['tituloDoLivro'],row['editora'],row['edicao'],row['anoDePublicacao']);
            listaLivros.push(acervo);
        }
        return listaLivros;
    }


    
}