import IDaoArt from "../../../../services/database/dao/art/IDaoArt";
import { ArtModel } from "../../../../services/server/models/ApiModel";
import ILocalDataSourceArt from "../DataSource/ILocalDataSourceArt";



export class LocalDataSourceArtImpl implements ILocalDataSourceArt {

    private daoArt: IDaoArt

    constructor(daoArt: IDaoArt) {
        this.daoArt = daoArt;
    }
    getListFavoriteArt(): Promise<ArtModel[]> {
        return this.daoArt.getListFavoriteArt()
        
    }
    getDetailArt(idArt: number): Promise<ArtModel | null> {
        return this.daoArt.getDetailArt(idArt)
    }
    saveArt(artModel: ArtModel): Promise<Boolean> {
        return this.daoArt.saveArt(artModel)
    }
    deleteArt(idArt: number): Promise<Boolean> {
        return this.daoArt.deleteArt(idArt)
    }
}