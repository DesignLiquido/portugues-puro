import { Construto } from "../construtos/construto";
import { Literal } from "../construtos/literal";
import { ReferenciaContexto } from "../construtos/referencia-contexto";
import { Atribua } from "../declaracoes/atribua";
import { Axioma } from "../declaracoes/axioma";
import { Converta } from "../declaracoes/converta";
import { Declaracao } from "../declaracoes/declaracao";
import { Escreva } from "../declaracoes/escreva";
import { Simbolo } from "../simbolo";
import tiposDeSimbolos from "../tipos-de-simbolos";
import { ErroAvaliadorSintatico } from "./erro-avaliador-sintatico";

export class AvaliadorSintatico {
    simbolos: Simbolo[];
    erros: ErroAvaliadorSintatico[];

    atual: number;

    constructor() {
        this.erros = [];
        this.simbolos = [];
        this.atual = 0;
    }

    private erro(simbolo: Simbolo, mensagemDeErro: string): ErroAvaliadorSintatico {
        const excecao = new ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }

    private verificarTipoSimboloAtual(tipo: string): boolean {
        if (this.atual >= this.simbolos.length) return false; // Se não houver mais símbolos, não haverá como verificar o tipo do símbolo atual
        return this.simbolos[this.atual].tipo === tipo;
    }

    private verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean { // Verifica se o tipo do símbolo atual é igual a algum dos tipos passados como argumento
        for (let i = 0; i < argumentos.length; i++) { 
            const tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }

        return false;
    }

    private avancarEDevolverAnterior(): Simbolo { // Avança o ponteiro de leitura e devolve o símbolo anterior
        if (this.atual < this.simbolos.length) this.atual += 1;
        return this.simbolos[this.atual - 1];
    }

    private consumir(tipo: string, mensagemDeErro: string): Simbolo { // Verifica se o tipo do símbolo atual é igual ao tipo passado como argumento. 
        if (this.verificarTipoSimboloAtual(tipo)) return this.avancarEDevolverAnterior(); // Se for, avança o ponteiro de leitura e devolve o símbolo anterior. 
        throw this.erro(this.simbolos[this.atual], mensagemDeErro); // Se não for, lança uma exceção.
    }

    private referenciaContextoComQualificador(operacao: string, referenciaSimboloAlvo: Simbolo, simboloAlvo: Simbolo) {
        switch (this.simbolos[this.atual].lexema.toLowerCase()) {
            case 'decimal':
            case 'hexadecimal':
                const tipoQualificador = this.avancarEDevolverAnterior();
                return new ReferenciaContexto(
                    simboloAlvo.linha, 
                    referenciaSimboloAlvo,
                    simboloAlvo,
                    tipoQualificador
                );
            default:
                throw this.erro(this.simbolos[this.atual], `Tipo de dados inválido para alvo da ${operacao}: ${this.simbolos[this.atual].lexema}.`);
        }
    }

    private declaracaoAtribuaPorLiteral(simboloInicial: Simbolo): Atribua {
        const simboloIdentificadorOuLiteral = this.avancarEDevolverAnterior();
        const valor = new Literal(simboloIdentificadorOuLiteral);

        this.consumir(tiposDeSimbolos.PARA, `Esperado um símbolo do grupo 'PARA' após literal ou identificador em declaração "Atribua".`);
        const referenciaAlvoAtribuição = this.consumir(
            (tiposDeSimbolos.ARTIGOS_INDEFINIDOS || tiposDeSimbolos.ARTIGOS_DEFINIDOS), 
            `Esperado um símbolo do grupo 'ARTIGOS' após "para" em declaração "Atribua".`
        );
        // Atribua 123 para um número. 
        // Atribua o 456 para O número. -> reatribuição do valor da variável local número, inicializada anteriormente com o valor 123.
        //                    ^
        //                    |

        const simboloAlvoAtribuicao = this.avancarEDevolverAnterior();
        let alvoAtribuicao;
        if (this.verificarTipoSimboloAtual(tiposDeSimbolos.IDENTIFICADOR)) {
            alvoAtribuicao = this.referenciaContextoComQualificador("atribuição", referenciaAlvoAtribuição, simboloAlvoAtribuicao);
        } else {
            alvoAtribuicao = new ReferenciaContexto(simboloAlvoAtribuicao.linha, referenciaAlvoAtribuição, simboloAlvoAtribuicao);
        }

        this.consumir(tiposDeSimbolos.PONTO, "Esperado ponto final para finalizar expressão.");

        return new Atribua(
            simboloInicial.linha,
            valor,
            alvoAtribuicao
        );
    }

    private declaracaoAtribua(): Atribua {
        const simboloInicial = this.avancarEDevolverAnterior();

        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.HEXADECIMAL:
            case tiposDeSimbolos.NÚMERO:
            case tiposDeSimbolos.TEXTO:
                return this.declaracaoAtribuaPorLiteral(simboloInicial);
            case tiposDeSimbolos.ARTIGOS_DEFINIDOS:
                const referenciaConceito = this.avancarEDevolverAnterior();
                const conceito = this.avancarEDevolverAnterior();
                const valor = new ReferenciaContexto(
                    simboloInicial.linha,
                    referenciaConceito,
                    conceito
                );

                this.consumir(tiposDeSimbolos.PARA, `Esperado um símbolo do grupo 'PARA' após literal ou identificador em declaração "Atribua".`);
                this.consumir((tiposDeSimbolos.ARTIGOS_INDEFINIDOS || tiposDeSimbolos.ARTIGOS_DEFINIDOS), `Esperado um símbolo do grupo 'ARTIGOS' após "para" em declaração "Atribua".`);
                // Atribua 123 para um número. 
                // Atribua o 456 para UM número. => Erro. Variável local [número] já declarada anteriormente.
                //                    ^^
                const segundaReferenciaConceito = this.avancarEDevolverAnterior();
                const segundoConceito = new ReferenciaContexto(segundaReferenciaConceito.linha, segundaReferenciaConceito, segundaReferenciaConceito);

                this.consumir(tiposDeSimbolos.PONTO, "Esperado ponto final para finalizar expressão.");

                return new Atribua(
                    simboloInicial.linha,
                    valor,
                    segundoConceito
                );
        }
    }

    private declaracaoAxioma(): Axioma {
        const simboloInicial = this.avancarEDevolverAnterior();

        const simboloDefinicao = this.consumir(tiposDeSimbolos.IDENTIFICADOR, `Esperado um identificador após "${simboloInicial.lexema}".`);
        this.consumir(tiposDeSimbolos.VERBOS, `Esperado um símbolo do grupo 'VERBOS' após ${simboloDefinicao.lexema}`);

        if (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ARTIGOS_INDEFINIDOS)) {
            throw this.erro(this.simbolos[this.atual], `Esperado um símbolo do grupo 'ARTIGOS_INDEFINIDOS' após 'VERBO'.`);
        }

        const axiomaDefinidoPor = this.consumir(tiposDeSimbolos.IDENTIFICADOR, `Esperado um identificador após um símbolo do grupo 'ARTIGOS_INDEFINIDOS'.`);

        this.consumir(tiposDeSimbolos.PONTO, `Esperado um símbolo do grupo 'PONTO' após "${axiomaDefinidoPor.lexema}".`);

        return new Axioma(simboloInicial.linha, simboloDefinicao, axiomaDefinidoPor);
    }

    private declaracaoConverta(): Converta {
        const simboloConverta = this.avancarEDevolverAnterior();

        let construtoArgumento: Construto;
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.TEXTO: // string literal
                const simboloIdentificadorOuLiteral = this.avancarEDevolverAnterior();
                construtoArgumento = new Literal(simboloIdentificadorOuLiteral);
                break;
            case tiposDeSimbolos.ARTIGOS_DEFINIDOS:
            case tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_2A_PESSOA:                        
                const referenciaConceito = this.avancarEDevolverAnterior();
                const conceito = this.avancarEDevolverAnterior();

                if (this.verificarTipoSimboloAtual(tiposDeSimbolos.IDENTIFICADOR)) {
                    construtoArgumento = this.referenciaContextoComQualificador("conversão", referenciaConceito, conceito);
                } else {
                    construtoArgumento = new ReferenciaContexto(
                        simboloConverta.linha,
                        referenciaConceito,
                        conceito
                    );
                }

                break;
            default:
                throw this.erro(this.simbolos[this.atual], `Esperado ou um literal de texto, ou uma referência ao contexto, após "Escreva".`);
        }
        
        this.consumir(tiposDeSimbolos.PARA, `Esperado palavra-chave "para" após definição de alvo da conversão, em instrução "Converta".`);
        this.consumir(tiposDeSimbolos.ARTIGOS_INDEFINIDOS, `Esperado artigo indefinido ("um" ou "uma") após palavra-chave "para" em instrução "Converta".`);

        // TODO: Testar identificador?
        let tipoConversão;
        let especialidade;
        switch (this.simbolos[this.atual].lexema.toLowerCase()) {
            case "número":
                const simboloTipoConversão = this.avancarEDevolverAnterior();
                tipoConversão = simboloTipoConversão.lexema;
                if (this.simbolos[this.atual].tipo === tiposDeSimbolos.IDENTIFICADOR) {
                    switch (this.simbolos[this.atual].lexema.toLowerCase()) {
                        case "decimal":
                            this.avancarEDevolverAnterior();
                            especialidade = "decimal";
                            break;
                        default:
                            throw this.erro(this.simbolos[this.atual], `Tipo de dados inválido para especialidade de número: ${this.simbolos[this.atual].lexema}.`);
                    }
                }
        }

        this.consumir(tiposDeSimbolos.PONTO, `Esperado um símbolo do grupo 'PONTO' após tipo para conversão em instrução "Converta".`);

        return new Converta(
            simboloConverta.linha,
            construtoArgumento,
            tipoConversão,
            especialidade
        );
    }

    private declaracaoEscreva(): Escreva {
        const simboloEscreva = this.avancarEDevolverAnterior();

        let construtoArgumento: Construto;
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.TEXTO: // string literal
                const simboloIdentificadorOuLiteral = this.avancarEDevolverAnterior();
                construtoArgumento = new Literal(simboloIdentificadorOuLiteral);
                break;
            case tiposDeSimbolos.ARTIGOS_DEFINIDOS:
            case tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_2A_PESSOA:                        
                const referenciaConceito = this.avancarEDevolverAnterior();
                const conceito = this.avancarEDevolverAnterior();

                if (this.verificarTipoSimboloAtual(tiposDeSimbolos.IDENTIFICADOR)) {
                    construtoArgumento = this.referenciaContextoComQualificador("conversão", referenciaConceito, conceito);
                } else {
                    construtoArgumento = new ReferenciaContexto(
                        simboloEscreva.linha,
                        referenciaConceito,
                        conceito
                    );
                }
                construtoArgumento = new ReferenciaContexto(
                    simboloEscreva.linha,
                    referenciaConceito,
                    conceito
                );

                break;
            default:
                throw this.erro(this.simbolos[this.atual], `Esperado ou um literal de texto, ou uma referência ao contexto, após "Escreva".`);
        }

        this.consumir(tiposDeSimbolos.PONTO, "Esperado ponto final para finalizar expressão.");

        return new Escreva(
            simboloEscreva.linha, [
                construtoArgumento
            ]
        );
    }

    private resolverDeclaracao(): any {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.ATRIBUA:
                return this.declaracaoAtribua();
            case tiposDeSimbolos.CONVERTA:
                return this.declaracaoConverta();
            case tiposDeSimbolos.ESCREVA:
                return this.declaracaoEscreva();
            case tiposDeSimbolos.ARTIGOS_INDEFINIDOS:
                return this.declaracaoAxioma();
        }
    }

    /**
     * O ponto de entrada para a avaliação sintática.
     * @param simbolos Um vetor de símbolos montada pelo Lexador.
     * @returns Um vetor de declarações de alto nível.
     */
    analisar(simbolos: Simbolo[]) {
        this.erros = [];
        this.atual = 0;

        this.simbolos = simbolos || [];
        let declaracoes: Declaracao[] = [];
        
        while (this.atual < this.simbolos.length) {
            declaracoes.push(this.resolverDeclaracao());
        }

        return declaracoes;
    }
}