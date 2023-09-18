import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import ServiceArtistApi from '../../services/server/ServiceArtGallery';
import React, { useState, useEffect } from 'react';
import { ArtModel } from '../../services/server/models/ApiModel';
import styles from './styles';
import ImageWithFallback from '../../components/atoms/ImageFallBack';
import { getUrl } from '../../utils/Utils';

class MyState {
  constructor(public loading: boolean = false, public data: ArtModel[] | null = null) { }
}

const initialState = new MyState();

function ListArtScreen({ navigation }) {
  const service = new ServiceArtistApi();
  const [state, setState] = useState(initialState);

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  const updateData = (data: ArtModel[] | null) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  const handleTestAxios = async () => {
    updateLoading(true);
    try {
      const artwork = await service.getListArts();
      updateData(artwork.data);
    } catch (error) {
      //TODO HANDLE ERROR
    } finally {
      updateLoading(false);
    }
  };

  const handleTextPress = (item: ArtModel) => {
    navigation.navigate('Details', {
      itemId: item.id,
    })
  };

  useEffect(() => {
    handleTestAxios();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleTextPress(item)}>
            <ImageWithFallback
              style={styles.image}
              resizeMode="cover"
              url={getUrl(item?.image_id)}
              defaultSource={require('../../assets/images/empty_image.jpg')}
              onPress={() =>
                handleTextPress(item)
              }
            />
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {state.loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

export default ListArtScreen;