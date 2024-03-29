const { existsSync, mkdirSync, rmSync } = require('fs')
const { execSync } = require('child_process')
const getFileName = (index) => index >= 3 ? `js-0${index}` : `mjs-0${index}`

const rmFolder = folderName => rmSync(`./${folderName}`, { recursive: true})

const makeDir = (folderName) => {
    if(existsSync(folderName)) rmFolder(folderName)

    mkdirSync(folderName)

    return folderName
}

const initialize = folderName => {
    execSync(`npm init -y --silent --scope @eduardograngeiro --silent`, {
        cwd: `./${folderName}`
    })

    return folderName
}

const printNameAndPackageVersion = folderName => {
    const { name, version } = require(`./${folderName}/package.json`)
    console.log({ n: name, v: version})

    return folderName
}

const FOLDER_AMOUNT = 4
Array.from(Array(FOLDER_AMOUNT).keys())
.map(index => makeDir(getFileName(index + 1)))
.map(folderName => initialize(folderName))
.map(folderName => printNameAndPackageVersion(folderName))
.map(folderName => rmFolder(folderName))
