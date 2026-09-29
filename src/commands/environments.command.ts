import {getEnvironments} from "../api/environments.api.js";
import {Command} from "commander";
import {handleCommandError} from "../errors/command-error.js";

export const environmentsCommand =
    new Command('environments')
        .description(
            'List project environments',
        )
        .requiredOption(
            '-p, --project <id>',
            'Project ID',
        )
        .addHelpText(
            'after',
            `
Examples:
  $ envly environments --project <project-id>
  $ envly environments -p <project-id>
`,
        )
        .action(async ({ project }) => {
            try {
                const environments =
                    await getEnvironments(project)

                environments.forEach(
                    (environment) => {
                        console.log(
                            `${environment.id}  ${environment.name}`,
                        )
                    },
                )
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Environments request',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                        404: `project "${project}" was not found.`,
                    },
                })
            }
        })
