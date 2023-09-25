import { useState } from "react";
import { providesLocalDataSourceArt, providesRemoteDataSource } from "../di/ModuleDI"
import RepositoryArt from "../repository/RepositoryArt"
import { ArtModel } from "../services/server/models/ApiModel";


const repositoryArt = new RepositoryArt(providesRemoteDataSource(),providesLocalDataSourceArt())

const useFavoriteArt = () =>{

    const [loading, setLoading] = useState<boolean>(false);
    const [listArt, setListArt] = useState<ArtModel[]>([]);

    async function getListFavorite(){
        let listFav = await repositoryArt.getListFavoriteArt()
        setListArt(listFav)
    }

    return {loading,listArt,getListFavorite}

}

export default useFavoriteArt