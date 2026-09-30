import http from 'node:http'
import {
    createHash,
    randomBytes,
} from 'node:crypto'

import open from 'open'
import {config} from '../config/config.js'
import {authenticationSuccessTemplate} from '../ui/authentication-success.template.js'
import {exchangeCliAuthorizationCode} from '../api/auth.api.js'

type BrowserLoginResult = {
    token: string
}

const HOST = '127.0.0.1'
const LOGIN_URL = config.loginUrl
const LOGIN_TIMEOUT_MS = 5 * 60 * 1000

export const browserLogin = async (): Promise<BrowserLoginResult> => {
    const state = randomBytes(32).toString('hex')
    const codeVerifier = randomBytes(32).toString('base64url')
    const codeChallenge = createHash('sha256')
        .update(codeVerifier)
        .digest('base64url')

    return new Promise((resolve, reject) => {
        let timeout: NodeJS.Timeout | undefined

        const closeServer = () => {
            if (timeout) {
                clearTimeout(timeout)
            }

            server.close()
        }

        const server = http.createServer((request, response) => {
            if (
                request.method !== 'POST' ||
                request.url !== '/callback'
            ) {
                response.writeHead(404)
                response.end('Not found')

                return
            }

            let body = ''

            request.on('data', (chunk) => {
                body += chunk.toString()

                if (body.length > 100_000) {
                    request.destroy()
                }
            })

            request.on('end', async () => {
                const params = new URLSearchParams(body)

                const code = params.get('code')
                const returnedState = params.get('state')

                if (returnedState !== state) {
                    response.writeHead(401, {
                        'Content-Type': 'text/plain; charset=utf-8',
                    })

                    response.end('Invalid authentication state')

                    closeServer()

                    reject(
                        new Error('Invalid authentication state'),
                    )

                    return
                }

                if (!code) {
                    response.writeHead(400, {
                        'Content-Type': 'text/plain; charset=utf-8',
                    })

                    response.end('Missing authorization code')

                    closeServer()

                    reject(
                        new Error('Authorization code was not received'),
                    )

                    return
                }

                try {
                    const {
                        token,
                    } = await exchangeCliAuthorizationCode({
                        code,
                        codeVerifier,
                    })

                    response.writeHead(200, {
                        'Cache-Control': 'no-store',
                        'Content-Type': 'text/html; charset=utf-8',
                        'Referrer-Policy': 'no-referrer',
                        'X-Content-Type-Options': 'nosniff',
                    })

                    response.end(authenticationSuccessTemplate)
                    closeServer()
                    resolve({
                        token,
                    })
                } catch (error) {
                    response.writeHead(401, {
                        'Cache-Control': 'no-store',
                        'Content-Type': 'text/plain; charset=utf-8',
                    })
                    response.end(
                        'Authentication failed. Return to your terminal and try again.',
                    )
                    closeServer()
                    reject(error)
                }
            })
        })

        server.on('error', reject)

        server.listen(0, HOST, async () => {
            const address = server.address()

            if (
                !address ||
                typeof address === 'string'
            ) {
                closeServer()

                reject(
                    new Error(
                        'Unable to start authentication callback server',
                    ),
                )

                return
            }

            const loginUrl = new URL(LOGIN_URL)

            loginUrl.searchParams.set('cli', 'true')
            loginUrl.searchParams.set(
                'port',
                String(address.port),
            )
            loginUrl.searchParams.set(
                'state',
                state,
            )
            loginUrl.searchParams.set(
                'code_challenge',
                codeChallenge,
            )

            timeout = setTimeout(() => {
                closeServer()
                reject(
                    new Error(
                        'Browser authentication timed out',
                    ),
                )
            }, LOGIN_TIMEOUT_MS)

            try {
                await open(loginUrl.toString())
            } catch (error) {
                closeServer()
                reject(error)
            }
        })
    })
}