import HospedeBD from "../Persistencia/HospedeBD.js";
import PessoaJuridicaBD from "../Persistencia/PessoaJuridicaBD.js";
import Hospede from "./Hospede.js";

export default class PessoaJuridica{
    #codigo;
    #nome;
    #endereco;
    #email;
    #cnpj;

    constructor(codigo, nome, endereco, email,  cnpj) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#email = email;
        this.#cnpj = cnpj;
    }

    
    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    //METODO NOME
    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    //METODO ENDEREÇO
    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }


    //METODO EMAIL
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }


    //METODO CNPJ
    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "email": this.#email,
            "cnpj": this.#cnpj,
        };
    }

    async gravar(){
        const pessoJurica = new PessoaJuridicaBD
        this.codigo = await pessoJurica.gravarPJ(this)
    }

    async atualizar(){
        const pessoJurica = new PessoaJuridicaBD
        await pessoJurica.alterar(this)
    }

    async excluir(){
        const pessoJurica = new PessoaJuridicaBD
        await pessoJurica.excluir(this)
    }

    async consultar(termo){
        const pessoJurica = new PessoaJuridicaBD
        return await pessoJurica.consultarPJ(termo)
    }



    
}

