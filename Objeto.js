import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});
import {validate} from "bycontract";
import { Ferramenta } from "./Ferramenta.js";
import { Mochila } from "./Mochila.js";

export class Objeto {
    #nome;
    #desabilitaUso;
    #textoAcaoRealizada;
    #ferramentaDaAcao;
    #ferramentaQuePossui;
    

    constructor(nome, ferramentaQuePossui, ferramentaDaAcao, textoAcaoRealizada){
        this.#nome = nome;
        this.#desabilitaUso = false;
        this.#ferramentaQuePossui = ferramentaQuePossui;
        this.#ferramentaDaAcao = ferramentaDaAcao;
        this.#textoAcaoRealizada = textoAcaoRealizada;
    }

    get nome(){
        return this.#nome;
    }

    get desabilitaUso(){
        return this.#desabilitaUso;
    }

    get ferramentaDaAcao(){
        return this.#ferramentaDaAcao;
    }

    usa(mochila){

        if(this.#ferramentaQuePossui !== undefined){
            let escolhaPegar = prompt(this.#textoAcaoRealizada);

            if(escolhaPegar === "S"){
                mochila.adicionar(this.#ferramentaQuePossui);
                this.#desabilitaUso = true;
            }

        }else{
            console.log(this.#textoAcaoRealizada);
            this.#desabilitaUso = true;
        }
    }
}