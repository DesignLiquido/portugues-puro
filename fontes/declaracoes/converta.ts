import { Construto } from "../construtos/construto";
import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Declaracao } from "./declaracao";

export class Converta extends Declaracao {
    construtoOrigem: Construto;
    tipo: string;
    especialidade?: string;

    constructor(linha: number, construtoOrigem: Construto, tipo: string, especialidade?: string) {
        super(linha);
        this.construtoOrigem = construtoOrigem;
        this.tipo = tipo;
        this.especialidade = especialidade;
    }

    aceitar(visitante: VisitanteComumInterface): Promise<any> {
        throw new Error("Método não implementado.");
    }
}
