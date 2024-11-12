import {validate} from "bycontract";

export class Mochila {

    #ferramentas;

    constructor(){
        this.#ferramentas = [];
    }

    get ferramentas(){
        return this.#ferramentas;
    }

    adicionar(ferramenta){
        validate(ferramenta, "Ferramenta");
        this.#ferramentas.push(new Map([[ferramenta.nome, ferramenta]]));
    }
}