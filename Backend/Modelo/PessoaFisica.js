import HospedeBD from "../Persistencia/HospedeBD.js";
import PessoaFisicaBD from "../Persistencia/PessoaFisicaBD.js";
import Hospede from "./Hospede.js";

export default class PessoaFisica {
    #codigo;
    #nome;
    #endereco;
    #email;
    #cpf;
    #rg;


    constructor(codigo, nome, endereco, email, cpf, rg) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#email = email;
        this.#cpf = cpf;
        this.#rg = rg;
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

    //METODO CPF
    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    //METODO RG
    get rg() {
        return this.#rg;
    }

    set rg(novoRg) {
        this.#rg = novoRg;
    }

    toJSON() {
        return {
           "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "email": this.#email,
            "cpf": this.#cpf,
            "rg": this.#rg,
        };
    }

    async gravar() {
        const pessoaFisicaBD = new PessoaFisicaBD();
        this.codigo = await pessoaFisicaBD.gravarPF(this);
    }

    async atualizar() {
        const pessoaFisicaBD = new PessoaFisicaBD();
        await pessoaFisicaBD.alterar(this);
    }

    async excluir() {
        const pessoaFisicaBD = new PessoaFisicaBD();
        await pessoaFisicaBD.excluir(this);
    }

    async consultar(termo) {
        const pessoaFisicaBD = new PessoaFisicaBD();
        const resultado = await pessoaFisicaBD.consultarPF(termo);
        return resultado;
    }

}
