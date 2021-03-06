import { criarCanalTexto, removerCanalTexto } from "./functionCanal";
import { criarEmoji, deletarEmoji } from "./functionEmoji";
import { procuraComando } from "./comandoUtils";
import { mensagemComHumor } from "./mensagemUtils";


const Discord = require("../node_modules/discord.js");

const config = require("./Strings/config.json");
const comandos = require("./Strings/comandos.json");
const respostas = require("./Strings/respostas.json");

const client = new Discord.Client();

const handler = "hunter?";

var usuariosEsperando = [];

const Humor = {
    INDIFERENTE: 0,
    MAL: 1,
    FELIZ: 2
}

export var humor = Humor.INDIFERENTE;

client.on("message", (mensagem) => {

    if (!mensagem.content.includes(handler) && mensagem.channel.type != 'dm' && !usuariosEsperando.includes(mensagem.author))
        return;
    
    if (mensagem.content === handler) {
        mensagem.reply(mensagemComHumor(humor, respostas.aguardando));
        usuariosEsperando.push(mensagem.author);
        return;
    } else if (usuariosEsperando.includes(mensagem.author)) {
        usuariosEsperando.splice(usuariosEsperando.indexOf(mensagem.author));
    }

    if (procuraComando(mensagem, comandos.comoVai)) {
        mensagem.reply(mensagemComHumor(humor, respostas.estadoHumor));
    }

    if (procuraComando(mensagem, comandos.amar)) {
        mensagem.reply(mensagemComHumor(humor, respostas.amar));
    }

    if (mensagem.channel.type != 'dm'){
        if (responderCasoNao(mensagem)) return;
        if (procuraComando(mensagem, comandos.criar)) {
            criarCanalTexto(mensagem);
            criarEmoji(mensagem);
        }
        
        if (procuraComando(mensagem, comandos.excluir)) {
            removerCanalTexto(mensagem);
            deletarEmoji(mensagem);
        }
    }
    
});

function possuiNao(texto) {
    return procuraComando(texto, comandos.nao);
}

function responderCasoNao(mensagem){
    if (possuiNao(mensagem)) {
        mensagem.reply(mensagemComHumor(humor, respostas.respostasNao));
        return true;
    }
    return false;
}

client.login(config.disc_token);
