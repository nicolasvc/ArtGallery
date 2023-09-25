import IServiceArtGallery from "../../../services/server/IServiceArtGallery";
import { DetailApiResponse, ListApiResponse } from "../../../services/server/models/ApiModel";
import ApiResult from "../../../services/server/utils/Response";
import IRemoteDataSource from "../DataSource/IRemoteDataSource";


export class RemoteDataSourceImpl implements IRemoteDataSource{

    private service: IServiceArtGallery;

    constructor(service: IServiceArtGallery) {
    this.service = service;
    }
    async getDetailArt(id: number): Promise<ApiResult<DetailApiResponse>> {
       return await this.service.getDetailArt(id.toString())
    }

    async getListArt(page: string):Promise<ApiResult<ListApiResponse>>  {
        return await this.service.getListArts(page)
    }
    
}