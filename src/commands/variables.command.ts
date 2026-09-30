import { Command } from 'commander'
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import { getEnvironments } from '../api/environments.api.js'
import { getVariables } from '../api/variables.api.js'
import type {
    Environment,
    EnvironmentVariable,
} from '../api/types.js'
import { handleCommandError } from '../errors/command-error.js'

const ENVIRONMENT_ORDER: Environment['name'][] = [
    'DEVELOPMENT',
    'STAGING',
    'PRODUCTION',
]

export const variablesCommand =
    new Command('variables')
        .description(
            'List project variables grouped by environment',
        )
        .requiredOption(
            '-p, --project <id>',
            'Project ID',
        )
        .addHelpText(
            'after',
            `
Examples:
  $ envly variables --project <project-id>
  $ envly variables -p <project-id>
`,
        )
        .action(async ({ project }: { project: string }) => {
            try {
                const environments =
                    await getEnvironments(project)

                const variablesByEnvironment =
                    await Promise.all(
                        environments.map(async (environment) => ({
                            environment,
                            variables: await getVariables(
                                project,
                                environment.id,
                            ),
                        })),
                    )

                variablesByEnvironment
                    .sort(
                        (left, right) =>
                            ENVIRONMENT_ORDER.indexOf(
                                left.environment.name,
                            ) -
                            ENVIRONMENT_ORDER.indexOf(
                                right.environment.name,
                            ),
                    )
                    .forEach(({ environment, variables }) => {
                        printEnvironmentVariables(
                            environment.name,
                            variables,
                        )
                    })
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Variables request',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                        404: `project "${project}" was not found.`,
                    },
                })
            }
        })

const printEnvironmentVariables = (
    environmentName: Environment['name'],
    variables: EnvironmentVariable[],
) => {
    console.log(chalk.bgMagenta(environmentName))

    const options = {
        leftPad: 2,
        columns: [
            { field: 'key', name: chalk.cyan('key') },
            { field: 'value', name: chalk.magenta('value') },
        ]
    }

    if (variables.length === 0) {
        console.log(chalk.red('  (no variables)'))
    } else {
        const table = chalkTable(options, variables)
        console.log(table)

    }
}
