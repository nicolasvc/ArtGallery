

import ApiProvider from './ApiProvider';
import IServiceArtGallery from './IServiceArtGallery';
import { DetailApiResponse, ListApiResponse } from './models/ApiModel';
import ApiResult from './utils/Response';
import {API_URL} from "@env"


class ServiceArtistApi implements IServiceArtGallery {
  private articApi: ApiProvider;
  private params: Record<string, any>

  constructor() {
    this.params = { fields: 'id,title,artist_display,image_id,main_reference_number,description,term_titles,thumbnail,provenance_text' };
    this.articApi = new ApiProvider(API_URL);
  }

  async getDetailArt(idDetail: String): Promise<ApiResult<DetailApiResponse>> {
      const data: ApiResult<DetailApiResponse> = await this.articApi.getWithParams<DetailApiResponse>(`artworks/${idDetail}`, this.params);
      return data;
  }

  async getListArts(page: string): Promise<ApiResult<ListApiResponse>> {
    const paramsWithPage = { ...this.params, page: page };
    const data = await this.articApi.getWithParams<ListApiResponse>('artworks', paramsWithPage);
    return data;
  }
}


export default ServiceArtistApi