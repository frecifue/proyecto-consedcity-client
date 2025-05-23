import { ENV } from "../utils";

export class GeneralInfo {
    baseApi = ENV.BASE_API;

    async getGeneralInfo() {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.GENERAL_INFO.GET_GENERAL_INFO}`;

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

    async createGeneralInfo(accessToken, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.GENERAL_INFO.CREATE_GENERAL_INFO}`;
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

    async updateGeneralInfo(accessToken, idGeneralInfo, data) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.GENERAL_INFO.UPDATE_GENERAL_INFO}/${idGeneralInfo}`;
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

    async deleteGeneralInfo(accessToken, idGeneralInfo) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.GENERAL_INFO.DELETE_GENERAL_INFO}/${idGeneralInfo}`;
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