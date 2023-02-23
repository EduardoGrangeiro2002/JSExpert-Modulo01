import { Duplex, Transform } from 'stream'

let count = 0;
const server = new Duplex({
    objectMode: true, // Faz não precisar trabalhar com buffer => gasta mais memoria
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if(count ++ <= 5) {
                this.push(`My name is Eduardo[${count}]`)
                return;
            }
            clearInterval(intervalContext)
            this.push(null)
        }
        setInterval(function() {
            everySecond(this)
        })

    },

    // é como se fosse um objeto totalmente diferente!
    write(chunk, encoding, cb) {
        console.log(`[writable] saving`, chunk)
        cb()
    }
})

// provar que sao canais de comunicaçao diferentes
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable\n')

// on data -> loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable]${msg}`))

// o push deixa vc enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`)

const transformToUpperCase = new Transform({
    objectMode: true,
    transform(chunk, enc, cb) {
        cb(null, chunk.toUpperCase())
    }
})
// transform é ambém um duplex, mas nao possuem comunicação independente
transformToUpperCase.write('[transform] hello from write!')
// o push vai ignorar o que voce tem na função transform parecido com um bypass
transformToUpperCase.push('[transform] hello from push!')

server
    .pipe(transformToUpperCase)
    .pipe(server)