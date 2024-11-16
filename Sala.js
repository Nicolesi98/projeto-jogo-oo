import {validate} from "bycontract";
import { Ferramenta } from "./Ferramenta.js";
import { Objeto } from "./Objeto.js";

export class Sala {
    #nome;
    #ferramentas;
    #objetos;
    #salasDisponiveis;

    constructor(nome, ferramentas, objetos){
        validate(nome,"String");
        this.#nome = nome;
        this.#ferramentas = this.#criarMap(ferramentas);
        this.#objetos = this.#criarMap(objetos);
        this.#salasDisponiveis = new Map();
    }

    #criarMap(lista) {

        if(!lista.length){
            return new Map();
        }

        const mapa = new Map();
    
        for (const item of lista) {
            const key = item.nome;
            mapa.set(key, item);
        }
    
        return mapa;
    }

    get nome(){
        return this.#nome;
    }

    get ferramentas(){
        return this.#ferramentas;
    }

    get objetos(){
        return this.#objetos;
    }

    get salasDisponiveis(){
        return this.#salasDisponiveis;
    }

    set salasDisponiveis(salasDisponiveis){
        this.#salasDisponiveis = this.#criarMap(salasDisponiveis);
    }
}