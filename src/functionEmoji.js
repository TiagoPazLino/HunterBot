import { procuraComando } from "./comandoUtils";
import { mensagemComHumor } from "./mensagemUtils";
import { extrairParametro } from "./paramUtils";
import { humor } from "./index"

const comandos = require("./Strings/comandos.json");
const respostas = require("./Strings/respostas.json");


export function criarEmoji(mensagem){
    if (procuraComando(mensagem, comandos.emoji)) {
        let nomeEmoji = extrairParametro(comandos.parametros.NOME.valueOf, mensagem.content);
        mensagem.attachments.forEach((attachment) => {
            mensagem.guild.emojis.create(attachment.proxyURL, nomeEmoji)
                .then(() => {
                    mensagem.reply(mensagemComHumor(humor, respostas.emojiCriado))
                    mensagem.channel.send(mensagem.guild.emojis.cache.find(emoji => emoji.name == nomeEmoji).toString());
                })
                .catch(() => mensagem.reply(mensagemComHumor(humor, respostas.erros)));
        });
    }
}

export function deletarEmoji(mensagem){
    if (procuraComando(mensagem, comandos.emoji)) {
        let nomeEmoji = extrairParametro(comandos.parametros.NOME.valueOf(), mensagem.content);
        mensagem.guild.emojis.cache.find(emoji => emoji.name == nomeEmoji).delete()
            .then(() => mensagem.reply(mensagemComHumor(humor, respostas.emojiDeletado)))
            .catch(() => mensagem.reply(mensagemComHumor(humor, respostas.erros)));
    }
}