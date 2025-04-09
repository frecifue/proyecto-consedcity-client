import { ENV } from "../utils";

export class ImageGallery {
  baseApi = ENV.BASE_API;

  async getImagesGallery(page = 1, limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.IMAGE_GALLERY.GET_IMAGES_GALLERY}?${pageFilter}&${limitFilter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getImageGallery() {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.IMAGE_GALLERY.GET_IMAGE_GALLERY}`;
    
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createImageGallery(accessToken, data) {
    try {
      const formData = new FormData();
      
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileImagen) {
        formData.append("imagen", data.fileImagen);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.IMAGE_GALLERY.CREATE_IMAGE_GALLERY}`;
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

  async updateImageGallery(accessToken, idImgGallery, imgGalleryData) {
    try {
      const data = imgGalleryData;

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileImage) {
        formData.append("imagen", data.fileImage);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.IMAGE_GALLERY.UPDATE_IMAGE_GALLERY}/${idImgGallery}`;
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

  async deleteImageGallery(accessToken, idImgGallery) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.IMAGE_GALLERY.DELETE_IMAGE_GALLERY}/${idImgGallery}`;
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