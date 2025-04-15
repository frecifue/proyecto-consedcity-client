import { ENV } from "../utils";

export class Documents {
    baseApi = ENV.BASE_API;

    async createDocument(accessToken, data) {
        try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (data.file) {
            formData.append("documento", data.file);
        }

        const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTS.CREATE_DOCUMENT}`;
        const params = {
            method: "POST",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        };

        return await fetch(url, params);
        
        } catch (error) {
        throw error;
        }
    }

    async getDocuments(page = 1, limit = 10) {
        try {
        const pageFilter = `page=${page}`;
        const limitFilter = `limit=${limit}`;
        const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTS.GET_DOCUMENTS}?${pageFilter}&${limitFilter}`;

        const response = await fetch(url);
        const result = await response.json();

        if (response.status !== 200) throw result;

        return result;
        } catch (error) {
        throw error;
        }
    }

    async updateDocument(accessToken, idDocument, data) {
        try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (data.file) {
            formData.append("documento", data.file);
        }

        const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTS.UPDATE_DOCUMENT}/${idDocument}`;
        const params = {
            method: "PATCH",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        };

        return await fetch(url, params);
        
        } catch (error) {
        throw error;
        }
    }

    async deleteDocument(accessToken, idDocument) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTS.DELETE_DOCUMENT}/${idDocument}`;
        const params = {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        };

        return await fetch(url, params);
        
        } catch (error) {
        throw error;
        }
    }
}