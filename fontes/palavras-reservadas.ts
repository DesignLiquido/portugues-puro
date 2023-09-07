import tiposDeSimbolos from "./tipos-de-simbolos";

export const palavrasReservadas = {
    ESTRUTURA: tiposDeSimbolos.ESTRUTURA,
    ESTRUTURAS: tiposDeSimbolos.ESTRUTURAS,
    //ARTIGOS
    A: tiposDeSimbolos.ARTIGOSDEFINIDOS,
    //A: tiposDeSimbolos.PARA, EXEMPLO: Atribua 123 para um número. -> Atribua 123 a um número.	(o 'a' serve como preposição e não como artigo)
    AS: tiposDeSimbolos.ARTIGOSDEFINIDOS,
    O: tiposDeSimbolos.ARTIGOSDEFINIDOS,
    OS: tiposDeSimbolos.ARTIGOSDEFINIDOS,
    UM: tiposDeSimbolos.ARTIGOSINDEFINIDOS,
    UNS: tiposDeSimbolos.ARTIGOSINDEFINIDOS,
    UMA: tiposDeSimbolos.ARTIGOSINDEFINIDOS,
    UMAS: tiposDeSimbolos.ARTIGOSINDEFINIDOS,
    PRONOMESDEMONSTRATIVOS1APESSOA: tiposDeSimbolos.ARTIGOSINDEFINIDOS,
    PRONOMESDEMONSTRATIVOS2APESSOA: tiposDeSimbolos.ARTIGOSDEFINIDOS,    
    // INFORMAÇÕES COMPLEMENTARES
    COM: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    DESDE: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,    
    CONTENDO: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,    
    DENOMINADA: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    DENOMINADAS: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    DENOMINADO: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    DENOMINADOS: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    DEVOLVENDO: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    USANDO: tiposDeSimbolos.INFORMAÇÕESCOMPLEMENTARES,
    // VERBOS
    ATRIBUA: tiposDeSimbolos.ATRIBUA, // TODO: verificar se é possível agrupar verbos e atribuições em um único grupo.
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
    ESSA: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS1APESSOA,
    ESSAS: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS1APESSOA,
    ESSE: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS1APESSOA,
    ESSES: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS1APESSOA,    
    ESTA: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS2APESSOA,
    ESTAS: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS2APESSOA,
    ESTE: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS2APESSOA,
    ESTES: tiposDeSimbolos.PRONOMESDEMONSTRATIVOS2APESSOA,
    // CONTRAÇÕES. PRECISAM SER DESFEITAS ANTES DE PODEREM SER ANALISADAS PELO INTERPRETADOR
    À: tiposDeSimbolos.CONTRACOES,
    AO: tiposDeSimbolos.CONTRACOES,
    AOS: tiposDeSimbolos.CONTRACOES,
    DESSA: tiposDeSimbolos.CONTRACOES,
    DESSAS: tiposDeSimbolos.CONTRACOES,
    DESSE: tiposDeSimbolos.CONTRACOES,
    DESSES: tiposDeSimbolos.CONTRACOES,
    DESTA: tiposDeSimbolos.CONTRACOES,
    DESTAS: tiposDeSimbolos.CONTRACOES,
    DESTE: tiposDeSimbolos.CONTRACOES,
    DESTES: tiposDeSimbolos.CONTRACOES,
    DUM: tiposDeSimbolos.CONTRACOES,
    DUNS: tiposDeSimbolos.CONTRACOES,
    DUMA: tiposDeSimbolos.CONTRACOES,
    DUMAS: tiposDeSimbolos.CONTRACOES,
    NA: tiposDeSimbolos.CONTRACOES,
    NO: tiposDeSimbolos.CONTRACOES,
    PELA: tiposDeSimbolos.CONTRACOES,
    PELAS: tiposDeSimbolos.CONTRACOES,
    PELO: tiposDeSimbolos.CONTRACOES,
    PELOS: tiposDeSimbolos.CONTRACOES,
    // VALORES BOOLEANOS
    NÃO: tiposDeSimbolos.LOGICOS,
    SIM: tiposDeSimbolos.LOGICOS,

    PARA: tiposDeSimbolos.PARA, // TODO: inserir o termo 'a' como preposição e não somente como artigo.
        
    SE: tiposDeSimbolos.SE, // SUGESTÕES PARA KEYWORD SWITCH: quando, caso, etc
    //PREPOSIÇÕES
    POR: tiposDeSimbolos.PREPOSICOES,
    QUE: tiposDeSimbolos.PREPOSICOES,
    EM: tiposDeSimbolos.PREPOSICOES,
    SOB: tiposDeSimbolos.PREPOSICOES,
    SOBRE: tiposDeSimbolos.PREPOSICOES    
}
