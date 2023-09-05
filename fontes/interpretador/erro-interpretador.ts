import { Simbolo } from "../simbolo";

export interface ErroInterpretador {
    simbolo?: Simbolo;
    mensagem?: string;
    erroInterno?: any;
    linha?: number;
    hashArquivo?: number;
}
