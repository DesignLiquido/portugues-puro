import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Simbolo } from "../simbolo";
import { Construto } from "./construto";

export class ReferenciaContexto extends Construto {
    referenciaConceito: Simbolo;
    conceito: Simbolo;
    tipo?: Simbolo;

    constructor(linha: number, referenciaConceito: Simbolo, conceito: Simbolo, tipo?: Simbolo) {
        super(linha);
        this.referenciaConceito = referenciaConceito;
        this.conceito = conceito;
        this.tipo = tipo;
    }

    aceitar(visitante: VisitanteComumInterface): Promise<any> {
        throw new Error("Método não implementado.");
    }
}