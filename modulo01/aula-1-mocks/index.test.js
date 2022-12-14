const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('node:assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }

    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
              "name": "Eduardo",
              "id": 123,
              "profession": "Javascript Developer",
              "birthDay": 2002
            },
            {
              "name": "Joao",
              "id": 123,
              "profession": "Java Developer",
              "birthDay": 1998
            },
            {
              "name": "Matheus",
              "id": 123,
              "profession": "React Developer",
              "birthDay": 2003
            }
          ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }

})()