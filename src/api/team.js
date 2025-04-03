import { ENV } from "../utils";

export class Team {
  baseApi = ENV.BASE_API;

  async createTeam(accessToken, data) {
    try {
      const formData = new FormData();
      
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileFotoPerfil) {
        formData.append("foto_perfil", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.TEAM.CREATE_TEAM}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTeams() {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.TEAM.GET_TEAM}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTeam(accessToken, idTeam, teamData) {
    try {
      const data = teamData;

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileFotoPerfil) {
        formData.append("foto_perfil", data.fileFotoPerfil);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.TEAM.UPDATE_TEAM}/${idTeam}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteTeam(accessToken, idTeam) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.TEAM.DELETE_TEAM}/${idTeam}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  
}