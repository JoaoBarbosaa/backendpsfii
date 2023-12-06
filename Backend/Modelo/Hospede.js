import HospedeBD from "../Persistencia/HospedeBD.js";

export default class Hospede {
    #idhospede;
    #nome;
    #email;
    #telefones;
    #endereco;

    constructor(idhospede, nome, email, telefones, endereco) {
        this.#idhospede = idhospede;
        this.#nome = nome;
        this.#email = email;
        this.#telefones = telefones || [];
        this.#endereco = endereco;
    }

    get idhospede() {
        return this.#idhospede;
    }

    set idhospede(novoidhospede) {

        this.#idhospede = novoidhospede;
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
            "idhospede": this.#idhospede,
            "nome": this.#nome,
            "email": this.#email,
            "telefones": this.#telefones.map(telefone => telefone.toJSON()),
            "endereco": this.#endereco,
        };
    }

    async gravar() {
        const hospedeBD = new HospedeBD();
        this.idhospede = await hospedeBD.incluir(this);
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

    async consultaridhospede(idhospede) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultaridhospede(idhospede);
        return hospedes;
    }

    async consultarNome(nome) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarNome(nome);
        return hospedes;
    }
}
