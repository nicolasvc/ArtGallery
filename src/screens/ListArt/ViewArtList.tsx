import { Button, View, Text,ActivityIndicator,FlatList,TouchableOpacity,Image} from 'react-native';
import ServiceArtistApi from '../../services/ServiceArtGallery';
import React, { useState,useEffect } from 'react';
import { ArtModel } from '../../services/models/ApiModel';
import styles from './styles';

class MyState {
  constructor(public loading: boolean = false, public data: ArtModel[] | null = null) {}
}

const initialState = new MyState();

function HelloWorld({ navigation }) {
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
      const artwork  = await service.getListArts();
      updateData(artwork.data);
    } catch (error) {
     //TODO HANDLE ERROR
    } finally {
      updateLoading(false);
    }
  };

  const handleTextPress = (item:ArtModel) => {
    navigation.navigate('Details', {
      itemId: item.id,
    })
  };

  useEffect(() => {
    handleTestAxios();
  }, []);


  return (
    <View style = {styles.container}>
      <FlatList
         data={state.data}
         renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleTextPress(item)}>
                  <Image
                    source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text>{item.title}</Text>
              </TouchableOpacity>
               )}
      />
      {state.loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

export default HelloWorld;