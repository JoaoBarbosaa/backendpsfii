
export default class ItemEmprestimo{
    #exemplar

    constructor(exemplar, itemDisp){
        this.#exemplar = exemplar
    }


    get exemplar(){
        return this.#exemplar
    }

    set exemplar(novoExemplar){
        this.#exemplar = novoExemplar
    }


    toJSON(){
        return {
            exemplar: this.#exemplar,
        }
    }
}

