import { procuraComando } from "./comandoUtils";
import { mensagemComHumor } from "./mensagemUtils";
import { extrairParametro } from "./paramUtils";
import { humor } from "./index"

const comandos = require("./Strings/comandos.json");
const respostas = require("./Strings/respostas.json");

function criarCanalTexto(mensagem) {
    if (procuraComando(mensagem, comandos.canal)) {
        let nomeCanal = extrairParametro("nome", mensagem.content);
        mensagem.guild.channels.create(nomeCanal)
            .then(() => mensagem.reply(mensagemComHumor(humor, respostas.canalCriado)))
            .catch(() => mensagem.reply(mensagemComHumor(humor, respostas.erros)));
    }
}

function removerCanalTexto(mensagem) {
    if (procuraComando(mensagem, comandos.canal)) {
        let nomeCanal = extrairParametro("nome", mensagem.content).trim();
        searchChannelName(nomeCanal, mensagem).delete()
            .then(() => mensagem.reply(mensagemComHumor(humor, respostas.canalDeletado)))
            .catch(() => mensagem.reply(mensagemComHumor(humor, respostas.erros)));
    }
}

function searchChannelName(nome, mensagem) {
    return mensagem.guild.channels.cache.find((canal) => {
        return canal.name === nome;
    });
}

export {criarCanalTexto, removerCanalTexto};