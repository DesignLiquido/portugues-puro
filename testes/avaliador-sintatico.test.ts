import { Lexador } from "../fontes/lexador/lexador";
import { AvaliadorSintatico } from "../fontes/avaliador-sintatico/avaliador-sintatico";

describe('Avaliador Sintático', () => {
    let lexador: Lexador;
    let avaliadorSintatico: AvaliadorSintatico;

    beforeEach(() => {
        lexador = new Lexador();
        avaliadorSintatico = new AvaliadorSintatico();
    });

    describe('analisar()', () => {
        it('"Uma contagem é um número."', () => {
            const resultadoLexador = lexador.mapear(["Uma contagem é um número."]);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
        });

        it('"Escreva "123"."', () => {
            const resultadoLexador = lexador.mapear(['Escreva "123".']);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
        });

        it('"Atribua "123" a um texto."', () => {
            const resultadoLexador = lexador.mapear(['Atribua "123" a um texto.']);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
        });
    });
});
