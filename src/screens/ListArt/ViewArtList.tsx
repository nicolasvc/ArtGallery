import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import ServiceArtistApi from '../../services/server/ServiceArtGallery';
import React, { useState, useEffect } from 'react';
import { ArtModel } from '../../services/server/models/ApiModel';
import styles from './styles';
import ImageWithFallback from '../../components/atoms/ImageFallBack';
import { getUrl } from '../../utils/Utils';
import useExample from '../../hooks/useExample';


const initialState={
  loading:false,
  data:[]
}

interface ViewState{
  loading: boolean
  data: ArtModel[]
}

function ListArtScreen({ navigation }) {
  const service = new ServiceArtistApi();
  const [state, setState] = useState<ViewState>(initialState);
  const example = useExample()  

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  const [page, setPage] = useState(1);

  const updateData = (data: ArtModel[]) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  //TODO change name Const
  const handleTestAxios = async () => {
    updateLoading(true);
    try {
      const artwork = await service.getListArts(page.toString());
      updateData(artwork.data);
    } catch (error) {
      //TODO HANDLE ERROR
    } finally {
      updateLoading(false);
    }
  };
  //TODO validate correct handle
  const handleTextPress = (item: ArtModel) => {
    //example.setLoading(true)
    navigation.navigate('Details', {
    itemId: item.id,
    })
  };

  const getMoreData = async () => {
    updateLoading(true);
    let newPager = page + 1;
    const newData = await service.getListArts(newPager.toString());
    if (newData.data && newData.data.length > 0) {
      updateData([...(state.data || []), ...newData.data]);
      setPage(newPager);
    }
    updateLoading(false);
  };
  useEffect(() => {
    handleTestAxios();
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={()=>{getMoreData()}}
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