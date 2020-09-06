const Discord = require("../node_modules/discord.js");
const config = require("./Strings/config.json");
const comandos = require("./Strings/comandos.json");
const respostas = require("./Strings/respostas.json")

const client = new Discord.Client();

const handler = "hunter?";

var usuariosEsperando = [];

const Humor = {
    INDIFERENTE: 0,
    MAL: 1,
    FELIZ: 2
}

humor = Humor.INDIFERENTE;

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

    textoMensagem = mensagem.content.toUpperCase();

    if (procuraComando(mensagem, comandos.comoVai)) {
        mensagem.reply(mensagemComHumor(humor, respostas.estadoHumor));
    }

    if (procuraComando(mensagem, comandos.criar)) {
        criarCanalTexto(mensagem);
    }
    
    if (procuraComando(mensagem, comandos.excluir)) {
        removerCanalTexto(mensagem);
    }
    
});

function responderCasoNao(mensagem){
    if (possuiNao(mensagem)) {
        mensagem.reply(mensagemComHumor(humor, respostas.respostasNao));
        return true;
    }
    return false;
}

function criarCanalTexto(mensagem) {
    if (responderCasoNao(mensagem)) return;
    if (procuraComando(mensagem, comandos.canal)) {
        let nomeCanal = extrairParametro("nome", mensagem.content);
        mensagem.guild.channels.create(nomeCanal)
            .then(mensagem.reply(mensagemComHumor(humor, respostas.canalCriado)))
    }
}

function removerCanalTexto(mensagem) {
    if (responderCasoNao(mensagem)) return;
    if (procuraComando(mensagem, comandos.canal)) {
        let nomeCanal = extrairParametro("nome", mensagem.content).trim();
        searchChannelName(nomeCanal, mensagem).delete()
            .then(mensagem.reply(mensagemComHumor(humor, respostas.canalDeletado)));
    }
}

function possuiNao(texto) {
    return procuraComando(texto, comandos.nao);
}

function extrairParametro(identificador, mensagem) {
    return mensagem.substr(mensagem.indexOf(identificador) + identificador.length);
}

function mensagemComHumor(humorParam, arrayMensagem) {
    return arrayMensagem[humorParam][Math.round(Math.random() * 10) % arrayMensagem[humorParam].length]
}

function searchChannelName(nome, mensagem) {
    return mensagem.guild.channels.cache.find((canal) => {
        return canal.name === nome;
    });
}

function procuraComando(mensagem, tipoComando) {
    possuiComando = false;
    textoMensagem = mensagem.content.toUpperCase();
    tipoComando.forEach((comando) => {
        if (textoMensagem.includes(comando)) {
            possuiComando = true;
        }
    });
    return possuiComando;
}

client.login(config.disc_token);
