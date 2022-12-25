'use strict'

const assert = require('assert')

// garantir semantica e segurança em objetos

// ---- apply
const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue
    }
}

// Function.prototype.apply = () => {throw new TypeError('Eita!')}
assert.deepStrictEqual(myObj.add.apply({arg1: 10, arg2: 20}, [ 100]), 130)
// um problema que pode acontecer (raro)
// Function.prototype.apply = () => {throw new TypeError('Eita!')}

// esse aqui é mais comum de acontecer!
myObj.add.apply = function () { throw new TypeError('Vixx')}
assert.throws(
    () => myObj.add.apply({}, []), 
    {
        name: 'TypeError',
        message: 'Vixx'
    }
    )

const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20}, [200])

assert.deepStrictEqual(result, 230)

// ----apply
// --- defineProperty
// questoes semanticas

function MyDate() {}

// Semantica estranha
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there'})
assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
// Semantica correta
Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hey dude'})
assert.deepStrictEqual(MyDate.withReflect(), 'Hey dude')

// --- defineProperty

// --- deleteProperty

const withDelete = { user: 'EduardoGrangeiro'}
// imperfomático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'Xuxa' }
// Melhor perfomático
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)


// --- delete property

// --- get

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, "userName"), TypeError)

// --- get

// --- has

assert.ok('superman' in { superman: ''})

assert.ok(Reflect.has({superman: ''}, 'superman'))

// --- has

// --- ownKeys
const user = Symbol('user')

const databasesUsers = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'Eduardo'
}

// Com os metodos de object, temos que fazer 2 requisições
const objectKeys = [
    ...Object.getOwnPropertyNames(databasesUsers),
    ...Object.getOwnPropertySymbols(databasesUsers)
]
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databasesUsers), ['id', Symbol.for('password'), user])