import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'

import { Command } from 'commander'

import { getEnvironments } from '../api/environments.api.js'
import { getVariables } from '../api/variables.api.js'
import type {
    Environment,
    EnvironmentVariable,
} from '../api/types.js'
import { handleCommandError } from '../errors/command-error.js'
import { createEnvironmentArchive } from '../export/environment-archive.js'

type ExportOptions = {
    project: string
    output?: string
    force?: boolean
}

export const exportCommand =
    new Command('export')
        .description(
            'Export project variables to a ZIP archive',
        )
        .requiredOption(
            '-p, --project <id>',
            'Project ID',
        )
        .option(
            '-o, --output <path>',
            'Output ZIP file path',
        )
        .option(
            '-f, --force',
            'Overwrite an existing ZIP file',
        )
        .addHelpText(
            'after',
            `
Examples:
  $ envly export --project <project-id>
  $ envly export -p <project-id> --output envly-variables.zip
  $ envly export -p <project-id> -o envly-variables.zip --force
`,
        )
        .action(async (options: ExportOptions) => {
            const outputPath = getOutputPath(options)

            try {
                const environments =
                    await getEnvironments(options.project)

                const entries = await Promise.all(
                    environments.map(async (environment) => [
                        environment.name,
                        await getVariables(
                            options.project,
                            environment.id,
                        ),
                    ] as const),
                )

                const variablesByEnvironment =
                    Object.fromEntries(entries) as Partial<
                        Record<
                            Environment['name'],
                            EnvironmentVariable[]
                        >
                    >

                const archive =
                    await createEnvironmentArchive(
                        variablesByEnvironment,
                    )

                await mkdir(dirname(outputPath), {
                    recursive: true,
                })

                await writeFile(outputPath, archive, {
                    flag: options.force ? 'w' : 'wx',
                    mode: 0o600,
                })

                console.log(
                    `Environment variables exported to ${outputPath}`,
                )
            } catch (error) {
                if (isFileExistsError(error)) {
                    console.error(
                        `Export failed: ${outputPath} already exists. ` +
                        'Use --force to overwrite it.',
                    )
                    process.exitCode = 1
                    return
                }

                handleCommandError(error, {
                    operation: 'Export',
                    statusMessages: {
                        401: 'you are not logged in. Run "envly login" first.',
                        404: `project "${options.project}" was not found.`,
                    },
                    unexpectedMessage:
                        `unable to write the ZIP archive to ${outputPath}.`,
                })
            }
        })

const getOutputPath = (
    options: ExportOptions,
): string => {
    const requestedPath =
        options.output ??
        `envly-${options.project}.zip`

    const zipPath =
        extname(requestedPath).toLowerCase() === '.zip'
            ? requestedPath
            : `${requestedPath}.zip`

    return resolve(zipPath)
}

const isFileExistsError = (
    error: unknown,
): error is NodeJS.ErrnoException => {
    return (
        error instanceof Error &&
        'code' in error &&
        error.code === 'EEXIST'
    )
}
