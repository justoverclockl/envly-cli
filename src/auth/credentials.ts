import {
    mkdir,
    readFile,
    writeFile,
    rm,
} from 'node:fs/promises'

import { homedir } from 'node:os'
import { join } from 'node:path'

const ENVLY_DIR = join(
    homedir(),
    '.envly',
)

const CONFIG_FILE = join(
    ENVLY_DIR,
    'config.json',
)

type Credentials = {
    token: string
}

export const saveCredentials = async (
    credentials: Credentials,
) => {
    await mkdir(ENVLY_DIR, {
        recursive: true,
    })

    await writeFile(
        CONFIG_FILE,
        JSON.stringify(credentials, null, 4),
        {
            mode: 0o600,
        },
    )
}

export const getCredentials =
    async (): Promise<Credentials | null> => {
        try {
            const file = await readFile(
                CONFIG_FILE,
                'utf8',
            )

            return JSON.parse(file)
        } catch {
            return null
        }
    }

export const getToken =
    async (): Promise<string | null> => {
        const credentials =
            await getCredentials()

        return credentials?.token ?? null
    }

export const clearCredentials = async () => {
    await rm(CONFIG_FILE, {
        force: true,
    })
}
