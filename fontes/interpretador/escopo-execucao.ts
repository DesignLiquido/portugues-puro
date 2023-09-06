import { Declaracao } from "../declaracoes/declaracao";
import { Contexto } from "./contexto";
import { EspacoVariaveis } from "./espaco-variaveis";

export type TipoEscopoExecucao = 'funcao' | 'repeticao' | 'outro';

export interface EscopoExecucao {
    declaracoes: Declaracao[];
    declaracaoAtual: number;
    // TODO: Como estruturar o espaço de variáveis?
    espacoVariaveis: EspacoVariaveis;
    contexto: Contexto;
    finalizado: boolean;
    tipo: TipoEscopoExecucao;
    idChamada?: string;
    emLacoRepeticao: boolean;
}
