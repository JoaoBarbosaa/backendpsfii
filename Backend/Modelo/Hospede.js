import HospedeBD from "../Persistencia/HospedeBD.js";
import PessoaFisica from "./PessoaFisica.js";
import PessoaJuridica from "./PessoaJuridica.js";


export default class Hospede {

    #codigo;
    #nome;
    #email;
    #endereco;

    constructor(codigo = 0, nome, email, endereco) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#endereco = endereco;
    }

    //METODO CODIGO
    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    //METODO NOME
    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    //METODO EMAIL
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    //METODO ENDEREÇO
    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "email": this.#email,
            "endereco": this.#endereco,
        };
    }

    async gravar() {
        const hospedeBD = new HospedeBD();

        // Verifica se é uma PessoaFisica e inserir na tabela pessoafisica
        if (this instanceof PessoaFisica) {
            await hospedeBD.gravarPessoaFisica(this);
        }

        // Verifica se é uma PessoaJuridica e inserir na tabela pessoajuridica
        if (this instanceof PessoaJuridica) {
            await hospedeBD.gravarPessoaJuridica(this);
        }

        // Insere o hospede na tabela principal
        this.codigo = await hospedeBD.gravar(this);
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

    async consultarCodigo(codigo) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarCodigo(codigo);
        return hospedes;
    }

    async consultarNome(nome) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarNome(nome);
        return hospedes;
    }
}
