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
Escreva esse texto.
```

`esse texto` se refere a um conceito dito anteriormente (`um texto`). Português Puro mantém esse contexto em memória, de forma que quando queremos escrever 
o texto que foi mencionado anteriormente, sem exatamente definir um nome para ele, podemos fazê-lo. 

O resultado deste conjunto de instruções será, simplesmente:

```
123
```