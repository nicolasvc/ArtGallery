import { View, Text, Button } from 'react-native';
import React, { useState,useEffect } from 'react';
import { ArtModel } from '../../services/server/models/ApiModel';
import ServiceArtistApi from '../../services/server/ServiceArtGallery';
import styles from './styles';
import ImageWithFallback from '../../components/atoms/ImageFallBack';
import { getUrl } from '../../utils/Utils';
import { SaveArt } from '../../services/database/DbProvider';


class MyState {
  constructor(public loading: boolean = false, public data: ArtModel | null = null) {}
}

const initialState = new MyState();


function HelloDetail({ route }) {
  const { itemId } = route.params;
  const [state, setState] = useState(initialState);
  const service = new ServiceArtistApi();

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  const updateData = (data: ArtModel | null) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  const saveFavorite = () => {
    if(state.data !== null)
      SaveArt(state.data)
  }

  const getDetailArt = async () => {
    updateLoading(true);
    try {
      const artwork  = await service.getDetailArt(itemId);
      updateData(artwork.data);
    } catch (error) {
     //TODO HANDLE ERROR
    } finally {
      updateLoading(false);
    }
  };

  useEffect(() => {
    getDetailArt();
  }, []);


    return (
      <View >
        <ImageWithFallback
          style={styles.image}
          resizeMode="cover"
          url={getUrl(state.data?.image_id)}
          defaultSource={require('../../assets/images/empty_image.jpg')}
        />
          <Text>ID: {state.data?.id}</Text>
          <Text>Título: {state.data?.title}</Text>
          <Text>Referencia: {state.data?.main_reference_number}</Text>
          <Text>Artista: {state.data?.artist_display}</Text>
          <Text>Imagen ID: {state.data?.image_id}</Text>
          <Button title='ClickMe' onPress={saveFavorite}/>
        </View>
      );
}

export default HelloDetail