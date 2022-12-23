"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var chai,expect;module.link('chai',{default(v){chai=v},expect(v){expect=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);




describe('Person', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '2 Bike,Carro 200 2020-01-02 2020-02-01'
        )

        const expected = {
            from: '2020-01-02',
            to: '2020-02-01',
            vehicles: ['Bike', 'Carro'],
            kmTraveled: "200",
            id: '2'
        }
        expect(person).to.be.deep.equal(expected)
    })

    it('should format value', () => {
        const person = new Person({
            from: '2020-01-02',
            to: '2020-02-01',
            vehicles: ['Bike', 'Carro'],
            kmTraveled: "200",
            id: '2'
        })

        const result = person.formatted("pt-BR")
        const expected = {
            id: 2,
            vehicles: 'Bike e Carro',
            kmTraveled: '200 km',
            from: '02 de janeiro de 2020',
            to: '01 de fevereiro de 2020'
        }

        expect(result).to.be.deep.equal(expected)
    })

    
})