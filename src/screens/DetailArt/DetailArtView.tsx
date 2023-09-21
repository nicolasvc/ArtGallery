import { View, Modal, ImageBackground, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ArtModel } from '../../services/server/models/ApiModel';
import ServiceArtistApi from '../../services/server/ServiceArtGallery';
import styles from './styles';
import { INFO_ART, InfoArtFactory, getUrl, validateUrl } from '../../utils/Utils';
import { SaveArt, DeleteFavoriteArt } from '../../services/database/DbProvider';
import ImageViewer from 'react-native-image-zoom-viewer';
import Snackbar from 'react-native-snackbar';
import { useWindowDimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ItemDescription } from '../../components/molecules/ViewDescription'
import TemplateArtText from '../../components/templates/TemplateTextArt';
import { GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


class MyState {
  constructor(
    public loading: boolean = false,
    public data: ArtModel | null = null,
    public listInfo: ItemDescription[] | null = null) { }
}

const initialState = new MyState();


function DetailArtView({ route }) {
  const { itemId } = route.params;
  const [state, setState] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const service = new ServiceArtistApi();
  const pagerRef = useRef<PagerView>(null);

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  const updateData = (data: ArtModel | null) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  const updateList = (listInfo: ItemDescription[]) => {
    setState((prevState) => ({ ...prevState, listInfo }));
  };

  const updateFavorite = (favorite: boolean) => {
    setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data!,
        favorite: favorite,
      },
    }));
  };


  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      pagerRef.current?.setPage(currentPage - 1); 
    }
  };

  const handleNext = () => {
    if (currentPage < (state.listInfo?.length ?? 0) - 1) {
      setCurrentPage(currentPage + 1);
      pagerRef.current?.setPage(currentPage + 1); 
    }
  };

  const showSnackbarWithAction = (enumInfo:INFO_ART ,actionFunction: () => void) => {
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

  const saveFavorite = () => {
    if (state.data !== null){
      SaveArt(state.data)
      updateFavorite(!state.data.favorite)
      showSnackbarWithAction(INFO_ART.ADD_FAVORITE, ()=> removeFavoriteArt())
    }
  }  

  const removeFavorite = () =>{
    if (state.data !== null){
      removeFavoriteArt()
      showSnackbarWithAction(INFO_ART.DELETE_FAVORITE,()=> saveFavorite())
    }
  }

  const validateActionFavorite = () =>{
    if (state.data !== null){
      if(state.data.favorite){
        removeFavorite()
      }else{
        saveFavorite()
      }

    }
   
  }

  const removeFavoriteArt = async () => {
    if (state.data !== null) {
      updateFavorite(!state.data.favorite)
      DeleteFavoriteArt(state.data.id)
    }
  }

  const getDetailArt = async () => {
    updateLoading(true);
    try {
      const artwork = await service.getDetailArt(itemId);
      let getDetail = createItemsFromArtModel(artwork.data)
      updateList(getDetail)
      updateData(artwork.data);
    } catch (error) {
    } finally {
      updateLoading(false);
    }
  };

  function createItemsFromArtModel(artModel: ArtModel): ItemDescription[] {
    const items: ItemDescription[] = [];

    if (artModel.title !== null) {
      items.push({ label: 'Título', value: artModel.title ,icon:"info-outline"});
    }

    if (artModel.artist_display !== null) {
      items.push({ label: 'Artista', value: artModel.artist_display,icon:"info-outline"});
    }

    if (artModel.description !== null) {
        items.push({ label: 'Descripcion', value: artModel.description,icon:"info-outline" });
    }

    return items;
  }
  useEffect(() => {
    getDetailArt();
  }, []);

  const addImage = (imageUrl: string) => {
    if (images.length === 0) {
      setImages([...images, { url: imageUrl }]);
    }
  };

  const validateOpenModal = () => {
    let urlImage = getUrl(state.data?.image_id || null)
    if (urlImage !== null) {
      addImage(urlImage)
      setModalVisible(true)
    }
  }
  const windowDimensions = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ImageViewer
          imageUrls={images}
          renderIndicator={() => <></>}
          enableSwipeDown={true}
          onSwipeDown={() => { setModalVisible(!modalVisible); }} />
      </Modal>
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: validateUrl(state.data?.image_id || null) }}>
        <View style={{ flex: 1 }}>
          <PagerView
            ref={pagerRef}
            style={styles.pagerView}
            initialPage={0}>
            {state.listInfo?.map((dataItem, index) => (
              <View key={index.toString()} style={styles.textContainer}>
                <TemplateArtText infoText={dataItem} handleEvent={{
                  handlePrev: (event: GestureResponderEvent) => {
                    handlePrev()
                  },
                  handleNext: (event: GestureResponderEvent) => {
                    handleNext()
                  },
                }} />
              </View>
            ))}
          </PagerView>
          <View style={styles.textInCorner}>
            <TouchableOpacity onPress={validateActionFavorite } style={styles.circularButton}>
              <Icon name={state.data?.favorite ?"favorite": "favorite-border"}  size={30} color={state?.data?.favorite? "#fa5252" : "#5e5e5e"} />
            </TouchableOpacity>
          </View>
          <View style={styles.textInCornerLeft}>
            <TouchableOpacity onPress={validateOpenModal} style={styles.circularButton}>
              <Icon name="fullscreen" size={35} color="#35a9db" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default DetailArtView