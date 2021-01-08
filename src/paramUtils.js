export function extrairParametro(identificador, mensagem) {
    return (existeIdentificador(identificador, mensagem) ? extrairParam(identificador, mensagem) : null);
}

function existeIdentificador(identificador, mensagem) {
    return !(mensagem.toUpperCase().search(identificador) === -1);
}

function extrairParam(identificador, mensagem) {
    let paramString = mensagem.slice(mensagem.toUpperCase().indexOf(identificador) + identificador.length);
    return paramString.substring(0, paramString.indexOf(",") == -1 ? undefined : paramString.indexOf(",")).trim();
}
