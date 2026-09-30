import { Command } from 'commander'

import {
    getProjects,
} from '../api/projects.api.js'
import { handleCommandError } from '../errors/command-error.js'
import chalk from 'chalk';
import chalkTable from 'chalk-table';

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
                const projects = await getProjects()
                const options = {
                    leftPad: 2,
                    columns: [
                        { field: 'id', name: chalk.cyan('Project ID') },
                        { field: 'name', name: chalk.magenta('Project name') },
                    ]
                }

                const table = chalkTable(options, projects)
                console.log(table)
            } catch (error) {
                handleCommandError(error, {
                    operation: 'Projects request',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                    },
                })
            }
        })
