import tiposDeSimbolos from "../tipos-de-simbolos";
import { ErroLexador } from "./erro-lexador";
import { Simbolo } from "../simbolo";
import { palavrasReservadas } from "../palavras-reservadas";

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

    private éDigitoBase10(caractere: string): boolean {
        return caractere >= '0' && caractere <= '9';
    }

    private éDigitoBase16(caractere: string): boolean {
        return caractere >= '0' && caractere <= 'F';
    }

    private éAlfabeto(caractere: string): boolean {
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

    private éAlfabetoOuDigito(caractere: any): boolean {
        return this.éDigitoBase10(caractere) || this.éAlfabeto(caractere);
    }

    private éFinalDaLinha(): boolean {
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
    private éUltimaLinha(): boolean {
        return this.linha >= this.codigo.length - 1;
    }

    private éFinalDoCodigo(): boolean {
        return this.éUltimaLinha() && this.codigo[this.codigo.length - 1].length <= this.atual;
    }

    private avançar(): void {
        this.atual += 1;
        if (this.éFinalDaLinha() && !this.éUltimaLinha()) {
            this.linha++;
            this.atual = 0;
        }
    }

    private adicionarSímbolo(tipo: string, literal: any = null): void {
        const texto: string = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new Simbolo(tipo, literal || texto, literal, this.linha + 1));
    }

    private analisarHexadecimal(): void {
        this.avançar();
        while (this.éDigitoBase16(this.codigo[this.linha][this.atual])) {
            this.avançar();
        }

        // TODO: Vai ter parte decimal?
        /* if (this.codigo[this.linha][this.atual] == '.' && this.éDigitoBase16(this.codigo[this.linha][this.atual + 1])) {
            this.avançar();

            while (this.éDigitoBase10(this.codigo[this.linha][this.atual])) {
                this.avançar();
            }
        } */

        const hexadecimalCompleto = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);

        this.adicionarSímbolo(tiposDeSimbolos.HEXADECIMAL, parseFloat(hexadecimalCompleto));
    }

    private analisarNúmeroBase10(): void {
        while (this.éDigitoBase10(this.codigo[this.linha][this.atual])) {
            this.avançar();
        }

        if (this.codigo[this.linha][this.atual] == '.' && this.éDigitoBase10(this.codigo[this.linha][this.atual + 1])) {
            this.avançar();

            while (this.éDigitoBase10(this.codigo[this.linha][this.atual])) {
                this.avançar();
            }
        }

        const numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);

        this.adicionarSímbolo(tiposDeSimbolos.NÚMERO, parseFloat(numeroCompleto));
    }

    private analisarTexto(delimitador = '"'): void {
        while (this.codigo[this.linha][this.atual] !== delimitador && !this.éFinalDoCodigo()) {
            this.avançar();
        }

        if (this.éFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.codigo[this.linha][this.atual - 1],
                mensagem: 'Texto não finalizado.',
            } as ErroLexador);
            return;
        }

        const valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSímbolo(tiposDeSimbolos.TEXTO, valor);
    }

    private identificarPalavraChave(): void {
        while (this.éAlfabetoOuDigito(this.codigo[this.linha][this.atual])) {
            this.avançar();
        }

        const codigo: string = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual).toUpperCase();
        const tipo: string = codigo in palavrasReservadas ? palavrasReservadas[codigo] : tiposDeSimbolos.IDENTIFICADOR;

        this.adicionarSímbolo(tipo);
    }

    private analisarCaractereAtual(): void {
        const caractere = this.codigo[this.linha][this.atual];

        switch (caractere) {
            case '.':
                this.adicionarSímbolo(tiposDeSimbolos.PONTO);
                this.avançar();
                break;
            case ',':
                this.adicionarSímbolo(tiposDeSimbolos.VÍRGULA);
                this.avançar();
                break;
            case ';':
                this.adicionarSímbolo(tiposDeSimbolos.PONTO_E_VÍRGULA);
                this.avançar();
                break;
            case '/':
                this.adicionarSímbolo(tiposDeSimbolos.BARRA);
                this.avançar();
                break;
            case '$':
                this.analisarHexadecimal();
                break;
            case '"':
                this.avançar();
                this.analisarTexto('"');
                this.avançar();
                break;
            // Esta sessão ignora espaços em branco.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
            case '\n':
                this.avançar();
                break;
            default:
                if (this.éDigitoBase10(caractere)) {this.analisarNúmeroBase10();} // se o caractere for um dígito, analisa o número.
                // TODO: Adicionar suporte a números negativos, frações e números mistos.
                if (this.éAlfabeto(caractere)) this.identificarPalavraChave();
                else {
                    this.erros.push({ // Se o caractere não for reconhecido, lança uma exceção.
                        linha: this.linha + 1,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.',
                    } as ErroLexador);
                    this.avançar();
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

        while (!this.éFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarCaractereAtual();
        }

        return {
            simbolos: this.simbolos,
            erros: this.erros
        }
    }
}