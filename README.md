# Português Puro

Implementação em português de linguagem natural como interpretador, seguindo como inspiração o Plain English, criado por Gerry Rzeppa.

## Por que precisamos de Português Puro?

Linguagens de programação podem ser intimidadoras para pessoas não habituadas com programação. Além disso, queremos provar que é possível
instrumentar a linguagem natural para executar algoritmos que um computador possa entender.

## Definições

### Declaração de tipos

Uma declaração é uma frase em português que ensina algo ao motor da linguagem. Por exemplo:

```
Uma contagem é um número.
```

Aqui definimos um novo tipo derivado (`contagem`) e dizemos que esse tipo é derivado de um tipo base (`número`). Essa construção é chamada de Axioma. 

Axiomas são detalhados mais abaixo.

Em Português Puro, cada declaração deve ser finalizada com um ponto final.

### Contexto

De forma similar a uma conversa entre duas ou mais pessoas, existe a construção de um contexto de ideias. Esse contexto de ideias é implementado em Português Puro. 

Por exemplo, se temos as duas instruções abaixo:

```
Atribua "João" para uma string denominada nome.
Escreva o nome.
```

Podemos utilizar o artigo definido `o` para fazermos referência à variável local declarada na instrução anterior (`nome`). O interpretador de Português Puro mantém essa variável na memória, de forma que quando queremos escrever a string que foi mencionada anteriormente, podemos fazê-lo. 

O resultado deste conjunto de instruções será, simplesmente:

```
João
```

### Instruções

É necessário instalar o [Node.js®](https://nodejs.org/pt-br) (versão 16 ou superior) e o gerenciador de pacotes [Yarn](https://yarnpkg.com). 

Após instalar o Node.js®, utilize o [NPM](https://docs.npmjs.com/about-npm), que vem com o Node.js, para instalar o Yarn:

```
npm i -g yarn
```

após instalar o Yarn, utilize o terminal para navegar até o diretório raiz do projeto e execute:

```
yarn
```

para instalar os pacotes e dependências do projeto.


#### Testes unitários

Execute:

```
yarn testes-unitarios
```

para rodar os testes unitários.

Os relatórios de cobertura de código ficam no diretório `/coverage/lcov-report/index.html`.
