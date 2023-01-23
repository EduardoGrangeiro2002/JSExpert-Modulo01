import Util from '../util'
const componentNameAnchor = '$$componentName'
const repositoryAnchor = '$$repositoryName'
const currentContextAnchor = '$$currentContext'
const template = `
export default class $$componentNameService {
    constructor({ repository: $$repositoryName }) {
        $$currentContext = $$repositoryName
    }

    create(data) {
        return $$currentContext.create(data)
    }

    read(query) {
        return $$currentContext.read(query)
    }

    update(id, data) {
        return $$currentContext.update(id, data)
    }

    delete(id) {
        return $$currentContext.delete(id)
    }
}`
const componentName = '$$componentName'

export default function serviceTemplate(componentName, repositoryName) {
    const currentContext = `this.${repositoryName}`
    return {
        fileName: `${componentName}Service`,
        template: template
                    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
                    .replaceAll(repositoryAnchor, Util.lowerCaseFirstLetter(repositoryName))
                    .replaceAll(currentContextAnchor, currentContext)
    }
}

