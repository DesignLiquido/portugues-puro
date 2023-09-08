import { Lexador } from '../fontes/lexador/lexador';

describe('Lexador', () => {
    let lexador: Lexador;

    beforeEach(() => {
        lexador = new Lexador();
    });

    describe('mapear()', () => {
        it('"Uma contagem é um número."', () => { 
            const resultado = lexador.mapear(["Uma contagem é um número."]);
            expect(resultado).toBeTruthy(); // Espera que o resultado seja true
                                            // Em Javascript existem 6 valores falsy: false, 0, "", null, undefined e NaN.
            expect(resultado.erros).toHaveLength(0);
            expect(resultado.simbolos).toHaveLength(6);
            
        });

        it('"Um nome é uma string."', () => { 
            const resultado = lexador.mapear(["Um nome é uma string."]);
            expect(resultado).toBeTruthy(); 
            expect(resultado.erros).toHaveLength(0);
            expect(resultado.simbolos).toHaveLength(6);
        });

        it('"Atribua $4D2 para um número hexadecimal."', () => {
            const resultado = lexador.mapear(["Atribua $4D2 para um número hexadecimal."]);
            expect(resultado).toBeTruthy(); 
            expect(resultado.erros).toHaveLength(0);
            expect(resultado.simbolos).toHaveLength(7);
        });
    });    
});
