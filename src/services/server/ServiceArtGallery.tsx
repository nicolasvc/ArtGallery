

import ArticApi from './ArticApi';
import {DetailApiResponse, ListApiResponse } from './models/ApiModel';


class ServiceArtistApi{
    private articApi: ArticApi;
    private params:Record<string, any>
   
    constructor() {
        this.params = {fields: 'id,title,artist_display,image_id,main_reference_number,description'};
        this.articApi = new ArticApi('https://api.artic.edu/api/v1/');
      } 

      async getDetailArt(idDetail:String): Promise<DetailApiResponse> {
        try {
          const data: DetailApiResponse = await this.articApi.getWithParams<DetailApiResponse>(`artworks/${idDetail}`, this.params);
          return data; 
        } catch (error) {
          throw error; 
        }
      }

      async getListArts(page: string): Promise<ListApiResponse> {
        try {
          const paramsWithPage = { ...this.params, page:page };
          const data: ListApiResponse = await this.articApi.getWithParams<ListApiResponse>('artworks', paramsWithPage);
          return data; 
        } catch (error) {
          throw error; 
        }
      }
}


export default ServiceArtistApi