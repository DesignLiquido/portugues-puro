import { Construto } from "../construtos/construto";
import { Literal } from "../construtos/literal";
import { ReferenciaContexto } from "../construtos/referencia-contexto";
import { Atribua } from "../declaracoes/atribua";
import { Axioma } from "../declaracoes/axioma";
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

    private declaracaoAxioma(): Axioma { 
        const simboloInicial = this.simbolos[this.atual];

        const simboloDefinicao = this.consumir(tiposDeSimbolos.IDENTIFICADOR, `Esperado um identificador após "${simboloInicial.lexema}".`);
        this.consumir(tiposDeSimbolos.É, `Esperado "é" após ${simboloDefinicao.lexema}`);

        if (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.UM, tiposDeSimbolos.UMA)) {
            throw this.erro(this.simbolos[this.atual], `Esperado "um" ou "uma" após "é".`);
        }

        const axiomaDefinidoPor = this.consumir(tiposDeSimbolos.IDENTIFICADOR, `Esperado um identificador após "um"/"uma".`);

        // TODO: Ponto final é opcional? Não.
        this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO);

        return new Axioma(simboloInicial.linha, simboloDefinicao, axiomaDefinidoPor);
    }

    private declaracaoEscreva(): Escreva {
        const simboloEscreva = this.simbolos[this.atual - 1];

        let construtoArgumento: Construto;
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.TEXTO:
                const simboloIdentificadorOuLiteral = this.avancarEDevolverAnterior();
                construtoArgumento = new Literal(simboloIdentificadorOuLiteral);
                // TODO: Ponto final é opcional?
                this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO);
                break;
            case tiposDeSimbolos.A:
            case tiposDeSimbolos.ESSE:
            case tiposDeSimbolos.ESSA:
            case tiposDeSimbolos.O:
                const referenciaConceito = this.avancarEDevolverAnterior();
                const conceito = this.avancarEDevolverAnterior();
                construtoArgumento = new ReferenciaContexto(
                    simboloEscreva.linha,
                    referenciaConceito,
                    conceito
                );
                // TODO: Ponto final é opcional?
                this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO);
                break;
            default:
                throw this.erro(this.simbolos[this.atual], `Esperado ou um literal de texto, ou uma referência ao contexto, após "Escreva".`);
        }

        return new Escreva(
            simboloEscreva.linha, [
                construtoArgumento
            ]
        );
    }

    private declaracaoAtribua(): Atribua {
        const simboloInicial = this.simbolos[this.atual];

        const identificadorOuLiteral = this.consumir(tiposDeSimbolos.TEXTO, `Esperado um texto após "Atribua".`);

        this.consumir(tiposDeSimbolos.A, `Esperado "a" após literal ou identificador em declaração "Atribua".`);
        this.consumir(tiposDeSimbolos.UM, `Esperado "um" após "a" em declaração "Atribua".`);

        const tipoAtribuicao = this.avancarEDevolverAnterior();

        // TODO: Ponto final é opcional?
        this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO);

        return new Atribua(
            simboloInicial.linha,
            identificadorOuLiteral,
            tipoAtribuicao
        );
    }

    private resolverDeclaracao(): any {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.ATRIBUA:
                this.avancarEDevolverAnterior();
                return this.declaracaoAtribua();
            case tiposDeSimbolos.ESCREVA:
                this.avancarEDevolverAnterior();
                return this.declaracaoEscreva();
            case tiposDeSimbolos.UM:
            case tiposDeSimbolos.UMA:
                this.avancarEDevolverAnterior();
                return this.declaracaoAxioma();
        }
    }

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