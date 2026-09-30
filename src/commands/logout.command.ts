import { Command } from 'commander'

import {
    clearCredentials,
} from '../auth/credentials.js'
import { handleCommandError } from '../errors/command-error.js'
import chalk from "chalk";

export const logoutCommand =
    new Command('logout')
        .description('Logout from Envly')
        .addHelpText(
            'after',
            `
Examples:
  $ envly logout
`,
        )
        .action(async () => {
            try {
                await clearCredentials()

                console.log(
                    chalk.red('Logged out successfully from envly.'),
                )
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Logout',
                    unexpectedMessage:
                        'unable to remove the stored credentials.',
                })
            }
        })
