# Envly CLI

Command-line interface for accessing Envly projects and environment variables.

## Requirements

- Node.js 22 or newer
- An active Envly account

## Installation

### Install from npm

Once the package is published, install it globally:

```shell
npm install --global @envly/cli
```

Verify the installation:

```shell
envly --version
envly --help
```

### Install from source

Clone the repository, install its dependencies, build it, and register the
`envly` executable globally:

```shell
npm install
npm run build
npm link
```

You can then use the CLI from any directory:

```shell
envly --help
```

Run `npm unlink --global @envly/cli` to remove the linked executable.

## Authentication

Log in interactively with your Envly email and password:

```shell
envly login
```

The access token is stored locally in `~/.envly/config.json` and is sent as a
Bearer token with authenticated requests.

Check the currently authenticated user:

```shell
envly whoami
```

Remove the locally stored credentials:

```shell
envly logout
```

If the token is missing or no longer valid, run `envly login` again.

## Commands

### List projects

```shell
envly projects
```

The command follows API pagination and prints every project available to the
authenticated user.

### List project environments

```shell
envly environments --project <project-id>
```

The short option is also supported:

```shell
envly environments -p <project-id>
```

### List project variables

```shell
envly variables --project <project-id>
```

The variables are grouped and printed in this order:

1. `DEVELOPMENT`
2. `STAGING`
3. `PRODUCTION`

Example output:

```text
DEVELOPMENT
  DATABASE_URL=postgresql://localhost/envly

STAGING
  DATABASE_URL=postgresql://staging.example/envly

PRODUCTION
  DATABASE_URL=postgresql://production.example/envly
```

> [!WARNING]
> This command prints decrypted environment-variable values. Avoid running it
> in shared terminals, CI logs, screen recordings, or other public output.

### Export project variables

Export all project variables to a ZIP archive:

```shell
envly export --project <project-id>
```

The archive is saved in the current directory as
`envly-<project-id>.zip` and contains:

```text
.env.development
.env.staging
.env.production
```

Choose a different output path with `--output` or `-o`:

```shell
envly export -p <project-id> --output envly-variables.zip
```

The CLI will not overwrite an existing archive unless `--force` is supplied:

```shell
envly export -p <project-id> -o envly-variables.zip --force
```

> [!WARNING]
> The ZIP archive contains decrypted secrets and is not password protected.
> Store it securely and do not commit it to version control.

## Troubleshooting

### Authentication required

```text
you are not logged in. Run "envly login" first.
```

Run `envly login` and make sure the API used for login is the same API used by
the other commands.

### Resource not found

Verify that the supplied project ID exists and is accessible to the
authenticated user.
