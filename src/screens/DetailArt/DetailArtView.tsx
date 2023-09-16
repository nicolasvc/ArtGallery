import { Image, View, Text } from 'react-native';
import React, { useState,useEffect } from 'react';
import { ArtModel } from '../../services/models/ApiModel';
import ServiceArtistApi from '../../services/ServiceArtGallery';
import styles from './styles';

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
           <Image
              source={{ uri: `https://www.artic.edu/iiif/2/${state.data?.image_id}/full/843,/0/default.jpg`}}
              resizeMode="cover"
              style={styles.image}
           />
          <Text>ID: {state.data?.id}</Text>
          <Text>Título: {state.data?.title}</Text>
          <Text>Referencia: {state.data?.main_reference_number}</Text>
          <Text>Artista: {state.data?.artist_display}</Text>
          <Text>Imagen ID: {state.data?.image_id}</Text>
        </View>
      );
}

export default HelloDetail