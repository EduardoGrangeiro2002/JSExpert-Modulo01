export default class Payment {
    constructor(paymentSubjects) {
        this.paymentSubjects = paymentSubjects
    }

    creditCard(paymentData) {
        console.log(`\na payment ocurred from ${paymentData.userName}`)
        this.paymentSubjects.notify(paymentData)
    }
}