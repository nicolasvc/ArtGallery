import { View, ActivityIndicator, FlatList, Pressable, Text } from 'react-native';
import React, { useEffect } from 'react';
import { ArtModel } from '../../services/server/models/ApiModel';
import styles from './styles';
import useListArtRemote from '../../hooks/useListArtRemote';
import CardViewArt from '../../components/molecules/cardview/index';
import GenericErrorRequestView from '../../components/molecules/genericErrorRequest';



function ListArtScreen({ navigation }) {
  const useListArt = useListArtRemote()

  const handleItemPress = (item: ArtModel) => {
    navigation.navigate('Details', {
      itemId: item.id,
    })
  };

  useEffect(() => {
    useListArt.getListArt()
  }, []);

  const handleRequest = () => {
    useListArt.setError(false)
    useListArt.getListArt()
  }

  return (
    <View style={styles.container}>
      {useListArt.errorRequest && <GenericErrorRequestView handleClick={handleRequest} textError={useListArt.errorMsg} />}
      <FlatList
        onEndReached={() => { useListArt.getMoreData() }}
        data={useListArt.listArt}
        renderItem={({ item }) => (
          <CardViewArt
            item={item}
            handleClick={handleItemPress}
          />
        )}
      />
      {useListArt.loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

export default ListArtScreen;