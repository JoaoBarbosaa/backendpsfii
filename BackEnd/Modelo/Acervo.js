import AcervoBD from "../Persistencia/AcervoBD.js"

export default class Acervo{
    //atributos
    #codigoRegisto
    #tituloDoLivro; 
    #editora;
    #edicao;
    #anoDePublicacao;


    constructor(codigoRegisto, tituloDoLivro, editora, edicao, anoDePublicacao){
        this.#codigoRegisto = codigoRegisto;
        this.#tituloDoLivro = tituloDoLivro;
        this.#editora = editora;
        this.#edicao = edicao;
        this.#anoDePublicacao = anoDePublicacao;

    }

    get codigoRegisto(){
        return this.#codigoRegisto;
    }

    set codigoRegisto(novocodigoRegisto){
        this.#codigoRegisto = novocodigoRegisto;
    }

    get tituloDoLivro(){
        return this.#tituloDoLivro;
    }
    //alterar atribuir
    set tituloDoLivro(novotituloDoLivro){
        if(novotituloDoLivro != "") 
            this.#tituloDoLivro = novotituloDoLivro;
    }
    
    get editora(){
        return this.#editora;
    }

    set editora(novoeditora){
        this.#editora = novoeditora;
    }

    get edicao(){
        return this.#edicao;
    }

    set edicao(novoedicao){
        this.#edicao = novoedicao;
    }
    
    get anoDePublicacao(){
        return this.#anoDePublicacao;
    }

    set anoDePublicacao(novoanoDePublicacao){
        this.#anoDePublicacao = novoanoDePublicacao;
    }



    //método toJSON
    toJSON(){
        return{
            "codigoRegisto"               : this.codigoRegisto,
            "tituloDoLivro"               : this.#tituloDoLivro,
            "editora"                     : this.#editora,
            "edicao"                      : this.#edicao,
            "anoDePublicacao"             : this.#anoDePublicacao,
        }
    }

    async gravar(){
        const acervoBD = new AcervoBD();
        this.codigoRegisto = await acervoBD.incluir(this);
    }

    async atualizar(){
        const acervoBD = new AcervoBD();
        await acervoBD.alterar(this);
    }

    async removerDoBancoDados(){
        const acervoBD = new AcervoBD();
        await acervoBD.excluir(this);
    }

    async consultar(termo){
        const acervoBD = new AcervoBD();
        const acervo = await acervoBD.consultar(termo);
        return acervo;
    }

    async consultarcodigoRegisto(codigoRegisto){
        const acervoBD = new AcervoBD();
        const acervo = await acervoBD.consultarcodigoRegisto(codigoRegisto);
        return acervo;
    } 

    async consultarTituloDoLivro(tituloDoLivro){
        const acervoBD = new AcervoBD();
        const acervo = await acervoBD.consultarTituloDoLivro(tituloDoLivro);
        return acervo
      }


}