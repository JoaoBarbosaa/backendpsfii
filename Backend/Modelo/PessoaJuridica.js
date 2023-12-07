import Hospede from "./Hospede.js";

export default class PessoaJuridica{
    #cnpj;
    #hospede;

    constructor(codigo, nome, email, endereco, cnpj) {
        this.#hospede = new Hospede(codigo, nome, email, endereco);
        this.#cnpj = cnpj;
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
            ...super.toJSON(), // Herda os atributos da classe pai
            "cnpj": this.#cnpj,
        };
    }
}

