import PessoaBD from "../Persistencia/PessoaBD.js";

export default class Pessoa {

    #cpf;
    #categoria;
    #nome;
    #sexo;
    #email;
    #telefone;
    #cidade;
    #endereco;
    #cep;
    #dataNasc;

    constructor(cpf, categoria, nome, sexo, email, telefone, cidade, endereco, cep, dataNasc) {
        this.#cpf = cpf;
        this.#categoria = categoria;
        this.#nome = nome;
        this.#sexo = sexo;
        this.#email = email;
        this.#telefone = telefone;
        this.#cidade = cidade;
        this.#endereco = endereco;
        this.#cep = cep;
        this.#dataNasc = dataNasc;
    }

    //METODO CPF
    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    //METODO CATEGORIA
    get categoria() {
        return this.#categoria;
    }
    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }


    //METODO NOME
    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    //METODO SEXO
    get sexo() {
        return this.#sexo;
    }
    set sexo(novoSexo) {
        this.#sexo = novoSexo;
    }

    //METODO EMAIL
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    //METODO TELEFONE
    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTel) {
        this.#telefone = novoTel;
    }

    //METODO CIDADE
    get cidade() {
        return this.#cidade;
    }
    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    //METODO ENDEREÇO
    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEnd) {
        this.#endereco = novoEnd;
    }

    //METODO CEP
    get cep() {
        return this.#cep;
    }
    set cep(novoCep) {
        this.#cep = novoCep;
    }

    //METODO DATA DE NASCIMENTO
    get dataNasc() {
        return this.#dataNasc;
    }
    set dataNasc(novaData) {
        this.#dataNasc = novaData;
    }

    toJSON() {
        return {
            "cpf": this.#cpf,
            "categoria": this.#categoria,
            "nome": this.#nome,
            "sexo": this.#sexo,
            "email": this.#email,
            "telefone": this.#telefone,
            "cidade": this.#cidade,
            "endereco": this.#endereco,
            "cep": this.#cep,
            "dataNasc": this.#dataNasc
        }
    }

    async gravar() {
        const pessoaBD = new PessoaBD();
        await pessoaBD.adicionar(this);
    }

    async atualizar() {
        const pessoaBD = new PessoaBD();
        await pessoaBD.alterar(this);
    }

    async removerDoBancoDeDados() {
        const pessoaBD = new PessoaBD();
        await pessoaBD.excluir(this);
    }

    async consultar(termo) {
        const pessoaBD = new PessoaBD();
        const pessoas = await pessoaBD.consultar(termo);
        return pessoas;
    }

    async consultarCPF(cpf) {
        const pessoaBD = new PessoaBD();
        const pessoas = await pessoaBD.consultarCPF(cpf);
        return pessoas;
    }

    async consultarNome(nome){
      const pessoaBD = new PessoaBD();
      const pessoas = await pessoaBD.consultarNome(nome);
      return pessoas;
    }

}