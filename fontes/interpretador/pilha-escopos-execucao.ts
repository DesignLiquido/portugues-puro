import { Simbolo } from "../simbolo";
import { Conceito } from "./conceito";
import { ErroEmTempoDeExecucao } from "./erro-em-tempo-de-execucao";
import { EscopoExecucao } from "./escopo-execucao";
import { VariavelInterface } from "./variavel-interface";

export class PilhaEscoposExecucao {
    pilha: EscopoExecucao[];

    constructor() {
        this.pilha = [];
    }

    empilhar(item: EscopoExecucao): void {
        this.pilha.push(item);
    }

    eVazio(): boolean {
        return this.pilha.length === 0;
    }

    elementos(): number {
        return this.pilha.length;
    }

    naPosicao(posicao: number): EscopoExecucao {
        return this.pilha[posicao];
    }

    topoDaPilha(): EscopoExecucao {
        if (this.eVazio()) throw new Error('Pilha vazia.');
        return this.pilha[this.pilha.length - 1];
    }

    removerUltimo(): EscopoExecucao {
        if (this.eVazio()) throw new Error('Pilha vazia.');
        return this.pilha.pop();
    }

    private converterValor(tipo: string, valor: any) {
        switch (tipo) {
            case 'texto':
                return String(valor);
            case 'número':
                return Number(valor);
            case 'lógico':
                return Boolean(valor);
            default:
                return valor;
        }
    }

    private inferirTipoVariavel(variavel: string | number | Array<any> | boolean | null | undefined) {
        const tipo = typeof variavel;
        switch (tipo) {
            case 'string':
                return 'texto';
            case 'number':
                return 'número';
            case 'bigint':
                return 'longo';
            case 'boolean':
                return 'lógico';
            case 'undefined':
                return 'nulo';
            case 'object':
                if (Array.isArray(variavel)) return 'vetor';
                return 'dicionário';
            case 'function':
                return 'função';
            case 'symbol':
                return 'símbolo';
        }
    }

    definirVariavel(nomeVariavel: string, valor: any, subtipo?: string) {
        const variavel = this.pilha[this.pilha.length - 1].espacoVariaveis.valores[nomeVariavel];
        const tipo = variavel && variavel.hasOwnProperty('tipo') ? variavel.tipo : this.inferirTipoVariavel(valor);

        let elementoAlvo: VariavelInterface = {
            valor: this.converterValor(tipo, valor),
            tipo: tipo,
            subtipo: undefined,
            imutavel: false
        };

        if (subtipo !== undefined) {
            (elementoAlvo.subtipo as any) = subtipo;
        }

        this.pilha[this.pilha.length - 1].espacoVariaveis.valores[nomeVariavel] = elementoAlvo;
    }

    atribuirVariavelEm(distancia: number, simbolo: any, valor: any): void {
        const ambienteAncestral = this.pilha[this.pilha.length - distancia].espacoVariaveis;
        if (ambienteAncestral.valores[simbolo.lexema].imutavel) {
            throw new ErroEmTempoDeExecucao(simbolo, `Constante '${simbolo.lexema}' não pode receber novos valores.`);
        }
        ambienteAncestral.valores[simbolo.lexema] = {
            valor,
            tipo: this.inferirTipoVariavel(valor),
            imutavel: false
        };
    }

    atribuirVariavel(simbolo: Simbolo, valor: any) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].espacoVariaveis;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                const variavel = ambiente.valores[simbolo.lexema];
                if (variavel.imutavel) {
                    throw new ErroEmTempoDeExecucao(
                        simbolo,
                        `Constante '${simbolo.lexema}' não pode receber novos valores.`
                    );
                }
                const tipo = variavel && variavel.hasOwnProperty('tipo') ? variavel.tipo : this.inferirTipoVariavel(valor);

                const valorResolvido = this.converterValor(tipo, valor);
                ambiente.valores[simbolo.lexema] = {
                    valor: valorResolvido,
                    tipo,
                    imutavel: false
                };
                return;
            }
        }

        throw new ErroEmTempoDeExecucao(simbolo, "Variável não definida '" + simbolo.lexema + "'.");
    }

    obterEscopoPorTipo(tipo: string): EscopoExecucao | undefined {
        for (let i = 1; i <= this.pilha.length; i++) {
            const escopoAtual = this.pilha[this.pilha.length - i];
            if (escopoAtual.tipo === tipo) {
                return escopoAtual;
            }
        }

        return undefined;
    }

    obterVariavelEm(distancia: number, nome: string): VariavelInterface {
        const ambienteAncestral = this.pilha[this.pilha.length - distancia].espacoVariaveis;
        return ambienteAncestral.valores[nome];
    }

    obterValorVariavel(simbolo: Simbolo): VariavelInterface {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].espacoVariaveis;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                return ambiente.valores[simbolo.lexema];
            }
        }

        throw new ErroEmTempoDeExecucao(simbolo, "Variável não definida: '" + simbolo.lexema + "'.");
    }

    obterVariavelPorNome(nome: string): VariavelInterface {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].espacoVariaveis;
            if (ambiente.valores[nome] !== undefined) {
                return ambiente.valores[nome];
            }
        }

        throw new ErroEmTempoDeExecucao(
            new Simbolo('especial', nome, nome, -1),
            "Variável não definida: '" + nome + "'."
        );
    }

    /**
     * Método usado pelo depurador para obter todas as variáveis definidas.
     */
    obterTodasVariaveis(todasVariaveis: VariavelInterface[] = []): any[] {
        for (let i = 1; i <= this.pilha.length - 1; i++) {
            const valoresAmbiente = this.pilha[this.pilha.length - i].espacoVariaveis.valores;

            const vetorObjeto: VariavelInterface[] = Object.entries(valoresAmbiente).map((chaveEValor, indice) => ({
                nome: chaveEValor[0],
                valor: chaveEValor[1].valor,
                tipo: chaveEValor[1].tipo,
                imutavel: chaveEValor[1].imutavel
            }));
            todasVariaveis = todasVariaveis.concat(vetorObjeto);
        }

        return todasVariaveis;
    }

    obterConceitoEmContexto(nome: string): Conceito {
        for (let i = 1; i <= this.pilha.length - 1; i++) {
            const contexto = this.pilha[this.pilha.length - i].contexto;
            if (contexto.hasOwnProperty(nome)) {
                return contexto[nome];
            }
        }

        // Conceito ainda não existe.
        return {
            nome,
            valor: undefined
        }

        /* throw new ErroEmTempoDeExecucao(
            new Simbolo('especial', nome, nome, -1),
            "Conceito em contexto não definido: '" + nome + "'."
        ); */
    }
}
