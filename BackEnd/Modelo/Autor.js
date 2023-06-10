import AutorBD from "../Persistencia/AutorBD.js";
export default class Autor {

    #codigo;
    #nome;
    #nacionalidade;
  
    constructor(codigo, nome, nacionalidade) {
      this.#codigo = codigo;
      this.#nome = nome;
      this.#nacionalidade = nacionalidade;
    }
  
    get codigo() {
      return this.#codigo;
    }
  
    set codigo(novoCodigo) {
      this.#codigo = novoCodigo;
    }
  
  
    get nome() {
      return this.#nome;
    }
  
    set nome(novoNome) {
      this.#nome = novoNome;
    }
  
  
    get nacionalidade() {
      return this.#nacionalidade;
    }
  
    set nacionalidade(novoNacionalidade) {
      this.#nacionalidade = novoNacionalidade;
    }
  

  
    toJSON() {
      return {
        codigo: this.#codigo,
        nome: this.#nome,
        nacionalidade: this.#nacionalidade,
      };
    }


    async gravar(){
      const autorBD = new AutorBD();
      this.codigo = await autorBD.incluir(this);
  }

  async atualizar(){
      const autorBD = new AutorBD();
      await autorBD.alterar(this);
  }

  async remover(){
      const autorBD = new AutorBD();
      await autorBD.excluir(this);
  }

  async consultar(termo){
      const autorBD = new AutorBD();
      const autores = await autorBD.consultar(termo);
      return autores
  }

  async consultarCodigo(codigo){
    const autorBD = new AutorBD();
    const autores = await autorBD.consultarCodigo(codigo);
    return autores
  }
  
  async consultarNome(nome){
    const autorBD = new AutorBD();
    const autores = await autorBD.consultarNome(nome);
    return autores
  }
}