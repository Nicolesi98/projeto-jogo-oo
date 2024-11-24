import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});
import {validate} from "bycontract";
import { Ferramenta } from "./Ferramenta.js";

export class Mochila {

    #ferramentas;

    constructor(){
        this.#ferramentas = new Map();
    }

    get ferramentas(){
        return this.#ferramentas;
    }

    adicionar(ferramenta){
        validate(ferramenta, Ferramenta);
        this.#ferramentas.set(ferramenta.nome, ferramenta);
    }

    escolheFerramenta(){

        console.log("As Ferramentas disponíveis na sua mochila são:");

        for(const ferramentaNome of this.#ferramentas.keys()){
            console.log(ferramentaNome);
        }

        let ferramentaEscolhida = undefined;

        while(ferramentaEscolhida === undefined && this.#ferramentas.size > 0){
            let nomeFerramenta = prompt("Informe o nome da ferramenta que deseja escolher para usar: ");
            ferramentaEscolhida = this.#ferramentas.get(nomeFerramenta);
            if(ferramentaEscolhida !== undefined){
                return ferramentaEscolhida;
            }else{
                console.log("Ferramenta escolhida é inválida, tente novamente!!!");
            }
        }

    }
}