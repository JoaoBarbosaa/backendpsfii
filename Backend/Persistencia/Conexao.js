import mysql from 'mysql2/promise';
import HospedeBD from './HospedeBD';

export default async function conectar(){

    if(global.conexao && global.conexao.status != "disconnected"){
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"mydb"
    });


    global.conexao = conexao;

return conexao;
}
export default class Hospede {
    #idhospede;
    #nome;
    #endereco;
    #email;

    constructor(codigo, nome, email, telefones, endereco) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#email = email;
    }

    get idhospede() {
        return this.#idhospede;
    }

    set idhospede(novoidhospede) {

        this.#idhospede = novoidhospede;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }


    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    // Métodos para adicionar, remover, consultar telefones, etc.
    toJSON() {
        return {
            "idhospede": this.#idhospede,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "email": this.#email,
        };
    }

    async gravar() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.adicionar(this);
    }

    async atualizar() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.alterar(this);
    }

    async removerDoBancoDeDados() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.excluir(this);
    }

    async consultar(termo) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultar(termo);
        return hospedes;
    }

    async consultaridhospede(idhospede) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultaridhospede(idhospede);
        return hospedes;
    }

    async consultarNome(nome) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarNome(nome);
        return hospedes;
    }
}
