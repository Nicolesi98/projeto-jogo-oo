import {validate} from "bycontract";

export class Ferramenta {
    #nome;
    #mensagemSucesso;

    constructor(nome, mensagemSucesso){
        validate(arguments,["String", "String"]);
        this.#nome = nome;
        this.#mensagemSucesso = mensagemSucesso;
    }

    get nome(){
        return this.#nome;
    }

    get mensagemSucesso(){
        return this.#mensagemSucesso;
    }
}