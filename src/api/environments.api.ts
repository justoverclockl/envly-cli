import { apiRequest } from './client.js'
import type {Environment} from "./types.js";


export const getEnvironments = (
    projectId: string,
) => {
    return apiRequest<Environment[]>(
        `/projects/${encodeURIComponent(projectId)}/environments`,
    )
}
