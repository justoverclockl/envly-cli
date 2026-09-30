export type ApiRequestOptions = RequestInit & {
    authenticated?: boolean
}

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    statusCode: number
    message: string
    token: string
    pendingPlan: string | null
}

export type CliTokenExchangePayload = {
    code: string
    codeVerifier: string
}

export type CliTokenExchangeResponse = {
    statusCode: number
    token: string
}

export type CurrentUser = {
    id: string
    username: string
    email: string
    name: string | null
    surname: string | null
}

export type Project = {
    id: string
    name: string
}

export type ProjectsResponse = {
    statusCode: number
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    items: Project[]
}

export type Environment = {
    id: string
    name:
        | 'DEVELOPMENT'
        | 'STAGING'
        | 'PRODUCTION'
    projectId: string
    createdAt: string
    updatedAt: string
    _count: {
        variables: number
    }
}

export type EnvironmentVariable = {
    id: string
    key: string
    value: string
    environmentId: string
    createdAt: string
    updatedAt: string
}
