import { ENV } from "../utils";

export class Post {
    baseApi = ENV.BASE_API;

    async getPost(path) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.POST.GET_POST_PATH}/${path}`;

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

    async getPosts(page = 1, limit = 10, relations = true, en_home = undefined) {
        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const relationsFilter = `relations=${relations}`; 
            const enHomeFilter = en_home !== undefined ? `&en_home=${en_home}` : "";

            const url = `${this.baseApi}/${ENV.API_ROUTES.POST.GET_POST}?${pageFilter}&${limitFilter}&${relationsFilter}${enHomeFilter}`;

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

    async createPost(accessToken, data) {
        try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (data.file) {
            formData.append("img_principal", data.file);
        }

        const url = `${this.baseApi}/${ENV.API_ROUTES.POST.CREATE_POST}`;
        const params = {
            method: "POST",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
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

    async updatePost(accessToken, idPost, data) {
        try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (data.file) {
            formData.append("img_principal", data.file);
        }

        const url = `${this.baseApi}/${ENV.API_ROUTES.POST.UPDATE_POST}/${idPost}`;
        const params = {
            method: "PATCH",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
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

    async deletePost(accessToken, idPost) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.POST.DELETE_POST}/${idPost}`;
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

    async addDocuments(accessToken, idPost, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.POST.ADD_DOCUMENTS.replace(":posId", idPost)}`;
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

    async addImages(accessToken, idPost, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.POST.ADD_IMAGES.replace(":posId", idPost)}`;
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