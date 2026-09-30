import {Command} from 'commander'

import {saveCredentials} from '../auth/credentials.js'
import {handleCommandError} from '../errors/command-error.js'
import {browserLogin} from '../auth/browser-login.js'
import chalk from "chalk";

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
                console.log(
                    chalk.yellow('Opening Envly in your browser...'),
                )

                const {
                    token,
                } = await browserLogin()

                await saveCredentials({
                    token,
                })

                console.log(
                    chalk.green('Logged in successfully.'),
                )
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Login',
                })
            }
        })