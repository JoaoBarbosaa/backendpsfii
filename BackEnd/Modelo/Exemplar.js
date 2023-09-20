import ExemplarDB from "../Persistencia/ExemplarBD.js";


export default class Exemplar{

    #codigo;
    #quantidade;
    #dataCadastro;
    #acervo;

    constructor(codigo=0, quantidade=0, dataCadastro="", acervo={}){
        this.#codigo = codigo;
        this.#quantidade = quantidade;
        this.#dataCadastro = dataCadastro;
        this.#acervo = acervo;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get quantidade(){
        return this.#quantidade;
    }
    set quantidade(novaQuantidade){
        this.#quantidade = novaQuantidade;
    }

    get dataCadastro(){
        return this.#dataCadastro;
    }
    set dataCadastro(novaDataCadastro){
        this.#dataCadastro = novaDataCadastro;
    }
    get acervo(){
        return this.#acervo;
    }
    set acervo(novoAcervo){
        this.#acervo = novoAcervo;
    }
    

    toJSON(){
        return {
            "codigo"      :this.#codigo,
            "quantidade"  :this.#quantidade,
            "dataCadastro":this.#dataCadastro,
            "acervo"      :this.#acervo
        }
    }


    async gravar(){
        const exemplarDB = new ExemplarDB();
        this.#codigo = await exemplarDB.incluir(this);
    }

    async atualizar(){
        const exemplarDB = new ExemplarDB();
        await exemplarDB.alterar(this);
    }

    async remover(){
        const exemplarDB = new ExemplarDB();
        await exemplarDB.excluir(this);
    }

    async consultar(termo){
        const exemplarDB = new ExemplarDB();
        const exemplar = await exemplarDB.consultar(termo);
        return exemplar;
    }

}