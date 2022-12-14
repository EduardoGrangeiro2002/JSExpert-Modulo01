'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()
//Dessa forma, ele ignora o 'this' da classe File
//Herda o this do watch FS
//watch(__filename, file.watch)*

//Alternativa para nao herdar o this da função watch do FS
//Sintaxe feia
//watch(__filename, (event, filename) => file.watch(event, filename))*
 
//Podemos deixar explicito qual é o contexto que a função deve seguir
//O bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file))

// file.watch.call({ showContent: () => console.log('call: Hey sinon')}, null, __filename)
// file.watch.apply({ showContent: () => console.log('apply: Hey sinon')},[ null, __filename]) 