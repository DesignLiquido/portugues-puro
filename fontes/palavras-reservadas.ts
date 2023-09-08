import tiposDeSimbolos from "./tipos-de-simbolos";

export const palavrasReservadas = {
  ESTRUTURA: tiposDeSimbolos.ESTRUTURA,
  ESTRUTURAS: tiposDeSimbolos.ESTRUTURAS,
  //ARTIGOS
  A: tiposDeSimbolos.ARTIGOS_DEFINIDOS,
  //A: tiposDeSimbolos.PARA, EXEMPLO: Atribua 123 para um número. -> Atribua 123 a um número.	(o 'a' serve como preposição e não como artigo)
  AS: tiposDeSimbolos.ARTIGOS_DEFINIDOS,
  O: tiposDeSimbolos.ARTIGOS_DEFINIDOS,
  OS: tiposDeSimbolos.ARTIGOS_DEFINIDOS,
  UM: tiposDeSimbolos.ARTIGOS_INDEFINIDOS,
  UNS: tiposDeSimbolos.ARTIGOS_INDEFINIDOS,
  UMA: tiposDeSimbolos.ARTIGOS_INDEFINIDOS,
  UMAS: tiposDeSimbolos.ARTIGOS_INDEFINIDOS,
  PRONOMES_DEMONSTRATIVOS_1A_PESSOA: tiposDeSimbolos.ARTIGOS_INDEFINIDOS,
  PRONOMES_DEMONSTRATIVOS_2A_PESSOA: tiposDeSimbolos.ARTIGOS_DEFINIDOS,
  // INFORMAÇÕES COMPLEMENTARES
  COM: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  DESDE: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  CONTENDO: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  DENOMINADA: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  DENOMINADAS: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  DENOMINADO: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  DENOMINADOS: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  DEVOLVENDO: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,
  USANDO: tiposDeSimbolos.INFORMAÇÕES_COMPLEMENTARES,

  // VERBOS
  ATRIBUA: tiposDeSimbolos.ATRIBUA, // TODO: verificar se é possível agrupar verbos e atribuições em um único grupo.
  CONVERTA: tiposDeSimbolos.CONVERTA,
  ESCREVA: tiposDeSimbolos.ESCREVA,
  DIGA: tiposDeSimbolos.VERBOS,
  É: tiposDeSimbolos.VERBOS,
  ESTÁ: tiposDeSimbolos.VERBOS,
  ESTÃO: tiposDeSimbolos.VERBOS,
  ESTAR: tiposDeSimbolos.VERBOS,
  ESTIVER: tiposDeSimbolos.VERBOS,
  ESTIVEREM: tiposDeSimbolos.VERBOS,
  COMECE: tiposDeSimbolos.VERBOS,
  PARE: tiposDeSimbolos.VERBOS,
  RECOMECE: tiposDeSimbolos.RECOMECE,
  PODER: tiposDeSimbolos.VERBOS,
  PUDER: tiposDeSimbolos.VERBOS,
  RETORNE: tiposDeSimbolos.VERBOS,
  SER: tiposDeSimbolos.VERBOS,
  SEREM: tiposDeSimbolos.VERBOS,
  FOI: tiposDeSimbolos.VERBOS,
  FOR: tiposDeSimbolos.VERBOS,
  IGUAL: tiposDeSimbolos.IGUAL,
  // PRONOMES
  ESSA: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_1A_PESSOA,
  ESSAS: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_1A_PESSOA,
  ESSE: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_1A_PESSOA,
  ESSES: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_1A_PESSOA,
  ESTA: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_2A_PESSOA,
  ESTAS: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_2A_PESSOA,
  ESTE: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_2A_PESSOA,
  ESTES: tiposDeSimbolos.PRONOMES_DEMONSTRATIVOS_2A_PESSOA,
  // CONTRAÇÕES. PRECISAM SER DESFEITAS ANTES DE PODEREM SER ANALISADAS PELO INTERPRETADOR
  À: tiposDeSimbolos.CONTRAÇÕES,
  AO: tiposDeSimbolos.CONTRAÇÕES,
  AOS: tiposDeSimbolos.CONTRAÇÕES,
  DESSA: tiposDeSimbolos.CONTRAÇÕES,
  DESSAS: tiposDeSimbolos.CONTRAÇÕES,
  DESSE: tiposDeSimbolos.CONTRAÇÕES,
  DESSES: tiposDeSimbolos.CONTRAÇÕES,
  DESTA: tiposDeSimbolos.CONTRAÇÕES,
  DESTAS: tiposDeSimbolos.CONTRAÇÕES,
  DESTE: tiposDeSimbolos.CONTRAÇÕES,
  DESTES: tiposDeSimbolos.CONTRAÇÕES,
  DUM: tiposDeSimbolos.CONTRAÇÕES,
  DUNS: tiposDeSimbolos.CONTRAÇÕES,
  DUMA: tiposDeSimbolos.CONTRAÇÕES,
  DUMAS: tiposDeSimbolos.CONTRAÇÕES,
  NA: tiposDeSimbolos.CONTRAÇÕES,
  NO: tiposDeSimbolos.CONTRAÇÕES,
  PELA: tiposDeSimbolos.CONTRAÇÕES,
  PELAS: tiposDeSimbolos.CONTRAÇÕES,
  PELO: tiposDeSimbolos.CONTRAÇÕES,
  PELOS: tiposDeSimbolos.CONTRAÇÕES,
  // VALORES BOOLEANOS
  NÃO: tiposDeSimbolos.LÓGICOS,
  SIM: tiposDeSimbolos.LÓGICOS,

  PARA: tiposDeSimbolos.PARA, // TODO: inserir o termo 'a' como preposição e não somente como artigo.

  SE: tiposDeSimbolos.SE, // SUGESTÕES PARA KEYWORD SWITCH: quando, caso, etc
  //PREPOSIÇÕES
  POR: tiposDeSimbolos.PREPOSIÇÕES,
  QUE: tiposDeSimbolos.PREPOSIÇÕES,
  EM: tiposDeSimbolos.PREPOSIÇÕES,
  SOB: tiposDeSimbolos.PREPOSIÇÕES,
  SOBRE: tiposDeSimbolos.PREPOSIÇÕES,
};
