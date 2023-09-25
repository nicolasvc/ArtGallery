import ILocalDataSourceArt from "../datasource/local/art/DataSource/ILocalDataSourceArt"
import IRemoteDataSource from "../datasource/remote/DataSource/IRemoteDataSource"
import { LocalDataSourceArtImpl } from "../datasource/local/art/DataSourceImpl/LocalDataSourceArtImpl"
import DaoArt from "../services/database/dao/art/DaoArt"
import IDaoArt from "../services/database/dao/art/IDaoArt"
import IServiceArtGallery from "../services/server/IServiceArtGallery"
import ServiceArtistApi from "../services/server/ServiceArtGallery"
import { RemoteDataSourceImpl } from "../datasource/remote/DataSourceImpl/RemoteDataSourceImpl"


function providesIServiceGallery():IServiceArtGallery{
    return new ServiceArtistApi()
}

function providesIDaoArt():IDaoArt{
    return new DaoArt()
}


export function providesRemoteDataSource():IRemoteDataSource {

    return new RemoteDataSourceImpl(providesIServiceGallery())
}

export function providesLocalDataSourceArt():ILocalDataSourceArt{
    return new LocalDataSourceArtImpl(providesIDaoArt())
}