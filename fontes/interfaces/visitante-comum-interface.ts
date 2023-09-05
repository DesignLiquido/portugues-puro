import { Literal } from "../construtos/literal";
import { Escreva } from "../declaracoes/escreva";

export interface VisitanteComumInterface {
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
}
