# Português Puro

Implementação em português de linguagem natural como interpretador, seguindo como inspiração o Plain English, criado por Gerry Rzeppa.

## Por que precisamos de Português Puro?

Linguagens de programação podem ser intimidadoras para pessoas não habituadas com programação. Além disso, queremos provar que é possível
instrumentar a linguagem natural para executar algoritmos que um computador possa entender.

## Definições

### Instrução

Uma instrução é uma frase em português que ensina algo ao motor da linguagem. Por exemplo:

```
Uma contagem é um número.
```

Aqui definimos um conceito (`contagem`) e dizemos que esse conceito tem um tipo de dados (`um número`). Essa construção é chamada de Axioma. 

Axiomas são detalhados mais abaixo.

Em Português Puro, cada instrução deve ser finalizada com um ponto final.

### Contexto

Como numa conversa entre duas ou mais pessoas, há a construção de um contexto de ideias. Esse contexto de ideias é implementado em Português Puro. 

Por exemplo, se temos as duas instruções abaixo:

```
Atribua "123" a um texto.
Escreva este texto.
```

Podemos utilizar a keyword `este` para fazermos referência à variável declarada no contexto local anterior (`um texto`). Português Puro mantém esse contexto em memória, de forma que quando queremos escrever 
o texto que foi mencionado anteriormente, podemos fazê-lo. 

Outra opção igualmente válida seria:


```
Atribua "123" a um texto.
Escreva o texto.
```

O resultado deste conjunto de instruções será, simplesmente:

```
123
```

### Instruções

O projeto recomenda que você tenha instalado o Node.js® (versão 16 ou superior) e Yarn. 

Após instalar o Node.js®, utilize o NPM para instalar o Yarn:

```
npm i -g yarn
```

após instalar o yarn, utilize o terminal para navegar até o diretório raiz do projeto e execute

```
yarn
```
para instalar os pacotes e dependências do projeto.


Execute

```
yarn testes-unitarios
```
para rodar os testes unitários.
