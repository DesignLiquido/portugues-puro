import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Simbolo } from "../simbolo";
import { Declaracao } from "./declaracao";

export class Atribua extends Declaracao {
    nome?: Simbolo;
    simboloLiteral: Simbolo;
    simboloTipo: Simbolo;

    constructor(linha: number, simboloLiteral: Simbolo, simboloTipo: Simbolo) {
        super(linha);
        this.simboloLiteral = simboloLiteral;
        this.simboloTipo = simboloTipo;
    }

    async aceitar(visitante: VisitanteComumInterface): Promise<any> {
        return await visitante.visitarDeclaracaoAtribua(this);
    }
}