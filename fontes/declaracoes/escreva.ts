import { Construto } from '../construtos/construto';
import { VisitanteComumInterface } from '../interfaces/visitante-comum-interface';
import { Declaracao } from './declaracao';

export class Escreva extends Declaracao {
    argumentos: Construto[];

    constructor(linha: number, argumentos: Construto[]) {
        super(linha);
        this.argumentos = argumentos;
    }

    async aceitar(visitante: VisitanteComumInterface): Promise<any> {
        return await visitante.visitarDeclaracaoEscreva(this); 
        // O método visitarDeclaracaoEscreva() recebe uma declaração Escreva como argumento e devolve um valor qualquer.
    }
}
