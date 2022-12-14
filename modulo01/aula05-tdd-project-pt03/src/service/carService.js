const BaseRepository = require('./../repository/base/baseRepository')
const Tax = require('../entities/tax')
const Transaction = require('../entities/transaction')

class CarService {
    constructor({cars}) {
        this.carsRepository = new BaseRepository({file: cars})
        this.taxexBasedOnAge = Tax.taxesBasedOnAge
        this.currentFormat = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    async getAvailableCar(carCategory) {
        const carId = await this.chooseRandomCar(carCategory)
        const car = await this.carsRepository.find(carId)
        return car
    }

    async getRandomPositionFromArray(list) {
        const listLength = list.length
        return Math.floor(
            Math.random() * (listLength)
            )
    }

    async chooseRandomCar(carCategory) {
        const randomCarIndex = await this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]

        return carId
    }

    calculateFinalPrice(customer, carCategory, numberOfDays) {
        const { age } = customer
        const { price } = carCategory
        const { then: tax } = this.taxexBasedOnAge
            .find(tax => age >= tax.from && age <= tax.to)

        const finalPrice = ((tax * price) * (numberOfDays))
        const formattedPrice = this.currentFormat.format(finalPrice)

        return formattedPrice
    }

    async rent(customer, carCategory, numberOfDays) {
        const car = await this.getAvailableCar(carCategory)
        const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)
        const today = new Date()
        today.setDate(today.getDate() + numberOfDays)
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
        const duedate = today.toLocaleDateString("pt-br", options)
        const transaction = new Transaction({
            customer,
            duedate,
            car,
            amount: finalPrice,

        })
        return transaction
    }
}

module.exports = CarService