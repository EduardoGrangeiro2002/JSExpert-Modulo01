import { Readable, Writable } from 'stream'

// fonte de dados
const readable = Readable({
    read() {
        this.push('Hello World 1')
        this.push('Hello World 2')
        this.push('Hello World 3')
        // Informa que os dados acabaram
        this.push(null)
    }
})

// saida de dados

const writable = Writable({
    write(chunk, enconding, cb) {
        console.log('msg', chunk.toString())

        cb()
    }
})

readable
    // writable é sempre a saída -> imprimir, salvar ou ignorar
    .pipe(writable)