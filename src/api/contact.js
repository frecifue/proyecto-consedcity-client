import { ENV } from "../utils";

export class Contact {
  baseApi = ENV.BASE_API;

  async contact(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CONTACT.CONTACT}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
    //   const result = await response.json();

    //   if (response.status !== 200) throw result;

      return response;
    } catch (error) {
      throw error;
    }
  }

}