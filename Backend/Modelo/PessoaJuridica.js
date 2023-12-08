import HospedeBD from "../Persistencia/HospedeBD.js";
import Hospede from "./Hospede.js";

export default class PessoaJuridica{
    #cnpj;
    #hospede;

    constructor(codigo, nome, endereco, email,  cnpj) {
        this.#hospede = new Hospede(codigo, nome, endereco,email );
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
            
            "cnpj": this.#cnpj,
        };
    }

    async gravar() {
        const hospedeBD = new HospedeBD();
        this.codigo = await hospedeBD.gravarHospede(this);
    }
}

