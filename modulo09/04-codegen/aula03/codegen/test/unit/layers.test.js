import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals'

import fsPromises from 'fs/promises'
import fs from 'fs'
import { createLayers } from '../../src/createLayers.js'


describe('#Layers - Folder Structure', () => {
    const defaultLayers = ['repository', 'service', 'factory']
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('should create folders if it doesnt exists', async () => {
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false)

        await createLayers({ mainPath: '', layers: defaultLayers })

        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    })
    test('should not create folders if it exists', async () => {
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true)

        await createLayers({ mainPath: '', layers: defaultLayers })

        expect(fsPromises.mkdir).not.toHaveBeenCalled()
        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    })
})

