import { Simbolo } from "../simbolo";

export class ErroAvaliadorSintatico extends Error {
    simbolo: Simbolo;

    constructor(simbolo: Simbolo, mensagem: string) {
        super(mensagem);
        this.simbolo = simbolo;
        Object.setPrototypeOf(this, ErroAvaliadorSintatico.prototype);
    }
}
