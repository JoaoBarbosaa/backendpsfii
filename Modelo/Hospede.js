import HospedeBD from "../Persistencia/HospedeBD.js";

export default class Hospede {

    #cpf;
    #nome;
    #rg;
    #email;
    #telefone;
    #endereco;

    constructor(cpf, nome, rg, email, telefone, endereco) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#rg = rg;
        this.#email = email;
        this.#telefone = telefone;
        this.#endereco = endereco;
    }

    //METODO CPF
    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    //METODO NOME
    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    //METODO RG
    get rg() {
        return this.#rg;
    }
    set rg(novoRg) {
        this.#rg = novoRg;
    }

    //METODO EMAIL
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    //METODO TELEFONE
    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTel) {
        this.#telefone = novoTel;
    }

    //METODO ENDEREÇO
    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEnd) {
        this.#endereco = novoEnd;
    }


    toJSON() {
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "rg": this.#rg,
            "email": this.#email,
            "telefone": this.#telefone,
            "endereco": this.#endereco,
        }
    }

    async gravar() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.adicionar(this);
    }

    async atualizar() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.alterar(this);
    }

    async removerDoBancoDeDados() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.excluir(this);
    }

    async consultar(termo) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultar(termo);
        return hospedes;
    }

    async consultarCPF(cpf) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarCPF(cpf);
        return hospedes;
    }

    async consultarNome(nome){
      const hospedeBD = new HospedeBD();
      const hospedes = await hospedeBD.consultarNome(nome);
      return hospedes;
    }

}