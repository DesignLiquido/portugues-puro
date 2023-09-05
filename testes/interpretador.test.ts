import { Lexador } from "../fontes/lexador/lexador";
import { AvaliadorSintatico } from "../fontes/avaliador-sintatico/avaliador-sintatico";
import { Interpretador } from "../fontes/interpretador/interpretador";

describe('Interpretador', () => {
    let lexador: Lexador;
    let avaliadorSintatico: AvaliadorSintatico;
    let interpretador: Interpretador;

    beforeEach(() => {
        lexador = new Lexador();
        avaliadorSintatico = new AvaliadorSintatico();
        interpretador = new Interpretador();
    });

    describe('interpretar()', () => {
        it('"Escreva "123"."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear(['Escreva "123".']);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("123");
        });
    });
});