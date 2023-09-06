import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Simbolo } from "../simbolo";
import { Declaracao } from "./declaracao";

export class Atribua extends Declaracao {
    simboloLiteral: Simbolo;
    simboloTipo: Simbolo;

    constructor(linha: number, simboloLiteral: Simbolo, simboloTipo: Simbolo) {
        super(linha);
        this.simboloLiteral = simboloLiteral;
        this.simboloTipo = simboloTipo;
    }

    aceitar(visitante: VisitanteComumInterface): Promise<any> {
        throw new Error("Método não implementado.");
    }
}