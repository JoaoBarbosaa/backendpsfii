import EmprestimoBD from "../Persistencia/EmprestimoBD.js"


export default class Emprestimo{

    #codigo
    #dataEmprestimo
    #pessoa
    #listaExemplares

    constructor(codigo, dataEmprestimo, pessoa, listaExemplares){
        this.#codigo = codigo;
        this.#dataEmprestimo = dataEmprestimo;
        this.#pessoa = pessoa;
        this.#listaExemplares = listaExemplares;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get dataEmprestimo(){
        return this.#dataEmprestimo;
    }

    set dataEmprestimo(novaDataEmprestimo){
        this.#dataEmprestimo = novaDataEmprestimo;
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
            "dataEmprestimo":this.#dataEmprestimo,
            "pessoa"        :this.#pessoa,
            "listaExemplares":this.#listaExemplares
        }
    }

    async gravar() {
        const emprestimoDAO = new EmprestimoBD();
        return await emprestimoDAO.gravar(this);
    }

    async alterar() {
        const emprestimoDAO = new EmprestimoBD();
        return await emprestimoDAO.alterar(this);
    }

    async excluir() {
        const emprestimoDAO = new EmprestimoBD();
        return await emprestimoDAO.excluir(this);
    }

    async consultar() {
        const emprestimoDAO = new EmprestimoBD();
        return await emprestimoDAO.consultar();
    }

    async consultarCodigo(codigo) {
        const emprestimoDAO = new EmprestimoBD();
        return await emprestimoDAO.consultarCodigo(codigo);
    }



}