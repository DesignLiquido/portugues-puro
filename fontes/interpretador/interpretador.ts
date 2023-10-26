import { Construto } from "../construtos/construto";
import { Literal } from "../construtos/literal";
import { ReferenciaContexto } from "../construtos/referencia-contexto";
import { Atribua } from "../declaracoes/atribua";
import { Declaracao } from "../declaracoes/declaracao";
import { Escreva } from "../declaracoes/escreva";
import { VisitanteComumInterface } from "../interfaces/visitante-comum-interface";
import { ErroEmTempoDeExecucao } from "./erro-em-tempo-de-execucao";
import { ErroInterpretador } from "./erro-interpretador";
import { EscopoExecucao } from "./escopo-execucao";
import { EspacoVariaveis } from "./espaco-variaveis";
import { PilhaEscoposExecucao } from "./pilha-escopos-execucao";

export class Interpretador implements VisitanteComumInterface {
    erros: ErroInterpretador[];
    pilhaEscoposExecucao: PilhaEscoposExecucao;
    funcaoDeRetorno: Function = null;
    resultadoInterpretador: Array<string> = [];

    constructor(funcaoDeRetorno: Function = null) {
        this.erros = [];
        this.resultadoInterpretador = [];
        this.pilhaEscoposExecucao = new PilhaEscoposExecucao();
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;

        const escopoExecucao: EscopoExecucao = {
            declaracoes: [],
            declaracaoAtual: 0,
            espacoVariaveis: new EspacoVariaveis(),
            contexto: {},
            finalizado: false,
            tipo: 'outro',
            emLacoRepeticao: false
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
    }

    async avaliar(expressao: Construto | Declaracao): Promise<any> {
        // Descomente o código abaixo quando precisar detectar expressões undefined ou nulas.
        // Por algum motivo o depurador do VSCode não funciona direito aqui
        // com breakpoint condicional.
        /* if (expressao === null || expressao === undefined) {
            console.log('Aqui');
        } */

        if (expressao instanceof ReferenciaContexto) {
            return this.pilhaEscoposExecucao.obterConceitoEmContexto(expressao.conceito.lexema);  // Retorna o valor da variável.
        }
        
        return await expressao.aceitar(this); // Retorna o valor da expressão.
    }

    private async avaliarArgumentosEscreva(argumentos: Construto[]): Promise<string> {
        let formatoTexto: string = '';

        for (const argumento of argumentos) {
            const resultadoAvaliacao = await this.avaliar(argumento); // Avalia o argumento.
            let valor = resultadoAvaliacao?.hasOwnProperty('valor') ? resultadoAvaliacao.valor : resultadoAvaliacao; // Obtém o valor do argumento.

            formatoTexto += `${this.paraTexto(valor)} `; // Converte o valor do argumento para texto e concatena com o formato.
        }

        return formatoTexto.trimEnd();
    }

    async visitarDeclaracaoAtribua(declaracao: Atribua): Promise<any> {
        const valorResolvido = await this.avaliar(declaracao.valor);
        if (declaracao.nome) { // Se a declaração tiver um nome ao invés de um valor literal, 
            this.pilhaEscoposExecucao.atribuirVariavel(declaracao.nome, valorResolvido); // atribui o valor à variável.
        } else {
            const topoDaPilha = this.pilhaEscoposExecucao.topoDaPilha(); // Obtém o escopo de execução atual.
            const alvo = await this.avaliar(declaracao.conceitoAlvo); // Obtém o conceito alvo da atribuição.
            topoDaPilha.contexto[alvo.nome] = valorResolvido; // Atribui o valor à propriedade do contexto.
        }

        return Promise.resolve(valorResolvido);
    }

    async visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any> {
        try {
            const formatoTexto: string = await this.avaliarArgumentosEscreva(declaracao.argumentos);
            this.funcaoDeRetorno(formatoTexto);
            return null;
        } catch (erro: any) {
            this.erros.push({
                erroInterno: erro,
                linha: declaracao.linha
            });
        }
    }

    visitarExpressaoLiteral(expressao: Literal): Promise<any> {
        return Promise.resolve(expressao.valor);
    }

    visitarExpressaoReferenciaContexto(expressao: ReferenciaContexto): Promise<any> {
        const valorEmContexto = this.pilhaEscoposExecucao.obterConceitoEmContexto(expressao.conceito.lexema);
        return Promise.resolve(valorEmContexto);
    }

    private paraTexto(objeto: any): any {
        if (objeto === null || objeto === undefined) return 'nulo';
        if (typeof objeto === 'boolean') {
            return objeto ? 'verdadeiro' : 'falso';
        }

        if (objeto instanceof Date) {
            const formato = Intl.DateTimeFormat('pt', {
                dateStyle: 'full',
                timeStyle: 'full',
            });
            return formato.format(objeto);
        }

        if (Array.isArray(objeto)) return objeto;
        if (typeof objeto === 'object') return JSON.stringify(objeto);

        return objeto.toString();
    }

    private async executar(declaracao: Declaracao, mostrarResultado = false): Promise<any> {
        const resultado: any = await declaracao.aceitar(this);
        if (mostrarResultado) {
            this.funcaoDeRetorno(this.paraTexto(resultado));
        }
        if (resultado || typeof resultado === 'boolean') {
            this.resultadoInterpretador.push(this.paraTexto(resultado));
        }
        return resultado;
    }

    private async executarUltimoEscopo(manterEspacosVariaveis = false): Promise<any> {
        const ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        try {
            let retornoExecucao: any;
            for (
                ;
                ultimoEscopo.declaracaoAtual < ultimoEscopo.declaracoes.length;
                ultimoEscopo.declaracaoAtual++
            ) {
                retornoExecucao = await this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
            }

            return retornoExecucao;
        } catch (erro: any) {
            const declaracaoAtual = ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual];
            this.erros.push({
                erroInterno: erro,
                linha: declaracaoAtual.linha
            });
            return Promise.reject(erro);
        } finally {
            this.pilhaEscoposExecucao.removerUltimo();
            const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();

            if (manterEspacosVariaveis) {
                escopoAnterior.espacoVariaveis.valores = Object.assign(
                    escopoAnterior.espacoVariaveis.valores,
                    ultimoEscopo.espacoVariaveis.valores
                );
            }
        }
    }

    async interpretar(declaracoes: Declaracao[]): Promise<any> {
        this.erros = [];

        const escopoExecucao: EscopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            espacoVariaveis: new EspacoVariaveis(),
            contexto: {},
            finalizado: false,
            tipo: 'outro',
            emLacoRepeticao: false
        };

        this.pilhaEscoposExecucao.empilhar(escopoExecucao);

        try {
            const retornoOuErro = await this.executarUltimoEscopo();
            if (retornoOuErro instanceof ErroEmTempoDeExecucao) {
                this.erros.push(retornoOuErro);
            }
        } catch (erro: any) {
            this.erros.push({
                erroInterno: erro,
                linha: -1,
                hashArquivo: -1,
            });
        }
    }
}
