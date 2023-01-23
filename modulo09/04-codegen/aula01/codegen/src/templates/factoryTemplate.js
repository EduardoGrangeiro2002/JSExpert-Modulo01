import Util from "../util"

const componentNameAnchor = '$$componentName'
const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'

const serviceNameDepAnchor = '$$serviceNameDep'
const repositoryNameDepAnchor = '$$repositoryNameDep'

const template = `
import $$repositoryName from '../repository/$$repositoryNameDep.js'
import $$serviceName from '../service/$$serviceNameDep.js'

export default class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName()
        const service = new $$serviceName({repository})
        return service
    }
}`





export default function factoryTemplate (componentName, repositoryName, serviceName) {
    return {
        fileName: `${componentName}Factory`,
        template: template
                    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
                    .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
                    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
                    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
                    .replaceAll(serviceNameAnchor,  Util.upperCaseFirstLetter(serviceName))
    }
}