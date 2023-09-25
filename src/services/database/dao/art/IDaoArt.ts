import { ArtModel } from "../../../server/models/ApiModel"

export default interface IDaoArt{

    getListFavoriteArt(): Promise<ArtModel[]>

    getDetailArt(idArt: number): Promise<ArtModel | null>

    saveArt(artModel: ArtModel):Promise<Boolean>

    deleteArt(idArt: number):Promise<Boolean>

}