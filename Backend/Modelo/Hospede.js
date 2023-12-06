// Hospede.js
import HospedeBD from "../Persistencia/HospedeBD.js";

export default class Hospede {
    #codigo;
    #nome;
    #email;
    #telefones;
    #endereco;

    constructor(codigo, nome, email, telefones, endereco) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#telefones = telefones || [];
        this.#endereco = endereco;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {

        this.#codigo = novoCodigo;
    }

    get telefones() {
        return this.#telefones;
    }

    set telefones(novosTelefones) {
        this.#telefones = novosTelefones;
    }

    // Métodos para adicionar, remover, consultar telefones, etc.

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "email": this.#email,
            "telefones": this.#telefones.map(telefone => telefone.toJSON()),
            "endereco": this.#endereco,
        };
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

    async consultarNome(nome) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarNome(nome);
        return hospedes;
    }
}
