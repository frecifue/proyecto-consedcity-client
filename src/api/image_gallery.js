import { ENV } from "../utils";

export class ImageGallery {
  baseApi = ENV.BASE_API;

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


  
}