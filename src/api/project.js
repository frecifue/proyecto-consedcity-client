import { ENV } from "../utils";

export class Project {
    baseApi = ENV.BASE_API;

    async getProjects(page = 1, limit = 10) {
        try {
        const pageFilter = `page=${page}`;
        const limitFilter = `limit=${limit}`;
        const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.GET_PROJECTS}?${pageFilter}&${limitFilter}`;

        const response = await fetch(url);
        const result = await response.json();

        return {
            status: response.status,
            data: result, 
        };
        } catch (error) {
        throw error;
        }
    }

    async createProject(accessToken, data) {
        try {

            const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.CREATE_PROJECT}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            return {
                status: response.status,
                data: result, 
            };
        
        } catch (error) {
        throw error;
        }
    }

    async updateProject(accessToken, idProject, data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.UPDATE_PROJECT}/${idProject}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            return {
                status: response.status,
                data: result, 
            };
        
        } catch (error) {
        throw error;
        }
    }

    async deleteProject(accessToken, idProject) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.DELETE_PROJECT}/${idProject}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            return {
                status: response.status,
                data: result, 
            };
        
        } catch (error) {
            throw error;
        }
    }

    async addDocuments(accessToken, idProject, data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.ADD_DOCUMENTS.replace(":proId", idProject)}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            return {
                status: response.status,
                data: result, 
            };
        
        } catch (error) {
            throw error;
        }
    }

    async addImages(accessToken, idProject, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.ADD_IMAGES.replace(":proId", idProject)}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return {
            status: response.status,
            data: result, 
        };
        
        } catch (error) {
            throw error;
        }
    }

    async addPosts(accessToken, idProject, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.ADD_POSTS.replace(":proId", idProject)}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return {
            status: response.status,
            data: result, 
        };
        
        } catch (error) {
            throw error;
        }
    }

    async addTeams(accessToken, idProject, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.PROJECTS.ADD_TEAMS.replace(":proId", idProject)}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return {
            status: response.status,
            data: result, 
        };
        
        } catch (error) {
            throw error;
        }
    }
}