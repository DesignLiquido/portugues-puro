import { Literal } from "../construtos/literal";
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
        if (this.atual >= this.simbolos.length) return false;
        return this.simbolos[this.atual].tipo === tipo;
    }

    private verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean {
        for (let i = 0; i < argumentos.length; i++) {
            const tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }

        return false;
    }

    private avancarEDevolverAnterior(): Simbolo {
        if (this.atual < this.simbolos.length) this.atual += 1;
        return this.simbolos[this.atual - 1];
    }

    private consumir(tipo: string, mensagemDeErro: string): Simbolo {
        if (this.verificarTipoSimboloAtual(tipo)) return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    }

    private declaracaoAxioma(): Axioma {
        const simboloInicial = this.simbolos[this.atual];

        const simboloDefinicao = this.consumir(tiposDeSimbolos.IDENTIFICADOR, `Esperado um identificador após "${simboloInicial.lexema}".`);
        this.consumir(tiposDeSimbolos.É, `Esperado "é" após ${simboloDefinicao.lexema}`);

        if (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.UM, tiposDeSimbolos.UMA)) {
            throw this.erro(this.simbolos[this.atual], `Espero "um" ou "uma" após "é".`);
        }

        const axiomaDefinidoPor = this.consumir(tiposDeSimbolos.IDENTIFICADOR, `Esperado um identificador após "um"/"uma".`);

        // TODO: Ponto final é opcional?
        this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO);

        return new Axioma(simboloInicial.linha, simboloDefinicao, axiomaDefinidoPor);
    }

    private declaracaoEscreva(): Escreva {
        const simboloInicial = this.simbolos[this.atual];

        const identificadorOuLiteral = this.consumir(tiposDeSimbolos.TEXTO, `Esperado um texto após "Escreva".`);

        // TODO: Ponto final é opcional?
        this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO);

        return new Escreva(
            simboloInicial.linha, [
                new Literal(identificadorOuLiteral)
            ]
        );
    }

    private resolverDeclaracao(): any {
        switch (this.simbolos[this.atual].tipo) {
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