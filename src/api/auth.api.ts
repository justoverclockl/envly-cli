import {apiRequest} from './client.js'
import type {
    CliTokenExchangePayload,
    CliTokenExchangeResponse,
    CurrentUser,
    LoginPayload,
    LoginResponse,
} from './types.js'

export const login = (
    payload: LoginPayload,
) => {
    return apiRequest<LoginResponse>(
        '/auth/login',
        {
            method: 'POST',
            authenticated: false,
            body: JSON.stringify(payload),
        },
    )
}

export const getCurrentUser = () => {
    return apiRequest<CurrentUser>(
        '/user/me',
    )
}

export const exchangeCliAuthorizationCode = (
    payload: CliTokenExchangePayload,
) => {
    return apiRequest<CliTokenExchangeResponse>(
        '/auth/cli/exchange',
        {
            method: 'POST',
            authenticated: false,
            body: JSON.stringify(payload),
        },
    )
}
