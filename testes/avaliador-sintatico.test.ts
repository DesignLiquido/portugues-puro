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
            expect(resultado).toHaveLength(1);
        });

        it('"Escreva "123"."', () => {
            const resultadoLexador = lexador.mapear(['Escreva "123".']);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
            expect(resultado).toHaveLength(1);
        });

        it('"Atribua "123" para um texto. Escreva o texto."', () => {
            const resultadoLexador = lexador.mapear(['Atribua "123" para um texto.', 'Escreva o texto.']);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
            expect(resultado).toHaveLength(2);
        });

        it('"Atribua 1 para um número. Atribua o número para uma contagem."', () => {
            const resultadoLexador = lexador.mapear(['Atribua 1 para um número.', 'Atribua o número para uma contagem.']);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
            expect(resultado).toHaveLength(2);
        });

        it('"Atribua $4D2 para um número hexadecimal."', () => {
            const resultadoLexador = lexador.mapear(["Atribua $4D2 para um número hexadecimal."]);
            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
            expect(resultado).toHaveLength(1);
        });

        it('"Atribua $4D2 para um número hexadecimal. Converta o número hexadecimal para um número decimal. Escreva o número decimal."', () => {
            const resultadoLexador = lexador.mapear([
                'Atribua $4D2 para um número hexadecimal.', 
                'Converta o número hexadecimal para um número decimal.',
                'Escreva o número decimal.'
            ]);

            const resultado = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            expect(resultado).toBeTruthy();
            expect(resultado).toHaveLength(3);
        });
    });
});
