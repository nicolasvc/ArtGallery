import { View, Text, Button, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ArtModel } from '../../services/server/models/ApiModel';
import ServiceArtistApi from '../../services/server/ServiceArtGallery';
import styles from './styles';
import ImageWithFallback from '../../components/atoms/ImageFallBack';
import { getUrl } from '../../utils/Utils';
import { SaveArt ,DeleteFavoriteArt} from '../../services/database/DbProvider';
import ImageViewer from 'react-native-image-zoom-viewer';
import Snackbar from 'react-native-snackbar';


class MyState {
  constructor(public loading: boolean = false, public data: ArtModel | null = null) { }
}

const initialState = new MyState();


function DetailArtView({ route }) {
  const { itemId } = route.params;
  const [state, setState] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const service = new ServiceArtistApi();

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  const updateData = (data: ArtModel | null) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  const saveFavorite = () => {
    if (state.data !== null)
      SaveArt(state.data)
      Snackbar.show({
        text: 'Art add to favorites.',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'UNDO',
          textColor: 'green',
          onPress: () => { removeFavoriteArt() },
        },
      });
  }

  const removeFavoriteArt = async () => {
    if (state.data !== null){
      let deleteArt = await DeleteFavoriteArt(state.data.id)
      console.log(deleteArt)
    }
    
  }

  const getDetailArt = async () => {
    updateLoading(true);
    try {
      const artwork = await service.getDetailArt(itemId);
      updateData(artwork.data);
    } catch (error) {
    } finally {
      updateLoading(false);
    }
  };

  useEffect(() => {
    getDetailArt();
  }, []);

  const addImage = (imageUrl:string) => {
    if (images.length === 0) { 
      setImages([...images, { url: imageUrl }]);
    }
  };

  const validateOpenModal = () =>{
    let urlImage = getUrl(state.data?.image_id || null)
    if(urlImage !== null){
        addImage(urlImage)
        setModalVisible(true)
    }
  }

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
            <ImageViewer 
             imageUrls={images}
             renderIndicator={()=> null}
             enableSwipeDown={true} 
             onSwipeDown={()=>{setModalVisible(!modalVisible);}}/>
        </Modal>

      <ImageWithFallback
        style={styles.image}
        url={getUrl(state.data?.image_id || null)}
        defaultSource={require('../../assets/images/empty_image.jpg')}
        onPress={() =>
          validateOpenModal()
        }
      />
      <Text>ID: {state.data?.id}</Text>
      <Text>Título: {state.data?.title}</Text>
      <Text>Referencia: {state.data?.main_reference_number}</Text>
      <Text>Artista: {state.data?.artist_display}</Text>
      <Text>Imagen ID: {state.data?.image_id}</Text>
      <Button title='ClickMe' onPress={saveFavorite} />
    </View>
  );
}

export default DetailArtView