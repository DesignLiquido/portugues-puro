import tiposDeSimbolos from "./tipos-de-simbolos";
import { ErroLexador } from "./tipos/erro-lexador";
import { Simbolo } from "./simbolo";
import { palavrasReservadas } from "./palavras-reservadas";

/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais e assim por diante.
 */
export class Lexador {
    codigo: string[];
    simbolos: Simbolo[];
    erros: ErroLexador[];
    atual: number;
    linha: number;
    inicioSimbolo: number;

    constructor() {
        this.codigo = [];
        this.simbolos = [];
        this.erros = [];
        this.atual = 0;
        this.linha = 0;
        this.inicioSimbolo = 0;
    }

    eDigito(caractere: string): boolean {
        return caractere >= '0' && caractere <= '9';
    }

    eAlfabeto(caractere: string): boolean {
        const acentuacoes = [
            'á',
            'Á',
            'ã',
            'Ã',
            'â',
            'Â',
            'à',
            'À',
            'é',
            'É',
            'ê',
            'Ê',
            'í',
            'Í',
            'ó',
            'Ó',
            'õ',
            'Õ',
            'ô',
            'Ô',
            'ú',
            'Ú',
            'ç',
            'Ç',
            '_',
        ];

        return (
            (caractere >= 'a' && caractere <= 'z') ||
            (caractere >= 'A' && caractere <= 'Z') ||
            acentuacoes.includes(caractere)
        );
    }

    eAlfabetoOuDigito(caractere: any): boolean {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    }

    eFinalDaLinha(): boolean {
        if (this.codigo.length === this.linha) {
            return true;
        }
        return this.atual >= this.codigo[this.linha].length;
    }

    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha(): boolean {
        return this.linha >= this.codigo.length - 1;
    }

    eFinalDoCodigo(): boolean {
        return this.eUltimaLinha() && this.codigo[this.codigo.length - 1].length <= this.atual;
    }

    avancar(): void {
        this.atual += 1;
        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
        }
    }

    adicionarSimbolo(tipo: string, literal: any = null): void {
        const texto: string = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new Simbolo(tipo, literal || texto, literal, this.linha + 1));
    }

    analisarNumero(): void {
        while (this.eDigito(this.codigo[this.linha][this.atual])) {
            this.avancar();
        }

        if (this.codigo[this.linha][this.atual] == '.' && this.eDigito(this.codigo[this.linha][this.atual + 1])) {
            this.avancar();

            while (this.eDigito(this.codigo[this.linha][this.atual])) {
                this.avancar();
            }
        }

        const numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);

        this.adicionarSimbolo(tiposDeSimbolos.NÚMERO, parseFloat(numeroCompleto));
    }

    analisarTexto(delimitador = '"'): void {
        while (this.codigo[this.linha][this.atual] !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }

        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.codigo[this.linha][this.atual - 1],
                mensagem: 'Texto não finalizado.',
            } as ErroLexador);
            return;
        }

        const valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(tiposDeSimbolos.TEXTO, valor);
    }

    identificarPalavraChave(): void {
        while (this.eAlfabetoOuDigito(this.codigo[this.linha][this.atual])) {
            this.avancar();
        }

        const codigo: string = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual).toUpperCase();
        const tipo: string = codigo in palavrasReservadas ? palavrasReservadas[codigo] : tiposDeSimbolos.IDENTIFICADOR;

        this.adicionarSimbolo(tipo);
    }

    analisarCaractereAtual(): void {
        const caractere = this.codigo[this.linha][this.atual];

        switch (caractere) {
            case '.':
                this.adicionarSimbolo(tiposDeSimbolos.PONTO);
                this.avancar();
                break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
                this.avancar();
                break;
            // Esta sessão ignora espaços em branco.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
                this.avancar();
                break;
            default:
                if (this.eDigito(caractere)) this.analisarNumero();
                else if (this.eAlfabeto(caractere)) this.identificarPalavraChave();
                else {
                    this.erros.push({
                        linha: this.linha + 1,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.',
                    } as ErroLexador);
                    this.avancar();
                }
        }
    }

    mapear(codigo: string[]) {
        this.codigo = codigo;
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;

        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarCaractereAtual();
        }

        return {
            simbolos: this.simbolos,
            erros: this.erros
        }
    }
}