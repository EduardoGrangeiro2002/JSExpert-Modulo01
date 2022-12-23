import { writeFile, readFile } from 'fs/promises'
import  databaseFile from '../database.json' assert { type: 'json' }
import path from 'path'

export const save = async (data) => {
    const databaseFile = path.join('../', 'database.json')
    const currentData = JSON.parse((await readFile(databaseFile)))
    currentData.push(data)
    await writeFile(databaseFile, JSON.stringify(currentData))
}

// 1 AudiA1,BMW,AudiA3 2000 2013-01-02 2014-01-03