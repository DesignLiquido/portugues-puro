import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";

export abstract class Declaracao {
    linha: number;

    constructor(linha: number) {
        this.linha = linha;
    }

    abstract aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
