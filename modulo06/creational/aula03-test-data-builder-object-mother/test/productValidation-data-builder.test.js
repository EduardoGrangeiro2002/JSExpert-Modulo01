const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('./../src')
const { ProductDataBuilder } = require('./model/productDataBuilder.js')
describe('Test Data builder', () => {
    it('should not return error with valid product', () => {
        const product = ProductDataBuilder.aProduct().build()
        const result = productValidator(product)

        const expected = {
            errors: [],
            result: true
        }

        expect(result).to.be.deep.equal(expected)
    })

    describe('Product Validation Rules', () => {
        it('should return an object error when creating a Product with invalid id', () => {
            const product = ProductDataBuilder.aProduct().withInvalidId().build()
            const result = productValidator(product)

            const expected = {
                errors: ["id: Invalid length, current [1] expect to be between 2 and 20"],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should return an object error when creating a Product with invalid name', () => {
            const product = ProductDataBuilder.aProduct().withInvalidName().build()
            const result = productValidator(product)

            const expected = {
                errors: ["name: Invalid value, current [abc123] expected to have only words"],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should return an object error when creating a Product with invalid price', () => {
            const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
            const result = productValidator(product)

            const expected = {
                errors: ["price: Invalid value, current [2000] expected to be between 1 to 1000"],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should return an object error when creating a Product with invalid category', () => {
            const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
            const result = productValidator(product)

            const expected = {
                errors: ["category: Invalid value, current [mecanico] expected to be either eletronic or organic"],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

    })

})
