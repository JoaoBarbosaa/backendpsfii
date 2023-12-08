import HospedeBD from "../Persistencia/HospedeBD.js";
import Hospede from "./Hospede.js";

export default class PessoaFisica {
    #cpf;
    #rg;
    #hospede;
  
    constructor(codigo, nome, email, endereco, cpf, rg) {
      this.#hospede = new Hospede(codigo, nome, email, endereco);
      this.#cpf = cpf;
      this.#rg = rg;
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
            ...super.toJSON(), // Herda os atributos da classe pai
            "cpf": this.#cpf,
            "rg": this.#rg,
        };
    }

    async gravar() {

        const hospedeBD = new HospedeBD();
        this.codigo = await hospedeBD.incluirPessoaFisica(this);
    }

}
