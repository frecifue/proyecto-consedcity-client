import { ENV } from "../utils";

export class TypeUser {
    baseApi = ENV.BASE_API;

    async getTypeUsers(accessToken) {
        try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.TYPE_USER.GET_TYPE_USERS}`;
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

  
}