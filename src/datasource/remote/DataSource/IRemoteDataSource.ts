import { DetailApiResponse, ListApiResponse } from "../../../services/server/models/ApiModel";
import ApiResult from "../../../services/server/utils/Response";

export default interface IRemoteDataSource{

    getListArt(page: string):Promise<ApiResult<ListApiResponse>> 

    getDetailArt(id:number): Promise<ApiResult<DetailApiResponse>>

}