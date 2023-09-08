import { Lexador } from '../fontes/lexador/lexador';

describe('Lexador', () => {
    let lexador: Lexador;

    beforeEach(() => {
        lexador = new Lexador();
    });

    describe('mapear()', () => {
        it('"Uma contagem é um número."', () => { // Teste unitário
            const resultado = lexador.mapear(["Uma contagem é um número."]);
            expect(resultado).toBeTruthy(); // Espera que o resultado seja true
            // Em Javascript existem 6 valores falsy: false, 0, "", null, undefined e NaN.
        });
    });

    describe('mapear()', () => {
        it('"Um nome é uma string."', () => { 
            const resultado = lexador.mapear(["Um nome é uma string."]);
            expect(resultado).toBeTruthy(); 
        });
    });

    
});
