import { apiRequest } from './client.js'
import type {Project, ProjectsResponse} from "./types.js";

export const getProjects = async (): Promise<Project[]> => {
    const projects: Project[] = []
    let page = 1
    let totalPages = 1

    do {
        const response = await apiRequest<ProjectsResponse>(
            `/projects?page=${page}&pageSize=100`,
        )

        projects.push(...response.items)
        totalPages = response.totalPages
        page += 1
    } while (page <= totalPages)

    return projects
}
