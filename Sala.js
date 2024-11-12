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
        this.#ferramentas = this.#criarArrayDeMaps(ferramentas);
        this.#objetos = this.#criarArrayDeMaps(objetos);
        this.#salasDisponiveis = [];
    }

    #criarArrayDeMaps(lista) {

        if(!lista.length){
            return lista;
        }

        const arrayDeMaps = [];
    
        for (const item of lista) {
            const key = item.nome;
            const novoMap = {key, item};
            arrayDeMaps.push(novoMap);
        }
    
        return arrayDeMaps;
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
        this.#salasDisponiveis = this.#criarArrayDeMaps(salasDisponiveis);
    }
}