

import ArticApi from './ArticApi';
import {DetailApiResponse, ListApiResponse } from './models/ApiModel';


class ServiceArtistApi{
    private articApi: ArticApi;
    private params:Record<string, any>
   
    constructor() {
        this.params = {fields: 'id,title,artist_display,image_id,main_reference_number',};
        this.articApi = new ArticApi('https://api.artic.edu/api/v1/');
      } 

      async getDetailArt(idDetail:String): Promise<DetailApiResponse> {
        try {
          const data: DetailApiResponse = await this.articApi.getWithParams<DetailApiResponse>(`artworks/${idDetail}`, this.params);
          return data; // Retornar el objeto Artwork
        } catch (error) {
          throw error; // Propagar el error7
        }
      }

      async getListArts(): Promise<ListApiResponse> {
        try {
          const data: ListApiResponse = await this.articApi.getWithParams<ListApiResponse>('artworks', this.params);
          return data; // Retornar el objeto Artwork
        } catch (error) {
          throw error; // Propagar el error
        }
      }
}


export default ServiceArtistApi