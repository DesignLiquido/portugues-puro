import { VisitanteComumInterface } from '../interfaces/visitante-comum-interface';
import { Simbolo } from '../simbolo';
import { Construto } from './construto';

export type Fração = {
    numerador: number,
    denominador: number
}

export type ValorLiteral = number | string | number[] | string[] | Fração | any;

export class Literal extends Construto {
    linha: number;
    valor: ValorLiteral;

    constructor(simboloLiteral: Simbolo) {
        super(simboloLiteral.linha);
        this.valor = simboloLiteral.literal; // Atribui o valor do literal ao atributo valor.
    }

    async aceitar(visitante: VisitanteComumInterface): Promise<any> {
        return await visitante.visitarExpressaoLiteral(this);
    }
}
