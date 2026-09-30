import { Command } from 'commander'

import {
    getCurrentUser,
} from '../api/auth.api.js'
import { handleCommandError } from '../errors/command-error.js'
import chalk from "chalk";

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

                console.log(
                    chalk.magentaBright(
                        `Logged in as ${user.username} `
                    )
                )
                console.log(
                    chalk.magentaBright(
                        `Email ${user.email}`
                    )
                )

            } catch (error) {
                handleCommandError(error, {
                    operation: 'Whoami',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                    },
                })
            }
        })
