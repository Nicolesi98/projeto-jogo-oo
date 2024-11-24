import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});
import {validate} from "bycontract";
import { Mochila } from "./Mochila.js";
import { Sala } from "./Sala.js";
import { Ferramenta } from './Ferramenta.js';
import { Objeto } from './Objeto.js';

export class Engine {

    #mochila;
    #salaCorrente;

    constructor(){
        this.#mochila = new Mochila();
    }
    
    // ----- setup do jogo ------
    criarCenario(){

        //------ cria as ferramentas ------
        let pergaminho = new Ferramenta("pergaminho", "Ao ler esse pergaminho você revelou uma pista.");
        let chave = new Ferramenta("chave", "Você conseguiu abrir a caixa misteriosa.");
        let flor = new Ferramenta("flor", "Parabéns, você abriu o compartimento secreto e desvendou o enigma do castelo encantado!!!");

        //------ cria os objetos ------
        let prateleiraLivros = new Objeto("prateleira de livros", pergaminho, undefined, "Achou o pergaminho, deseja pegá-lo? S(sim) ou N(não): ");
        let globoTerrestre = new Objeto("globo terrestre", undefined, undefined, "Você nota um desenho misterioso");
        let armario = new Objeto("armário", chave, undefined, "Achou a chave, deseja pegá-la? S(sim) ou N(não): ");
        let fogao = new Objeto("fogão", undefined, undefined, "Não há nada escondido aqui.");
        let cama = new Objeto("cama", undefined, undefined, "Você olha debaixo da cama encontra poeira mas nenhuma pista.");
        let comoda = new Objeto("cômoda", undefined, undefined, "Você abre a gaveta da cômoda mas não encontra nada de interessante aqui.");
        let lupa = new Objeto("lupa", undefined, pergaminho, "");
        let sofa = new Objeto("sofá", undefined, chave, "Achou uma caixa misteriosa.");
        let lareira = new Objeto("lareira", undefined, flor, "Há um compartimento secreto");
        let quadro = new Objeto("quadro", undefined, undefined, "Nada encontrado.");
        let mesa = new Objeto("mesa", undefined, undefined, "");
        let lustre = new Objeto("lustre", undefined, undefined, "");
        let vasoFlor = new Objeto("vaso de flor", flor, undefined, "Há uma linda flor no vaso, deseja pegá-la? S(sim) ou N(não): ");

        //------ cria as salas ------
        let hallEntrada = new Sala("Hall de Entrada",[mesa, lustre, vasoFlor]);
        let biblioteca = new Sala("biblioteca",[prateleiraLivros, globoTerrestre]);
        let cozinha = new Sala("Cozinha",[armario, fogao]);
        let quarto = new Sala("Quarto",[cama, comoda, lupa]);
        let salaDeEstar = new Sala("Sala de Estar",[sofa, lareira, quadro]);

        hallEntrada.salasDisponiveis = [biblioteca, cozinha, quarto, salaDeEstar];
        biblioteca.salasDisponiveis = [hallEntrada, cozinha, quarto, salaDeEstar];
        cozinha.salasDisponiveis = [biblioteca, hallEntrada, quarto, salaDeEstar];
        quarto.salasDisponiveis = [biblioteca, cozinha, hallEntrada, salaDeEstar];
        salaDeEstar.salasDisponiveis = [biblioteca, cozinha, hallEntrada, quarto];

        this.#salaCorrente = hallEntrada;
    }

    joga(){
        let acao = -1;

        console.log("-------------------------------------------------");
        console.log("Bem-vindo ao jogo do Enigma do Castelo Encantado!");

        while(acao != 0){
            console.log("Você se encontra na sala: "+this.#salaCorrente.nome);
            console.log("Opções diponíveis:");
            console.log("0- Encerrar o jogo.");
            console.log("1- Sair para outra sala.");
            console.log("2- Usar objeto na sala.");
            console.log("3- Usar ferramenta em objeto da sala.");
            acao = parseInt(prompt("Qual sua escolha? (Informe apenas o número) "));
            
            switch(acao){
                case 0:
                    console.log("Fim de Jogo!!!");
                    break;
                case 1:
                    this.#sairSala();
                    break;
                case 2:
                    this.#usaObjeto();
                    break;
                case 3:
                    this.#usaFerramenta();
                    break;
                default:
                    console.log("Escolha inválida, refaça sua escolha!");
                    break;
            }

        }
        console.log("-------------------------------------------------");

    }

    #sairSala(){
        let novaSalaEscolhida = this.#salaCorrente.sai();
        if(novaSalaEscolhida!== undefined){
            this.#salaCorrente = novaSalaEscolhida;
        }else{
            console.log("Sala informada é inválida, tente novamente!!!");
        }
        console.log("####################################");
    }

    #usaObjeto(){
        this.#salaCorrente.usa(this.#mochila);
    }

    #usaFerramenta(){
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        let objetoEscolhido = this.#salaCorrente.escolheObjeto();
        let ferramentaEscolhida = this.#mochila.escolheFerramenta();

        if(objetoEscolhido !== undefined && ferramentaEscolhida !== undefined){
            if(objetoEscolhido.ferramentaDaAcao !== undefined && objetoEscolhido.ferramentaDaAcao.nome === ferramentaEscolhida.nome){
                console.log(ferramentaEscolhida.mensagemSucesso);
            }else{
                console.log("Essa ferramenta não obteve exito, tente novamente!!!");
            }    
        }

        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    }
}