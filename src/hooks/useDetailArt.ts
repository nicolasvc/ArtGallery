import { useEffect, useRef, useState } from 'react';
import DaoArt from '../services/database/dao/art/DaoArt';
import ServiceArtistApi from '../services/server/ServiceArtGallery';
import { ArtModel } from '../services/server/models/ApiModel';
import { ItemDescription } from '../components/molecules/ViewDescription';
import { INFO_ART, InfoArtFactory, validateUrl } from '../utils/Utils';
import Snackbar from 'react-native-snackbar';
import PagerView from 'react-native-pager-view';
import { providesLocalDataSourceArt, providesRemoteDataSource } from '../di/ModuleDI';
import RepositoryArt from '../repository/RepositoryArt';


const repositoryArt = new RepositoryArt(providesRemoteDataSource(),providesLocalDataSourceArt())

const useDetailArt = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [artDetail, setDetail] = useState<ArtModel | null>(null);
    const [itemDescription, setDescription] = useState<ItemDescription[]>([])
    const [favorite, setFavorite] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState<{ url: string }[]>([]);
    const pagerRef = useRef<PagerView>(null);


    useEffect(() => { addImage(),getDescriptionArt(),validateFavDetail() }, [artDetail])

    async function getDetail(idArt: number) {
        setLoading(true)
        let artDetail = await repositoryArt.getDetailArt(idArt)
        setDetail(artDetail)
        setLoading(false)
    }

    function validateFavDetail(){
        setFavorite(artDetail?.favorite ?? false)
    }

    function addImage(){
        if (artDetail?.image_id !== undefined && images.length === 0) { 
            let urlImage =  validateUrl(artDetail?.image_id || null)
            setImages([{ url: urlImage }]);
          }
    }

    function getDescriptionArt() {
        if (artDetail !== null) {
            let itemDescription = createItemsFromArtModel(artDetail)
            setDescription(itemDescription)
        }
    }

    function createItemsFromArtModel(artModel: ArtModel): ItemDescription[] {
        const items: ItemDescription[] = [];

        if (artModel.title !== null) {
            items.push({ label: 'title', value: artModel.title, icon: "info-outline" });
        }

        if (artModel.artist_display !== null) {
            items.push({ label: 'artist', value: artModel.artist_display, icon: "info-outline" });
        }

        if (artModel.description !== null) {
            items.push({ label: 'description', value: artModel.description, icon: "info-outline" });
        }
        if (artModel.term_titles !== null) {
            const value = artModel.term_titles.map(item => `<li type="disc">${item}.</li>`)
            const htmlList = `<ul>${value.join('')}</ul>`;
            items.push({ label: 'termtitle', value: htmlList, icon: "info-outline" });
        }
        if (artModel.provenance_text !== null) {
            items.push({ label: 'provenance', value: artModel.provenance_text, icon: "info-outline" });
        }

        if (artModel.thumbnail?.alt_text !== null) {
            items.push({ label: 'thumbnail', value: artModel.thumbnail?.alt_text||"No data", icon: "info-outline" });
        }

        return items;
    }

    function validateActionFavorite() {
        if (artDetail !== null) {
            if (favorite) {
                removeFavorite()
            } else {
                saveFavorite()
            }
        }
    }

    const removeFavorite = () => {
        removeFavoriteArt()
        showSnackbarWithAction(INFO_ART.DELETE_FAVORITE, () => saveFavorite())
    }

    const saveFavorite = async () => {
        if (artDetail !== null) {
            const responseSave= await repositoryArt.saveArt(artDetail)
            console.log("res",responseSave)
            setFavorite(true)
            showSnackbarWithAction(INFO_ART.ADD_FAVORITE, () => removeFavoriteArt())
        }
    }

    const showSnackbarWithAction = (enumInfo: INFO_ART, actionFunction: () => void) => {
        Snackbar.show({
            text: InfoArtFactory.getMessageInfo(enumInfo),
            duration: Snackbar.LENGTH_SHORT,
            action: {
                text: 'UNDO',
                textColor: 'green',
                onPress: () => {
                    actionFunction();
                },
            },
        });
    };

    const removeFavoriteArt = async () => {
        if (artDetail !== null) {
            setFavorite(false)
            repositoryArt.deleteArt(artDetail.id)
        }
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            pagerRef.current?.setPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < (itemDescription?.length ?? 0) - 1) {
            setCurrentPage(currentPage + 1);
            pagerRef.current?.setPage(currentPage + 1);
        }
    };

    return {
        loading,
        artDetail,
        itemDescription,
        favorite,
        currentPage,
        pagerRef,
        modalVisible,
        images,
        setModalVisible,
        handlePrev,
        handleNext,
        setCurrentPage,
        getDetail,
        validateActionFavorite
    }

}

export default useDetailArt