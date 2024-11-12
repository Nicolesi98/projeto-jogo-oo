import {validate} from "bycontract";
import { Mochila } from "./Mochila.js";
import { Sala } from "./Sala.js";

export class Engine {

    #mochila;
    #salaCorrente;

    constructor(salaCorrente){
        validate(salaCorrente, Sala);
        this.#mochila = new Mochila();
        this.#salaCorrente = salaCorrente;
    }

    get mochila(){
        return this.#mochila;
    }

    get salaCorrente(){
        return this.#salaCorrente;
    }

    set salaCorrente(salaCorrente){
        validate(salaCorrente, Sala);
        this.#salaCorrente = salaCorrente;
    }
}