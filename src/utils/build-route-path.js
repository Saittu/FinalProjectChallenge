export function buildRoutePath(path) {
    const routesParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routesParametersRegex, '(?<$1>[a-z0-9\-_]+)')


    //(?<query>) = torna o uso do query opcional
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>)`) 

    return pathRegex
}