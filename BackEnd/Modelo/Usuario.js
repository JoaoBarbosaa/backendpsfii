import UsuarioBD from "../Persistencia/UsuarioBD.js";

export default class Usuario {

    #cpf;
    #nome;
    #senha;

    constructor(cpf, nome, senha) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#senha = senha;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novaCpf) {
        this.#cpf = novaCpf;
    }


    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get senha() {
        return this.#senha;
    }
    set senha(novoSenha) {
        this.#senha = novoSenha;
    }

    toJSON() {
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "senha": this.#senha,
        }
    }

    async gravar() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.adicionar(this);
    }

    async atualizar() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    async removerDoBancoDeDados() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }

    async consultar(termo) {
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultar(termo);
        return usuarios;
    }

    async consultarCPF(cpf) {
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultarCPF(cpf);
        return usuarios;
    }

    async consultarNome(nome){
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultarNome(nome);
        return usuarios
    }
    
}