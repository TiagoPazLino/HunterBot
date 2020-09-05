const Discord = require("../node_modules/discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const handler = "hunter?";

var usuariosEsperando = [];

const Humor = {
    INDIFERENTE: 0,
    MAL: 1,
    FELIZ: 2
}

humor = Humor.FELIZ;

client.on("message", (mensagem) => {

    if (!mensagem.content.includes(handler) && mensagem.channel.type != 'dm' && !usuariosEsperando.includes(mensagem.author))
        return;
    
    if (mensagem.content === handler) {
        mensagem.reply(mensagemComHumor(humor, config.respostasChamado));
        usuariosEsperando.push(mensagem.author);
        return;
    } else if (usuariosEsperando.includes(mensagem.author)) {
        usuariosEsperando.splice(usuariosEsperando.indexOf(mensagem.author));
    }

    textoMensagem = mensagem.content.toUpperCase();

    if (textoMensagem.includes("COMO VAI?") || textoMensagem.includes("COMO ESTÁ?")) {
        mensagem.reply(mensagemComHumor(humor, config.comoVai));
    }

    if (textoMensagem.includes("CRIE") || textoMensagem.includes("CRIA") || textoMensagem.includes("FAZ") || textoMensagem.includes("FAÇA")) {
        criarCanalTexto(mensagem);
    }

    if (textoMensagem.includes("DELETE") || textoMensagem.includes("DELETA") || textoMensagem.includes("REMOVA") || textoMensagem.includes("REMOVE")) {
        removerCanalTexto(mensagem);
     }

});

function criarCanalTexto(mensagem) {
    textoMensagem = mensagem.content.toUpperCase();
    if (possuiNao(textoMensagem)) {
        mensagem.reply(mensagemComHumor(humor, config.respostasNao));
        return;
    }
    if (textoMensagem.includes("CANAL")) {
        let nomeCanal = extrairParametro("nome", mensagem.content);
        mensagem.guild.channels.create(nomeCanal)
            .then(mensagem.reply(mensagemComHumor(humor, config.canalCriado)))
    }
}

function removerCanalTexto(mensagem) {
    textoMensagem = mensagem.content.toUpperCase();
    if (possuiNao(textoMensagem)) {
        mensagem.reply(mensagemComHumor(humor, config.respostasNao));
        return;
    }
    if (textoMensagem.includes("CANAL")) {
        let nomeCanal = extrairParametro("nome", mensagem.content);
        mensagem.guild.
        console.log(mensagem.channel);
    }
}

function possuiNao(texto) {
    if(texto.includes("NÃO") || texto.includes(" N ") ||  texto.includes(" Ñ ")) {
        return true;
    }
    return false;
}

function procuraCanalPorNome(){
    
}

function extrairParametro(identificador, mensagem) {
    return mensagem.substr(mensagem.indexOf(identificador) + identificador.length);
}

function mensagemComHumor(humorParam, arrayMensagem) {
    return arrayMensagem[humorParam][Math.round(Math.random() * 10) % arrayMensagem[humorParam].length]
}



function SearchChannelName(mess) {


	if (typeof (this.mess) == Discord.Message) return mess.Guild;
	Console.error("The given name is not from a channel");

} 

client.login(config.disc_token);


