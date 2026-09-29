import { Command } from 'commander'

import {
    clearCredentials,
} from '../auth/credentials.js'
import { handleCommandError } from '../errors/command-error.js'

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
                    'Logged out successfully.',
                )
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Logout',
                    unexpectedMessage:
                        'unable to remove the stored credentials.',
                })
            }
        })
