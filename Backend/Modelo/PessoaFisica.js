import Hospede from "../Persistencia/Conexao.js";

export default class PessoaFisica {
    #cpf;
    #rg;
    #hospede;
  
    constructor(codigo, nome, email, telefone, endereco, cpf, rg) {
      this.#hospede = new Hospede(codigo, nome, email, telefone, endereco);
      this.#cpf = cpf;
      this.#rg = rg;
    }


    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

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
}
