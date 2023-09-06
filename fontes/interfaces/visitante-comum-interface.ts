import { Literal } from "../construtos/literal";
import { Atribua } from "../declaracoes/atribua";
import { Escreva } from "../declaracoes/escreva";

export interface VisitanteComumInterface {
    visitarDeclaracaoAtribua(declaracao: Atribua): Promise<any>;
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
}
