import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Simbolo } from "../simbolo";
import { Declaracao } from "./declaracao";

export class Axioma extends Declaracao {
    simboloDefinicao: Simbolo;
    simboloAxiomaAnterior: Simbolo;

    constructor(linha: number, simboloDefinicao: Simbolo, simboloAxiomaAnterior: Simbolo) {
        super(linha);
        this.simboloDefinicao = simboloDefinicao;
        this.simboloAxiomaAnterior = simboloAxiomaAnterior;
    }

    aceitar(visitante: VisitanteComumInterface): Promise<any> {
        throw new Error("Método não implementado.");
    }
}
