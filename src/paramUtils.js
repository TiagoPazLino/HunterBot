export function extrairParametro(identificador, mensagem) {
    return mensagem.substr(mensagem.indexOf(identificador) + identificador.length).trim();
}
