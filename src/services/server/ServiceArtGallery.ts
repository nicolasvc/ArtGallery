

import ApiProvider from './ApiProvider';
import {DetailApiResponse, ListApiResponse } from './models/ApiModel';

//TODO Remove ServiceArtistApi from View
//CONVERT  https://api.artic.edu/api/v1/ to variable de entorno
//
class ServiceArtistApi{
    private articApi: ApiProvider;
    private params:Record<string, any>
   
    constructor() {
        this.params = {fields: 'id,title,artist_display,image_id,main_reference_number,description,term_titles'};
        this.articApi = new ApiProvider('https://api.artic.edu/api/v1/');
      } 

      async getDetailArt(idDetail:String): Promise<DetailApiResponse> {
          const data: DetailApiResponse = await this.articApi.getWithParams<DetailApiResponse>(`artworks/${idDetail}`, this.params);
          return data; 
        
      }

      async getListArts(page: string): Promise<ListApiResponse> {
          const paramsWithPage = { ...this.params, page:page };
          const data = await this.articApi.getWithParams<ListApiResponse>('artworks', paramsWithPage);
          return data || [] ; 
      }
}


export default ServiceArtistApi