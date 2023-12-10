import PessoaJuridicaBD from "../Persistencia/PessoaJuridicaBD.js";

export default class HospedePessoaJuridica{
    #cnpjUsuario;
    #codHospede

    constructor(cnpjUsuario, codHospede) {
        this.#cnpjUsuario = cnpjUsuario;
        this.#codHospede = codHospede;
    }

    //METODO CNPJ
    get cnpjUsuario() {
        return this.#cnpjUsuario;
    }

    set cnpj(novoCnpj) {
        this.#cnpjUsuario = novoCnpj;
    }

    get codHospede() {
        return this.#codHospede;
    }
    set codHospede(novoCodHospede) {
        this.#codHospede = novoCodHospede;
    }


    toJSON() {
        return {
            "cnpj": this.#cnpjUsuario,
            "codHospede": this.#codHospede,
        };
    }

    async gravar() {
        const pessoaJuridicaBD = new PessoaJuridicaBD();
        await pessoaJuridicaBD.gravarPJ(this);
    }

    async atualizar() {
        const pessoaJuridicaBD = new PessoaJuridicaBD();
        await pessoaJuridicaBD.alterar(this);
    }


}
