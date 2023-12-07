import TelefoneDB from "../Persistencia/TelefoneDB";

export default class Telefone{

    #codigo;
    #ddd;
    #numero
    #codHospede;

    constructor(codigo, ddd, numero, codHospede){
        this.#codigo = codigo;
        this.#ddd = ddd;
        this.#numero = numero;
        this.#codHospede = codHospede;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get ddd(){
        return this.#ddd;
    }
    set ddd(novoDDD){
        this.#ddd = novoDDD;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    get codHospede(){
        return this.#codHospede;
    }

    set codHospede(novoCodHospede){
        this.#codHospede = novoCodHospede;
    }

    

    toJSON(){
        return {
            "codigo"      :this.#codigo,
            "ddd"         :this.#ddd,
            "numero"      :this.#numero,
            "codHospede"  :this.#codHospede

        }
    }

    //refazer
    async gravar(){
        const telefoneDB = new TelefoneDB();
        this.#codigo = await telefoneDB.incluir(this);
    }
    async atualizar(){
        const telefoneDB = new TelefoneDB();
        await telefoneDB.alterar(this);
    }


    async remover(){
        const telefoneDB = new TelefoneDB();
        await telefoneDB.excluir(this);
    }

    async consultar(termo){
        const telefoneDB = new TelefoneDB();
        const telefone = await telefoneDB.consultar(termo);
        return telefone;
    }

    async consultarCodigo(codigo){
        const telefoneDB = new TelefoneDB();
        const telefone = await telefoneDB.consultarCodigo(codigo);
        return telefone;
    }
}