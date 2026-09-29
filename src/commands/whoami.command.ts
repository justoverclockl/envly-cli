import { Command } from 'commander'

import {
    getCurrentUser,
} from '../api/auth.api.js'
import { handleCommandError } from '../errors/command-error.js'

export const whoamiCommand =
    new Command('whoami')
        .description(
            'Show current authenticated user',
        )
        .addHelpText(
            'after',
            `
Examples:
  $ envly whoami
`,
        )
        .action(async () => {
            try {
                const user =
                    await getCurrentUser()

                console.log(user.email)
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Whoami',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                    },
                })
            }
        })
