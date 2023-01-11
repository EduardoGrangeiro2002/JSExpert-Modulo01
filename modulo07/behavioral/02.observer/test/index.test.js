import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import PaymentSubject from '../src/subjects/paymentSubject.js'
import Payment from '../src/events/payment'
import Shipment from '../src/observers/shipment.js'
import Marketing from '../src/observers/markeing.js'
describe('Test suite for observer Pattern', () => {

    beforeAll(() => {
        jest.spyOn(console, console.log.name).mockImplementation(() => {})
    })

    test('#PaymentSubject notify observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        const expected = data
        subject.subscribe(observer)
        subject.notify(data)
        expect(observer.update).toBeCalledWith(expected)
    })

    test('#PaymentSubject should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data)
        expect(observer.update).not.toHaveBeenCalled()
    })
    test('#Payment should notify subject after a credit card transaction', () => {
        const subject = new PaymentSubject()
        const payment = new Payment(subject)

        const paymentSubjectNotifySpy = jest.spyOn(
            payment.paymentSubjects,
            payment.paymentSubjects.notify.name
        )

        const data = { userName: 'Eduardo',  id: Date.now()}
        payment.creditCard(data)

        expect(paymentSubjectNotifySpy).toBeCalledWith(data)
    })
    test('#All should notify subscribers after a credit card payment', () => {
        const subject = new PaymentSubject()
        const shipment = new Shipment()
        const marketing = new Marketing()


        const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
        const marketingSpy = jest.spyOn(marketing, marketing.update.name)

        subject.subscribe(shipment)
        subject.subscribe(marketing)

        const payment = new Payment(subject)
        const data = { userName: 'Eduardo', id: Date.now() }

        payment.creditCard(data)

        expect(shipmentSpy).toBeCalledWith(data)
        expect(marketingSpy).toBeCalledWith(data)
    })
})