import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import database from "./../database.json" assert { type: 'json'}
import readline from 'readline'
import Person from './person.js'


DraftLog(console).addLineListener(process.stdin)
const DEFAULT_LANG = 'pt-BR'
const options = {
    leftPad: 2,
    columns: [
        { field: 'id', name: chalk.red('ID')},
        { field: 'vehicles', name: chalk.red('Veichles')},
        { field: 'kmTraveled', name: chalk.red('Km Trabeled')},
        { field: 'from', name: chalk.red('From')},
        { field: 'to', name: chalk.red('To')}
    ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)))

const print = console.draft(table)

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

terminal.question("What's your name?", msg => {
    console.log('msg', msg.toString())
})
