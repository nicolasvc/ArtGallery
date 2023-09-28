import { useState } from "react";
import { ArtModel } from "../services/server/models/ApiModel";
import RepositoryListArt from "../repository/RepositoryArt";
import { providesLocalDataSourceArt, providesRemoteDataSource } from "../di/ModuleDI";


const repositoryList = new RepositoryListArt(providesRemoteDataSource(),providesLocalDataSourceArt())

const useListArtRemote = () => {

    const [listArt, setListArt] = useState<ArtModel[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorRequest,setError] = useState<boolean>(false);
    const [errorMsg,setErrorMsg] = useState<string>("msgerrorgeneral");

    async function getListArt() {
        setError(false)
        setLoading(true)
        let response = await repositoryList.getArtList(page.toString())
        if(response.isSuccess()){
            setListArt(response.getData()?.data || [])
        }else{
            setErrorMsg(response.getError()?.message|| "msgerrorgeneral")
            setError(true)
        }
        setLoading(false)
    }

    async function getMoreData() {
        setLoading(true);
        let newPager = page + 1;
        const response = await repositoryList.getArtList(newPager.toString());
        if(response.isSuccess()){
            const detailData = response.getData()?.data || [];
            if (response.getData() && detailData.length > 0 ) {
                setListArt((prevData) => [...prevData, ...detailData]);
                setPage(newPager);
            }
        }else{
            setErrorMsg(response.getError()?.message|| "msgerrorgeneral")
            setError(true)
        }
        setLoading(false);
    }


    return { listArt, loading,errorRequest,errorMsg,setError, getListArt, getMoreData }
}

export default useListArtRemote

