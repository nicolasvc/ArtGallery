import { ArtModel } from "../../../../services/server/models/ApiModel";

export default interface ILocalDataSourceArt{


    getListFavoriteArt(): Promise<ArtModel[]>

    getDetailArt(idArt: number): Promise<ArtModel | null>

    saveArt(artModel: ArtModel):Promise<Boolean>

    deleteArt(idArt: number):Promise<Boolean>
}