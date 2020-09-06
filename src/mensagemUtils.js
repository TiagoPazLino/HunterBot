
export function mensagemComHumor(humorParam, arrayMensagem) {
    return arrayMensagem[humorParam][Math.round(Math.random() * 10) % arrayMensagem[humorParam].length]
}