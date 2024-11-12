import promptsync from 'prompt-sync';
import { Ferramenta } from './Ferramenta.js';
import { Objeto } from './Objeto.js';
import { Sala } from './Sala.js';
import { Engine } from './Engine.js';
const prompt = promptsync({sigint: true});

// ----- setup do jogo ------

//------ cria as ferramentas ------
let pergaminho = new Ferramenta("pergaminho");
let chave = new Ferramenta("chave");
let flor = new Ferramenta("flor");

//------ cria os objetos ------
let prateleiraLivros = new Objeto("prateleira de livros", "");
let globoTerrestre = new Objeto("globo terrestre", "");
let armario = new Objeto("armário", "");
let fogao = new Objeto("fogão", "");
let cama = new Objeto("cama", "");
let comoda = new Objeto("cômoda", "");
let lupa = new Objeto("lupa", "pergaminho");
let sofa = new Objeto("sofá", "chave");
let lareira = new Objeto("lareira", "flor");
let quadro = new Objeto("quadro", "");
let mesa = new Objeto("mesa", "");
let lustre = new Objeto("lustre", "");
let vasoFlor = new Objeto("vaso de flor", "");

//------ cria as salas ------
let hallEntrada = new Sala("Hall de Entrada",[flor],[mesa, lustre, vasoFlor]);
let biblioteca = new Sala("biblioteca",[pergaminho],[prateleiraLivros, globoTerrestre]);
let cozinha = new Sala("Cozinha",[chave],[armario, fogao]);
let quarto = new Sala("Quarto",[],[cama, comoda, lupa]);
let salaDeEstar = new Sala("Sala de Estar",[],[sofa, lareira, quadro]);

hallEntrada.salasDisponiveis = [biblioteca, cozinha, quarto, salaDeEstar];
biblioteca.salasDisponiveis = [hallEntrada, cozinha, quarto, salaDeEstar];
cozinha.salasDisponiveis = [biblioteca, hallEntrada, quarto, salaDeEstar];
quarto.salasDisponiveis = [biblioteca, cozinha, hallEntrada, salaDeEstar];
salaDeEstar.salasDisponiveis = [biblioteca, cozinha, hallEntrada, quarto];

let engine = new Engine(hallEntrada);

let acao = -1;

console.log("-------------------------------------------------");
console.log("Bem-vindo ao jogo do Enigma do Castelo Encantado!");

while(acao != 0){
    console.log("Você se encontra na sala: "+engine.salaCorrente.nome);
    console.log("Opções diponíveis:");
    console.log("0- Encerrar o jogo.");
    console.log("1- Sair para outra sala.");
    acao = parseInt(prompt("Qual sua escolha? (Informe apenas o número) "));
    
    switch(acao){
        case 0:
            console.log("Fim de Jogo!!!");
            break;
        case 1:
            console.log("As salas disponíveis para ir são: ");
            let salasDisponiveis = engine.salaCorrente.salasDisponiveis;
            for(const sala of salasDisponiveis){
                console.log(sala.key);
            }
            let salaNomeEscolhida = prompt("Informe o nome da sala: ");

            let salaEscolhida;
            for(const sala of salasDisponiveis){
                if(salaNomeEscolhida === sala.key){
                    salaEscolhida = sala.item;
                }
            }
            
            engine.salaCorrente = salaEscolhida;
        default:
            console.log("Escolha inválida, refaça sua escolha!");
            break;
    }

}
console.log("-------------------------------------------------");
