#!/usr/bin/env node

import { Command } from 'commander'
import {loginCommand} from "./commands/login.command.js";
import {logoutCommand} from "./commands/logout.command.js";
import {whoamiCommand} from "./commands/whoami.command.js";
import {projectsCommand} from "./commands/projects.command.js";
import {environmentsCommand} from "./commands/environments.command.js";
import {variablesCommand} from "./commands/variables.command.js";
import {exportCommand} from "./commands/export.command.js";
import { printBanner } from './ui/banner.js'
import packageJson from '../package.json' with { type: 'json' }

const program = new Command()
const hasCommand = process.argv.slice(2).length > 0

program
    .name('envly')
    .description('Envly CLI')
    .version(packageJson.version)

program
    .addCommand(loginCommand)
    .addCommand(logoutCommand)
    .addCommand(whoamiCommand)
    .addCommand(projectsCommand)
    .addCommand(environmentsCommand)
    .addCommand(variablesCommand)
    .addCommand(exportCommand)

if (!hasCommand) {
    printBanner()
    program.outputHelp()
} else {
    try {
        await program.parseAsync(process.argv)
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'An unexpected error occurred'

        console.error(`Error: ${message}`)
        process.exitCode = 1
    }
}
