import { ENV } from "../utils";

export class User {
    baseApi = ENV.BASE_API;

    async get_me(accessToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER.GET_ME}`;
            const params = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUsers(accessToken, active = undefined) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.USER.GET_USERS}?activo=${active}`;
        const params = {
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

    async createUser(accessToken, data) {
        try {
        const formData = new FormData();
        
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (data.fileAvatar) {
            formData.append("avatar", data.fileAvatar);
        }

        const url = `${this.baseApi}/${ENV.API_ROUTES.USER.CREATE_USER}`;
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

    async updateUser(accessToken, idUser, userData) {
        try {
        const data = userData;
        if (!data.usu_password) {
            delete data.usu_password;
        }

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (data.fileAvatar) {
            formData.append("avatar", data.fileAvatar);
        }

        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER.UPDATE_USER}/${idUser}`;
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

    async deleteUser(accessToken, idUser) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.USER.DELETE_USER}/${idUser}`;
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