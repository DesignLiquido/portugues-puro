import { Construto } from "../construtos/construto";
import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { Simbolo } from "../simbolo";
import { Declaracao } from "./declaracao";

export class Atribua extends Declaracao {
    nome?: Simbolo;
    valor: Construto;
    conceitoAlvo: Construto;

    constructor(linha: number, valor: Construto, conceitoAlvo: Construto) {
        super(linha);
        this.valor = valor;
        this.conceitoAlvo = conceitoAlvo;
    }

    async aceitar(visitante: VisitanteComumInterface): Promise<any> {
        return await visitante.visitarDeclaracaoAtribua(this);
    }
}
