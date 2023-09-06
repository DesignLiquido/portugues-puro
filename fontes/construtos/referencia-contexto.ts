import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Simbolo } from "../simbolo";
import { Construto } from "./construto";

export class ReferenciaContexto extends Construto {
    referenciaConceito: Simbolo;
    conceito: Simbolo;

    constructor(linha: number, referenciaConceito: Simbolo, conceito: Simbolo) {
        super(linha);
        this.referenciaConceito = referenciaConceito;
        this.conceito = conceito;
    }

    aceitar(visitante: VisitanteComumInterface): Promise<any> {
        throw new Error("Método não implementado.");
    }
}