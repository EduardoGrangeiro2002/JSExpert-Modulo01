import readline from 'readline'
import Person from './person.js'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'

export default class TerminalController {
    constructor() {
        this.data = {}
        this.terminal = {}
        this.print = {}
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)
        this.print = console.draft(table)
        this.data = data
    }

    closeTerminal() {
        this.terminal.close()
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: 'id', name: chalk.red('ID')},
                { field: 'vehicles', name: chalk.red('Veichles')},
                { field: 'kmTraveled', name: chalk.red('Km Trabeled')},
                { field: 'from', name: chalk.red('From')},
                { field: 'to', name: chalk.red('To')}
            ]
        }
    }
}