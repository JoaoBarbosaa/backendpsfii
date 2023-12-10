import HospedeBD from "../Persistencia/HospedeBD.js";
import PessoaFisicaBD from "../Persistencia/PessoaFisicaBD.js";
import Hospede from "./Hospede.js";

export default class HospedePessoaFisica {
    #cpfUsuario;
    #rgUsuario;
    #codHospede
  
    constructor(  cpfUsuario, rgUsuario, codHospede) {

      this.#cpfUsuario = cpfUsuario;
      this.#rgUsuario = rgUsuario;
        this.#codHospede = codHospede;
    }

    //METODO cpfUsuario
    get cpfUsuario() {
        return this.#cpfUsuario;
    }

    set cpfUsuario(novocpfUsuario) {
        this.#cpfUsuario = novocpfUsuario;
    }

    //METODO rgUsuario
    get rgUsuario() {
        return this.#rgUsuario;
    }

    set rgUsuario(novorgUsuario) {
        this.#rgUsuario = novorgUsuario;
    }

    //METODO CODIGO
    get codHospede() {
        return this.#codHospede;
    }
    set codHospede(novoCodHospede) {
        this.#codHospede = novoCodHospede;
    }

    toJSON() {
        return {
            "cpfUsuario": this.#cpfUsuario,
            "rgUsuario": this.#rgUsuario,
            "codHospede": this.#codHospede,
        };
    }

    async gravar() {
        const pessoaFisicaBD = new PessoaFisicaBD();
        await pessoaFisicaBD.gravarPF(this);
    }

    async atualizar() {
        const pessoaFisicaBD = new PessoaFisicaBD();
        await pessoaFisicaBD.atualizarpf(this);
    }


}