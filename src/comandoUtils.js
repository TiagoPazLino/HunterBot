export function procuraComando(mensagem, tipoComando) {
    let possuiComando = false;
    let textoMensagem = mensagem.content.toUpperCase();
    tipoComando.forEach((comando) => {
        if (textoMensagem.includes(comando)) {
            possuiComando = true;
        }
    });
    return possuiComando;
}