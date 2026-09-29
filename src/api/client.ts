import { config } from '../config/config.js'
import { getToken } from '../auth/credentials.js'
import {ApiRequestOptions} from "./types.js";

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export const apiRequest = async <T>(
    path: string,
    options: ApiRequestOptions = {},
): Promise<T> => {
    const {
        authenticated = true,
        ...requestOptions
    } = options

    const token = authenticated
        ? await getToken()
        : null

    if (authenticated && !token) {
        throw new ApiError(
            'Authentication required. Run "envly login" first.',
            401,
        )
    }

    const response = await fetch(
        `${config.apiUrl}${path}`,
        {
            ...requestOptions,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),
                ...requestOptions.headers,
            },
        },
    )

    if (!response.ok) {
        const body: unknown = await response
            .json()
            .catch(() => null)

        throw new ApiError(
            getErrorMessage(
                body,
                `Request failed with status ${response.status}`,
            ),
            response.status,
        )
    }

    return await response.json() as Promise<T>
}

const getErrorMessage = (
    body: unknown,
    fallback: string,
): string => {
    if (
        body &&
        typeof body === 'object' &&
        'message' in body
    ) {
        const { message } = body as { message?: unknown }

        if (typeof message === 'string') {
            return message
        }

        if (Array.isArray(message)) {
            return message
                .filter((item): item is string =>
                    typeof item === 'string',
                )
                .join(', ')
        }
    }

    return fallback
}
