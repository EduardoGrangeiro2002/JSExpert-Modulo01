class Transaction {
    constructor({customer, car, amount, duedate}) {
        this.customer = customer
        this.car = car
        this.amount = amount
        this.duedate = duedate
    }
}

module.exports = Transaction