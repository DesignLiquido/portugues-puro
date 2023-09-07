import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";

export abstract class Declaracao {
    linha: number;

    constructor(linha: number) {
        this.linha = linha;
    }

    abstract aceitar(visitante: VisitanteComumInterface): Promise<any>; 
    // O método aceitar() é abstrato, portanto, as classes filhas são obrigadas a implementá-lo.
    // O método aceitar() recebe um visitante como argumento e devolve um valor qualquer.
    // O visitante é uma classe que implementa a interface VisitanteComumInterface.
    
}
