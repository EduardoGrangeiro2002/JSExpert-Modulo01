import templates from "./templates/index.js"
import Util from "./util.js"
import fsPromises from 'fs/promises'
const executeWrites = (pendingFilesToWrite) => {
    return Promise.all(
        pendingFilesToWrite
            .map(({fileName, txtFile}) => fsPromises.writeFile(fileName, txtFile))
    )
}

const defaultDependencies = (layer, componentName) => {
    const dependencies = {
        repository: [],
        service: [`${componentName}Repository`],
        factory: [`${componentName}Repository`, `${componentName}Service`]
    }
    return dependencies[layer]
        .map(Util.lowerCaseFirstLetter)
}


export async function createFiles({ layers, mainPath, defaultMainFolder, componentName }) {
    const pendingFilesToWrite = []
    for (const layer of layers) {
        const keys = Object.keys(templates)
        const chosenTemplate = keys.find( key => key.includes(layer))

        if(!chosenTemplate) {
            return { error: 'the chosen layer doesnt have a template' }
        }

        const template = templates[chosenTemplate]
        const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
        const dependencies = defaultDependencies(layer, componentName)
        const { fileName: className, template: txtFile } = await template(componentName, ...dependencies)
        const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(className)}.js`
        pendingFilesToWrite.push({fileName, txtFile})
    }

    await executeWrites(pendingFilesToWrite)

    return { success: true }
}