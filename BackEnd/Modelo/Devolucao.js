import DevolucaoBD from "../Persistencia/DevolucaoBD.js"


export default class Devolucao{

    #codigo
    #dataDevolucao
    #pessoa
    #listaExemplares

    constructor(codigo, dataDevolucao, pessoa, listaExemplares){
        this.#codigo = codigo;
        this.#dataDevolucao = dataDevolucao;
        this.#pessoa = pessoa;
        this.#listaExemplares = listaExemplares;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get dataDevolucao(){
        return this.#dataDevolucao;
    }
    set dataDevolucao(novaDataDevolucao){
        this.#dataDevolucao = novaDataDevolucao;
    }

    get pessoa(){
        return this.#pessoa;
    }
    set pessoa(novaPessoa){
        this.#pessoa = novaPessoa;
    }


    get listaExemplares(){
        return this.#listaExemplares;
    }
    set listaExemplares(novaListaExemplares){
        this.#listaExemplares = novaListaExemplares;
    }

    toJSON(){
        return {
            "codigo"        :this.#codigo,
            "dataDevolucao":this.#dataDevolucao,
            "pessoa"        :this.#pessoa,
            "listaExemplares":this.#listaExemplares
        }
    }

    async gravar() {
        const devolucaoBD = new DevolucaoBD();
        return await devolucaoBD.gravar(this);
    }

    async alterar() {
        const devolucaoBD = new DevolucaoBD();
        return await devolucaoBD.alterar(this);
    }

    async excluir() {
        const devolucaoBD = new DevolucaoBD();
        return await devolucaoBD.excluir(this);
    }

    async consultar() {
        const devolucaoBD = new DevolucaoBD();
        return await devolucaoBD.consultar();
    }

    async consultarCodigo(codigo) {
        const devolucaoBD = new DevolucaoBD();
        return await devolucaoBD.consultarCodigo(codigo);
    }
}