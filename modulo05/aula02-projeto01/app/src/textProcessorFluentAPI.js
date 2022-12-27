// o objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. MUITO similiar ao padrao Builder
// a diferença que aqui é sobre processos, o Builder sobre construção
// de objetos

const { evaluateRegex } = require('./util')
const Person = require('./person')

class TextProcessorFluentAPI {
    #content
    constructor(content) {
        this.#content = content
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this
    }
    
    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    extractPeopleData() {
        // ?<= fala que vai extrait os dados que virao depois desse grupo
        // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressao pra pegar maisuculo e minusculo)
        // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaco
        // tudo acima fica dentro de um parateses para falar "vamos pegar daí para frente"
        // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaco a frente deles)
        // .*\n n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop
        // $ informar que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> insensitive

        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        // faz um match dos dados e retorna um array deles
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson

        return this
    }

    mapPerson() {
        this.#content = this.#content.map(line => new Person(line))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI