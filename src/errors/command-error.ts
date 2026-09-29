import { ApiError } from '../api/client.js'

type CommandErrorOptions = {
    operation: string
    statusMessages?: Partial<Record<number, string>>
    connectionMessage?: string
    unexpectedMessage?: string
}

export const handleCommandError = (
    error: unknown,
    options: CommandErrorOptions,
) => {
    let message: string

    if (error instanceof ApiError) {
        message =
            options.statusMessages?.[error.status] ??
            getDefaultApiErrorMessage(error)
    } else if (error instanceof TypeError) {
        message =
            options.connectionMessage ??
            'unable to connect to Envly.'
    } else if (
        error instanceof Error &&
        error.name === 'ExitPromptError'
    ) {
        message = 'operation cancelled.'
    } else {
        message =
            options.unexpectedMessage ??
            'an unexpected error occurred.'
    }

    console.error(`${options.operation} failed: ${message}`)
    process.exitCode = 1
}

const getDefaultApiErrorMessage = (
    error: ApiError,
): string => {
    switch (error.status) {
        case 401:
            return 'authentication required. Run "envly login" first.'
        case 403:
            return 'you do not have permission to perform this operation.'
        case 404:
            return 'the requested resource was not found.'
        case 422:
            return error.message
        case 429:
            return 'too many requests. Please try again later.'
        default:
            if (error.status >= 500) {
                return 'the Envly service is temporarily unavailable.'
            }

            return error.message
    }
}
