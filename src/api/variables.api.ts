import { apiRequest } from './client.js'
import type {EnvironmentVariable} from "./types.js";


export const getVariables = (
    projectId: string,
    environmentId: string,
) => {
    return apiRequest<EnvironmentVariable[]>(
        `/projects/${encodeURIComponent(projectId)}` +
        `/environments/${encodeURIComponent(environmentId)}/variables`,
    )
}
