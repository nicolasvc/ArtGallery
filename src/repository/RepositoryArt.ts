import ILocalDataSourceArt from "../datasource/local/art/DataSource/ILocalDataSourceArt";
import IRemoteDataSource from "../datasource/remote/DataSource/IRemoteDataSource";
import { ArtModel, ListApiResponse } from "../services/server/models/ApiModel";
import ApiResult from "../services/server/utils/Response";


export default class RepositoryArt {
    private remoteDataSource: IRemoteDataSource
    private localDataSourceArt:ILocalDataSourceArt


    constructor(remoteDataSource: IRemoteDataSource,localDataSourceArt:ILocalDataSourceArt) {
        this.remoteDataSource = remoteDataSource
        this.localDataSourceArt = localDataSourceArt
    }

    async getArtList(page: string): Promise<ApiResult<ListApiResponse>> {
        return await this.remoteDataSource.getListArt(page);
    }

    async getListFavoriteArt(): Promise<ArtModel[]>{
        return this.localDataSourceArt.getListFavoriteArt()
    }


    async getDetailArt(idArt: number): Promise<ArtModel | null>{
        const localArt = await this.localDataSourceArt.getDetailArt(idArt)
        if(localArt){
            return localArt
        }else{
            const detailApi = await this.remoteDataSource.getDetailArt(idArt);
            const detailData = detailApi.getData()?.data;
            return detailData || null;
        }
    }

    async saveArt(artModel: ArtModel):Promise<Boolean>{
        return await this.localDataSourceArt.saveArt(artModel)
    }

    async deleteArt(idArt: number):Promise<Boolean>{
        return await this.localDataSourceArt.deleteArt(idArt)   
    }


}