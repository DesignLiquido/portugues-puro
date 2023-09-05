import { Lexador } from '../fontes/lexador/lexador';

describe('Lexador', () => {
    let lexador: Lexador;

    beforeEach(() => {
        lexador = new Lexador();
    });

    describe('mapear()', () => {
        it('"Uma contagem é um número."', () => {
            const resultado = lexador.mapear(["Uma contagem é um número."]);
            expect(resultado).toBeTruthy();
        });
    });
});
