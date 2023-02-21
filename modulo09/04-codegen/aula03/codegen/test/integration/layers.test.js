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
import { tmpdir } from 'os'
import { join } from 'path'

async function getLayers({mainPath, defaultMainFolder}) {
    const folders = await fsPromises.readdir(join(mainPath, defaultMainFolder))

    return folders
}

describe('#Layers - Folder Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // Coloquei um sort pois o sistema coloca em ordem alfabetica por padrão
        layers: ['service', 'repository', 'factory'].sort()
    }
    beforeAll( async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    afterAll( async () => {
        await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('should not create folders if it exists', async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath)

        await createLayers(config)

        const afterRun = await getLayers(config)
        expect(beforeRun).not.toStrictEqual(afterRun)
        expect(afterRun).toEqual(config.layers)
    })

    test('should create folders if it doesnt exists', async () => {
        const beforeRun = await getLayers(config)

        await createLayers(config)

        const afterRun = await getLayers(config)

        expect(afterRun).toEqual(beforeRun)
    })
})