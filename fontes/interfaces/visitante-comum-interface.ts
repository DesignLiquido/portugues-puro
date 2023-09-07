import { Literal } from "../construtos/literal";
import { Atribua } from "../declaracoes/atribua";
import { Escreva } from "../declaracoes/escreva";

export interface VisitanteComumInterface { 
    // A interface VisitanteComumInterface é implementada por classes que desejam visitar os construtos e declarações.
    // Os métodos visitar[..]() recebe muma declaração como argumento e devolvem um valor qualquer.
    visitarDeclaracaoAtribua(declaracao: Atribua): Promise<any>; 
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
}
