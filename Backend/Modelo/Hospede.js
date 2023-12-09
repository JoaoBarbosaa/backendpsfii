import HospedeBD from "../Persistencia/HospedeBD.js";

export default class Hospede {

    #codigo;
    #nome;
    #endereco;
    #email;


    constructor(codigo = 0, nome, endereco, email) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#email = email;

    }

    //METODO CODIGO
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


    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "email": this.#email,
        };
    }

    async gravar() {
        const hospedeBD = new HospedeBD();
        this.#codigo = await hospedeBD.gravarHospede(this);
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

    async consultarCodigo(codigo) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarCodigo(codigo);
        return hospedes;
    }

    async consultarNome(nome) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarNome(nome);
        return hospedes;
    }
}
