import { Command } from 'commander'

import {
    getProjects,
} from '../api/projects.api.js'
import { handleCommandError } from '../errors/command-error.js'

export const projectsCommand =
    new Command('projects')
        .description(
            'List your Envly projects',
        )
        .addHelpText(
            'after',
            `
Examples:
  $ envly projects
`,
        )
        .action(async () => {
            try {
                const projects =
                    await getProjects()

                projects.forEach((project) => {
                    console.log(
                        `${project.id}  ${project.name}`,
                    )
                })
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Projects request',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                    },
                })
            }
        })
