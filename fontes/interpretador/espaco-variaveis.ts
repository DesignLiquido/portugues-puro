import { VariavelInterface } from "./variavel-interface";

/**
 * Um espaço de variáveis é ligado a um `EscopoExecucao`.
 * Contém os valores de variáveis e resoluções de chamadas.
 *
 * As resoluções de chamadas são utilizadas pelo depurador quando
 * uma certa linha precisa "executar duas vezes". Isso acontece quando
 * um ponto de parada é ativado dentro de um escopo relacionado com
 * a chamada. É apenas usado pelo Interpretador com Depuração.
 */
export class EspacoVariaveis {
    valores: { [nome: string]: VariavelInterface };
    resolucoesChamadas: { [id: string]: any };

    constructor() {
        this.valores = {};
        this.resolucoesChamadas = {};
    }

    /*
    // Método para definir o valor de uma variável no espaço de variáveis
    public setVariavel(nome: string, valor: VariavelInterface): void {
        this.valores[nome] = valor;
    }

    // Método para obter o valor de uma variável do espaço de variáveis
    public getVariavel(nome: string): VariavelInterface | undefined {
        return this.valores[nome];
    }

    // Método para verificar se uma variável existe no espaço de variáveis
    public existeVariavel(nome: string): boolean {
        return nome in this.valores;
    }

    // Método para definir uma resolução de chamada
    public setResolucaoChamada(id: string, resolucao: any): void {
        this.resolucoesChamadas[id] = resolucao;
    }

    // Método para obter uma resolução de chamada
    public getResolucaoChamada(id: string): any {
        return this.resolucoesChamadas[id];
    }

    // Método para verificar se uma resolução de chamada existe
    public existeResolucaoChamada(id: string): boolean {
        return id in this.resolucoesChamadas;
    }
    */
}
