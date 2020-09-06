import { procuraComando } from "./comandoUtils";
import { mensagemComHumor } from "./mensagemUtils";
import { humor } from "./index"

const comandos = require("./Strings/comandos.json");
const respostas = require("./Strings/respostas.json");

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

function searchChannelName(nome, mensagem) {
    return mensagem.guild.channels.cache.find((canal) => {
        return canal.name === nome;
    });
}

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

function extrairParametro(identificador, mensagem) {
    return mensagem.substr(mensagem.indexOf(identificador) + identificador.length);
}

export {criarCanalTexto, removerCanalTexto};