import { ENV } from "../utils";

export class Documents {
    baseApi = ENV.BASE_API;

    async getDocuments(page = 1, limit = 10, en_home = undefined) {
        try {
        const pageFilter = `page=${page}`;
        const limitFilter = `limit=${limit}`;
        const enHomeFilter = en_home !== undefined ? `&en_home=${en_home}` : "";

        const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTS.GET_DOCUMENTS}?${pageFilter}&${limitFilter}${enHomeFilter}`;

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

    async deleteDocument(accessToken, idDocument) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTS.DELETE_DOCUMENT}/${idDocument}`;
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
}