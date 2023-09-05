import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";

export abstract class Construto {
    linha: number;
    valor?: any;
    abstract aceitar(visitante: VisitanteComumInterface): Promise<any>;
}