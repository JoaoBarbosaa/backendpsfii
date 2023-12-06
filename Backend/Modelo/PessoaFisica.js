// PessoaFisica.js
import Hospede from "./Hospede";

export default class PessoaFisica extends Hospede {
    #cpf;
    #rg;

    constructor(nome, email, telefone, endereco, cpf, rg) {
        super(nome, email, telefone, endereco);
        this.#cpf = cpf;
        this.#rg = rg;
    }

    // Métodos específicos de PessoaFisica, se necessário

    toJSON() {
        return {
            ...super.toJSON(), // Herda os atributos da classe pai
            "cpf": this.#cpf,
            "rg": this.#rg,
        };
    }
}
