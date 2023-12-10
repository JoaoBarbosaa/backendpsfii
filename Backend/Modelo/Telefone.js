import TelefoneDB from "../Persistencia/TelefoneDB.js";


export default class Telefone{

    #codigo;
    #ddd;
    #numero
    #hospede;

    constructor(codigo=0, ddd, numero, hospede){
        this.#codigo = codigo;
        this.#ddd = ddd;
        this.#numero = numero;
        this.#hospede = hospede;
    }

    //METODO CODIGO
    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    //METODO DDD
    get ddd(){
        return this.#ddd;
    }
    set ddd(novoDDD){
        this.#ddd = novoDDD;
    }

    //METODO NUMERO
    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    //METODO CODIGO HOSPEDE
    get hospede(){
        return this.#hospede;
    }

    set hospede(novohospede){
        this.#hospede = novohospede;
    }

    toJSON(){
        return {
            "codigo"      :this.#codigo,
            "ddd"         :this.#ddd,
            "numero"      :this.#numero,
            "hospede"   :this.#hospede

        }
    }

    async gravar(){
        const telefoneDB = new TelefoneDB();
        this.#codigo = await telefoneDB.incluir(this);
    }
    async atualizar(){
        const telefoneDB = new TelefoneDB();
        await telefoneDB.alterar(this);
    }


    async excluir(){
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