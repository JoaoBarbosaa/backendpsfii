// PessoaJuridica.js
import Hospede from "./Hospede";

export default class PessoaJuridica extends Hospede {
    #cnpj;

    constructor(nome, email, telefone, endereco, cnpj) {
        super(nome, email, telefone, endereco);
        this.#cnpj = cnpj;
    }

    // Métodos específicos de PessoaJuridica, se necessário

    toJSON() {
        return {
            ...super.toJSON(), // Herda os atributos da classe pai
            "cnpj": this.#cnpj,
        };
    }
}
