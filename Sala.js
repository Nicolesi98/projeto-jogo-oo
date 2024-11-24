import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});
import {validate} from "bycontract";
import { Ferramenta } from "./Ferramenta.js";
import { Objeto } from "./Objeto.js";

export class Sala {
    #nome;
    #objetos;
    #salasDisponiveis;

    constructor(nome, objetos){
        validate(nome,"String");
        this.#nome = nome;
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

    get objetos(){
        return this.#objetos;
    }

    get salasDisponiveis(){
        return this.#salasDisponiveis;
    }

    set salasDisponiveis(salasDisponiveis){
        this.#salasDisponiveis = this.#criarMap(salasDisponiveis);
    }

    sai(){
        console.log("####################################");
        console.log("As salas disponíveis para ir são: ");

        for(const salaNome of this.#salasDisponiveis.keys()){
            console.log(salaNome);
        }
        let salaNomeEscolhida = prompt("Informe o nome da sala: ");

        return this.#salasDisponiveis.get(salaNomeEscolhida);
    }

    usa(mochila){
        console.log("************************************");
        let count = this.#printObjetos(true);

        let objetoEscolhido = undefined;

        while(objetoEscolhido === undefined && count > 0){
            objetoEscolhido = this.#objetos.get(prompt("Informe o nome da objeto que deseja usar: "));

            if(objetoEscolhido!==undefined){
                objetoEscolhido.usa(mochila);
            }else{
                console.log("Objeto informado é inválido, tente novamente!!!");
            }
        }

        console.log("************************************");
    }

    escolheObjeto(){
        this.#printObjetos(false);
        let objetoEscolhido = undefined;

        while(objetoEscolhido === undefined){
            let nomeObjetoEscolhido = prompt("Informe o nome do objeto que deseja escolher para usar a ferramenta: ");
            objetoEscolhido = this.#objetos.get(nomeObjetoEscolhido);
            if(objetoEscolhido !== undefined){
                return objetoEscolhido;
            }else{
                console.log("Objeto escolhido é inválido, tente novamente!!!");
            }
        }
    }

    #printObjetos(uso){

        let complementoTexto = uso? "para uso são" : "são";
        let countObjetos = 0;

        console.log(`Os Objetos disponíveis na sala ${this.#nome} ${complementoTexto}:`);

        for(const objetoNome of this.#objetos.keys()){
            if(uso){
                if(!this.objetos.get(objetoNome).desabilitaUso){
                    console.log(objetoNome);
                    countObjetos = countObjetos + 1;
                }
            }else{
                console.log(objetoNome);
            }
        }

        return countObjetos;
    }
}