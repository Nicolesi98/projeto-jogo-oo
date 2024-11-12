import {validate} from "bycontract";

export class Ferramenta {
    #nome;
    #pegou;

    constructor(nome){
        validate(nome,"String");
        this.#nome = nome;
        this.#pegou = false;
    }

    get nome(){
        return this.#nome;
    }

    get pegou(){
        return this.#pegou;
    }

    pegar(){
        this.#pegou = true;
    }
}