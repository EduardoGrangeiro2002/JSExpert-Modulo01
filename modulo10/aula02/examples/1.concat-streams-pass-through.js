import { PassThrough, Writable } from 'stream'
import axios from 'axios'
const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'


const requests = await Promise.all([
    axios({
        method: 'get',
        url: API_01,
        responseType: 'stream'
    }),
    axios({
        method: 'get',
        url: API_02,
        responseType: 'stream'
    })]
)

const results = requests.map(({ data }) => data)

const output = new Writable({
    write(chunk, enc, cb) {
        const data = chunk.toString().replace(/\n/, "")
        // ?=- -> ele faz procurar a partir do - e olhar para traz
        // :"(?<name>.*) -> procura pelo conteudo dentro das aspas apos o : e extrai somente o name
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        console.log(`[${name.toLowerCase()}] ${data}`)     
        cb()
    }
})

function merge(streams) {
    return streams.reduce((prev, current, index, items) => {
        current.pipe(prev, {end: false})
        current.on('end', () => items.every(s => s.ended) && prev.end())
        return prev
    }, new PassThrough())
}


merge(results).pipe(output)