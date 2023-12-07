// PessoaJuridica.js
import Hospede from "../Persistencia/Conexao.js";

export default class PessoaJuridica{
    #cnpj;
    #hospede;

    constructor(codigo, nome, email, telefones, endereco, cnpj) {
        this.#hospede = new Hospede(codigo, nome, email, telefones, endereco);
        this.#cnpj = cnpj;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    toJSON() {
        return {
            ...super.toJSON(), // Herda os atributos da classe pai
            "cnpj": this.#cnpj,
        };
    }
}

