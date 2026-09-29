import JSZip from 'jszip'

import type {
    Environment,
    EnvironmentVariable,
} from '../api/types.js'

export const ENVIRONMENT_FILE_NAMES: Record<
    Environment['name'],
    string
> = {
    DEVELOPMENT: '.env.development',
    STAGING: '.env.staging',
    PRODUCTION: '.env.production',
}

type VariablesByEnvironment = Partial<
    Record<Environment['name'], EnvironmentVariable[]>
>

export const createEnvironmentArchive = async (
    variablesByEnvironment: VariablesByEnvironment,
): Promise<Buffer> => {
    const archive = new JSZip()

    Object.entries(ENVIRONMENT_FILE_NAMES)
        .forEach(([environmentName, fileName]) => {
            const variables =
                variablesByEnvironment[
                    environmentName as Environment['name']
                ] ?? []

            archive.file(
                fileName,
                serializeEnvironmentVariables(variables),
            )
        })

    return archive.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: {
            level: 9,
        },
    })
}

const serializeEnvironmentVariables = (
    variables: EnvironmentVariable[],
): string => {
    return variables
        .map(({ key, value }) => `${key}=${value}`)
        .join('\n')
}
