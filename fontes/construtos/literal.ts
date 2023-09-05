import { VisitanteComumInterface } from '../interfaces/visitante-comum-interface';
import { Simbolo } from '../simbolo';
import { Construto } from './construto';

export type ValorLiteral = number | string | number[] | string[] | any;

export class Literal extends Construto {
    linha: number;
    valor: ValorLiteral;

    constructor(simboloLiteral: Simbolo) {
        super(simboloLiteral.linha);
        this.valor = simboloLiteral.literal;
    }

    async aceitar(visitante: VisitanteComumInterface): Promise<any> {
        return await visitante.visitarExpressaoLiteral(this);
    }
}
