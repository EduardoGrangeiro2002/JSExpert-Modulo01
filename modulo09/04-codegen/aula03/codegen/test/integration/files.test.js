import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
    beforeAll,
    afterAll
} from '@jest/globals'

import fsPromises from 'fs/promises'
import fs from 'fs'
import { createLayers } from '../../src/createLayers.js'
import { createFiles } from '../../src/createFiles.js'
import { tmpdir } from 'os'
import { join } from 'path'
import Util from '../../src/util.js'

function getAllFunctionsFromInstance(instance) {
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
        .filter(method => method !== 'constructor')
}

async function generateFilePath({mainPath, defaultMainFolder, layers, componentName}) {
    // mainPath -> Documents/Curso/JSExpert/
    // defaultMainFolder -> src
    // layers -> ['repository', 'service', 'factory']
    // componentName -> heroes
    return layers.map( layer => {
        const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`

        return join(mainPath, defaultMainFolder, layer, fileName)
    })
}

describe('#Layers - Files - Files Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // Coloquei um sort pois o sistema coloca em ordem alfabetica por padrão
        layers: ['service', 'repository', 'factory'].sort(),
        componentName: 'heroes'
    }
    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks', packageJSON)

    beforeAll( async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
        await fsPromises.copyFile(
            packageJSONLocation,
            join(config.mainPath, packageJSON)
        )
        await createLayers(config)
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    afterAll( async () => {
         await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('Repository class should have create, read, update and delete methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository']
        }
        await createFiles(myConfig)
        const [ repositoryFile ] = await generateFilePath(myConfig)

        const { default: Repository } = await import(repositoryFile)

        const instance = new Repository()
        const expectNotImplemented = fn => expect(() => fn.call.rejects.toEqual("method not implemented!"))

        expectNotImplemented(instance.create)
        expectNotImplemented(instance.update)
        expectNotImplemented(instance.read)
        expectNotImplemented(instance.delete)
    })
    test('Service class should have the same signature of repository and call all its methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }

        await createFiles(myConfig)
        const [ repositoryFile, serviceFile ] = await generateFilePath(myConfig)

        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)

        const repository = new Repository()
        const service = new Service({ repository })

        const allRepositoryMethods = getAllFunctionsFromInstance(repository)
        allRepositoryMethods
            .forEach(method => jest.spyOn(repository, method).mockResolvedValue())

        getAllFunctionsFromInstance(service)
            .forEach(method => service[method].call(service, []))

        allRepositoryMethods
            .forEach(method => expect(repository[method]).toHaveBeenCalled())
    })
    test('Factory instance should match layers', async () => {
        const myConfig = {
            ...config
        }

        await createFiles(myConfig)
        // colocamos em ordem, pois ja rodamos um sort em layers
        const [ factoryFile, repositoryFile, serviceFile ] = await generateFilePath(myConfig)

        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const { default: Factory } = await import(factoryFile)

        const repository = new Repository()
        const expectedInstance = new Service({ repository })
        const instance = Factory.getInstance()

        expect(instance).toMatchObject(expectedInstance)
        expect(instance).toBeInstanceOf(Service)
    })
})