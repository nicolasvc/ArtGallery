import { ArtModel } from "../../services/server/models/ApiModel";
import React, { useState, useEffect } from 'react';
import { GetFavoriteArt } from "../../services/database/DbProvider";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import ImageWithFallback from "../../components/atoms/ImageFallBack";
import { getUrl } from "../../utils/Utils";
import styles from "./styles";


class MyState {
  constructor(public loading: boolean = false, public data: ArtModel[] | null = null) { }
}

const initialState = new MyState();

function FavoriteListScreen({ navigation }) {

  const [state, setState] = useState(initialState);
  const updateData = (data: ArtModel[] | null) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  const getFavoriteArt = async () => {
    const listFavorite = await GetFavoriteArt()
    updateData(listFavorite)
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoriteArt();
    });
    return unsubscribe;
  }, [navigation]);

  const handleTextPress = (item: ArtModel) => {
    navigation.navigate('Details', {
      itemId: item.id,
    })
  };
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
                onPress={() => {handleTextPress(item)}}
              />
              <Text style={styles.itemCard}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {state.loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

export default FavoriteListScreen