import CategoriaDB from "../Persistencia/CategoriaDB.js";

export default class Categoria{

    #codigo;
    #categoria;

    constructor(codigo, categoria){
        this.#codigo = codigo;
        this.#categoria = categoria;


    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get categoria(){
        return this.#categoria;
    }
    set categoria(novaCategoria){
        this.#categoria = novaCategoria;
    }

    toJSON(){
        return {
            "codigo":this.#codigo,
            "categoria":this.#categoria,
        }
    }

    async gravar(){
        const catDB = new CategoriaDB();
        this.codigo = await catDB.incluir(this);
    }

    async remover(){
        const catDB = new CategoriaDB();
        await catDB.excluir(this);
    }

    async atualizar(){
        const catDB = new CategoriaDB();
        await catDB.alterar(this);
    }

    async consultar(termo){
        const catDB = new CategoriaDB();
        const categorias = await catDB.consultar(termo);
        return categorias;
    }

    async consultarCodigo(codigo){
        const catDB = new CategoriaDB();
        const categoria = await catDB.consultarCodigo(codigo);
        return categoria;
    }

    async consultarCategoria(tituloCategoria){
        const CatDB = new CategoriaDB();
        const categoria = await CatDB.consultarCategoria(tituloCategoria);
        return categoria
      }
}