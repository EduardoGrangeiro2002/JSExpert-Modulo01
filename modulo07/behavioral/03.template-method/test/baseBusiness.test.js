import { expect, describe, test, beforeEach, jest } from "@jest/globals"
import BaseBusiness from "../src/business/base/baseBusiness.js"
import { NotImplementedException } from "../src/util/exception.js"


describe("#BaseBusiness" , () => {

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    test('should throw an error when child class doesnt implement _validateRequiredFields funciton', () => {
        class ConcreteClass extends BaseBusiness { }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name)

        expect(() => concreteClass.create({})).toThrow(validationError)
    })

    test('should throw an error when _validateRequiredFields returns false', () => {
        const VALIDATION_DOESNT_SUCCEDED = false
        class ConcreteClass extends BaseBusiness { 
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()
        const validationError = new Error('Invalid data!')

        expect(() => concreteClass.create({})).toThrow(validationError)
    })

    test('should throw an error when _create returns false', () => {
        const VALIDATION_SUCCEDED = true
        class ConcreteClass extends BaseBusiness { 
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(concreteClass._create.name)

        expect(() => concreteClass.create({})).toThrow(validationError)
    })

    test('should call _create and _validateRequiredFields on create', () => {
        const VALIDATION_SUCCEDED = true
        class ConcreteClass extends BaseBusiness { 
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
            _create = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()
        const createFromBaseClass = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        )
        const result = concreteClass.create({})
        expect(result).toBeTruthy()
        expect(createFromBaseClass).toHaveBeenCalled()
        expect(concreteClass.create).toHaveBeenCalled()
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    })
})  