const { describe, it } = require('mocha')
const request = require('supertest')
const assert = require('assert')
const app = require('./api')
describe('API Suite test', () => {
    describe('/contact', () => {
        it('Should request the contact page and return HTTP Status 200', async () => {
            const response = await request(app)
                .get('/contact')
                .expect(200)
            
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hello', () => {
        it('Should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(app)
                .get('/hi')
                .expect(200)
            
            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', () => {

        it('Should login successfully on the route and return HTTP Status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({username: 'Eduardo', password: '123'})
                .expect(200)
            
            assert.deepStrictEqual(response.text, 'Logging has succeeded!')
        })

        it('Should unauthorize a request when requesting it using wrong credentials and return HTTP status 401!', async () => {
            const response = await request(app)
                .post('/login')
                .send({username: 'Lucao', password: '321'})
                .expect(401)
            
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Loggin failed!')
        })
    })
})