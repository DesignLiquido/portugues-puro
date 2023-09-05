import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";

export abstract class Construto {
    linha: number;

    constructor(linha: number) {
        this.linha = linha;
    }

    abstract aceitar(visitante: VisitanteComumInterface): Promise<any>;
}