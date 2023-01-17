// import FluentSQLBuilder from './../fluentsql-jest-tdd-yt'
import FluentSQLBuilder from '@eduardograngeiro/fluentsql'
import database from './database/data.json' assert {type: 'json'}

const result = FluentSQLBuilder.for(database)
    .where({registered: /^(2020|2019)/ })
    .select(['category'])
    .countBy('category')
    .limit(3)
    .build()

console.log({ result })