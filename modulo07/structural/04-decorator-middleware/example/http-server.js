InjectHttpInterceptor()
import http from 'http'
import { InjectHttpInterceptor } from '../index.js'

function handleRequest(request, response) {
    // response.setHeader('X-Instrumented-By', 'EduardoGrangeiro')
    response.end('Hello World')
}

const server = http.createServer(handleRequest)
const port = 3000

server.listen(port, () => console.log('server running at', server.address().port))

