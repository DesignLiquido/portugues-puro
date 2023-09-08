import { Lexador } from "../fontes/lexador/lexador";
import { AvaliadorSintatico } from "../fontes/avaliador-sintatico/avaliador-sintatico";
import { Interpretador } from "../fontes/interpretador/interpretador";

describe('Interpretador', () => {
    let lexador: Lexador;
    let avaliadorSintatico: AvaliadorSintatico;
    let interpretador: Interpretador;

    beforeEach(() => { // Realizado antes de cada teste
        lexador = new Lexador();
        avaliadorSintatico = new AvaliadorSintatico();
        interpretador = new Interpretador();
    });

    describe('interpretar()', () => { // Agrupamento de testes
        it('"Escreva "123"."', async () => { 
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida; 
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear(['Escreva "123".']); 
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("123");
        });

        it('"Atribua "123" para um texto."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear(['Escreva "123".']);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("123");
        });

        it('"Atribua "123" para um texto. Escreva o texto."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear(['Atribua "123" para um texto.', 'Escreva o texto.']);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("123");
        });

        it('"Atribua 1 para um número. Atribua o número para uma contagem."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear([
                'Atribua 1 para um número.', 
                'Atribua o número para uma contagem.',
                'Escreva a contagem.'
            ]);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("1");
        });
        /*
        it('"Atribua 1/2 para uma fração."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear([
                'Atribua 1/2 para uma fração.', 
                'Escreva a fração.'
            ]);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("1/2");
        });

        

        it('"Atribua $4D2 para um número hexadecimal."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear([
                'Atribua $4D2 para um número hexadecimal.', 
                'Converta o número hexadecimal para um número decimal.'
                'Escreva o número decimal.'
            ]);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("1/2");
        });

        it('"Atribua 1-1/2 para um número misto."', async () => {
            let retornoSaida: string = '';
            const funcaoDeRetorno = (saida: string) => retornoSaida = saida;
            interpretador.funcaoDeRetorno = funcaoDeRetorno;
            const resultadoLexador = lexador.mapear([
                'Atribua 1-1/2 para um número mistoo.', 
                'Escreva o número misto.'
            ]);
            const resultadoAvaliadorSintatico = avaliadorSintatico.analisar(resultadoLexador.simbolos);
            await interpretador.interpretar(resultadoAvaliadorSintatico);

            expect(retornoSaida).toBe("1-1/2"); // TODO: Verificar se podemos manter o traço nos números mistos ou se devemos substituir por um espaço
        });

        

        */
    });
});
