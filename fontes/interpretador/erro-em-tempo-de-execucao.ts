import { Simbolo } from "../simbolo";

export class ErroEmTempoDeExecucao extends Error {
    simbolo: Simbolo;
    mensagem: string;
    linha?: number;

    constructor(simbolo?: Simbolo, mensagem?: string, linha?: number) {
        super(mensagem);
        this.simbolo = simbolo;
        this.mensagem = mensagem;
        this.linha = linha;
        Object.setPrototypeOf(this, ErroEmTempoDeExecucao.prototype);
    }
}
