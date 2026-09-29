import { Command } from 'commander'
import {
    input,
    password,
} from '@inquirer/prompts'

import { login } from '../api/auth.api.js'
import { saveCredentials } from '../auth/credentials.js'
import { handleCommandError } from '../errors/command-error.js'

export const loginCommand =
    new Command('login')
        .description('Login to Envly')
        .addHelpText(
            'after',
            `
Examples:
  $ envly login
`,
        )
        .action(async () => {
            try {
                const email = await input({
                    message: 'Email:',
                })

                const userPassword = await password({
                    message: 'Password:',
                    mask: '*',
                })

                const response = await login({
                    email,
                    password: userPassword,
                })

                await saveCredentials({
                    token: response.token,
                })

                console.log(
                    'Logged in successfully.',
                )
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Login',
                    statusMessages: {
                        401: 'invalid email or password.',
                        429: 'too many attempts. Please try again later.',
                    },
                })
            }
        })
