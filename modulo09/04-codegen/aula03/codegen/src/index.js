#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createLayers } from './createLayers.js'
import { createFiles } from './createFiles.js'

const { argv: { componentName } } = yargs(hideBin(process.argv))
    // codegen skeleton
    .command('skeleton', 'create project skeleton', (builder) => {
        return builder
            .option('component-name', {
                alias: 'c',
                demandOption: true,
                describe: 'component\'s name',
                type: 'array'
            })

            .example('skeleton --component-name product', 'creates a project with a single domain')
            .example('skeleton -c product -c person -c colors', 'creates a project with a single domain')
    })
    .epilog('copyRight 2023 - Eduardo Corporation')

const env = process.env.NODE_ENV

const defaultMainFolder = env === 'dev' ? 'tmp': 'src'

const layers = ['repository', 'service', 'factory'].sort()

const config = {
    layers,
    defaultMainFolder,
    mainPath: '.',
}

await createLayers(config)

const pendingPromises = []

for(const domain of componentName) {
    const result = createFiles({
        ...config,
        componentName: domain
    })
    pendingPromises.push(result)
}

await Promise.all(pendingPromises)