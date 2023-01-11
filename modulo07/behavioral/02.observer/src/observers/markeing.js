export default class Marketing {
    update({id, useName}) {
        // importante lembrar que [update] é responsavel por gerenciar seus erros/exceptions
        // nao deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
        // Só notificar todo mundo
        console.log(`[${id}]: [marketing] will send an welcome email to [${useName}]`)
    }
}