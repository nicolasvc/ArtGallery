import { DetailApiResponse, ListApiResponse } from "./models/ApiModel";
import ApiResult from "./utils/Response";

export default interface IServiceArtGallery {
    
    getDetailArt(idDetail:String): Promise<ApiResult<DetailApiResponse>>

    getListArts(page: string): Promise<ApiResult<ListApiResponse>> 
}