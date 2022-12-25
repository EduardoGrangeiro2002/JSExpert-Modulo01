const assert = require('assert')
const myMap = new Map()

// podem ter qualquer coisa como chave

myMap
    .set(1, 'one')
    .set('Eduardo', { text: 'two' })
    .set(true, () => 'Hello')

// usando um construtor

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Eduardo'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'Hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Eduardo Grangeiro' })

// Só posso passar a referencia pois se passar o valor explicitamente ele retornará undefined devido a memória ser diferente
assert.deepStrictEqual(myMap.get({id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Eduardo Grangeiro' })

// utilitarios
// - No Objects seria Object.keys({a: 1}).length

assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({name: 'eduardo'}).hasOwnProperty('name')

assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperfomático para o JavaScript

assert.ok(myMap.delete(onlyReferenceWorks))

// Nao dá para iterar em Objects diretamente
// Tem que transformar com Object.entries(item)

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Eduardo",{"text":"two"}],[true, () => {}]])) 

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// Não tem restricao de nome de chave
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da para limpar um Obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])               

// --- WeakMap

// Pode ser coletado após perders as referencias
// Usado em casos beeem específicos
// tem a maioria dos beneficios do Map
// Mas: nao é iterável
// Só chaves de referencia e que voce já conheça
// mais leve e preve leak de memoria, pq depois que as intancias saem da memoria, tudo é limpo 

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.has(hero)
weakMap.delete(hero)
