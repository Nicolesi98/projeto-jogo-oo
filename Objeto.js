import {validate} from "bycontract";

export class Objeto {
    #nome;
    #acaoRealizada;

    //nome String da ferramenta que pode ser utilizada com esse objeto
    #ferramenta;

    constructor(nome, ferramenta){
        validate(arguments,["String", "String"]);
        this.#nome = nome;
        this.#acaoRealizada = false;
        this.#ferramenta = ferramenta;
    }

    get nome(){
        return this.#nome;
    }

    get acaoRealizada(){
        return this.#acaoRealizada;
    }

    get ferramenta(){
        return this.#ferramenta;
    }
}