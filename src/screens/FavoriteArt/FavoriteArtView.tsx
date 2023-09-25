import { ArtModel } from "../../services/server/models/ApiModel";
import React, { useEffect } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import styles from "./styles";
import AnimateWrapper from "../../components/molecules/AnimatedWrapper";
import useFavoriteArt from "../../hooks/useFavoriteArt";
import CardViewArt from "../../components/molecules/cardview";




function FavoriteListScreen({ navigation }) {

  const useFavorite = useFavoriteArt()


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      useFavorite.getListFavorite();
    });
    return unsubscribe;
  }, [navigation]);

  const handleItemPress = (item: ArtModel) => {
    navigation.navigate('Details', {
      itemId: item.id,
    })
  };
  return (
    <View style={styles.container}>
      <AnimateWrapper showAnimation={(useFavorite.listArt?.length ?? 0) === 0}>
        <FlatList
          data={useFavorite.listArt}
          renderItem={({ item }) => (
            <CardViewArt
              item={item}
              handleClick={handleItemPress}
            />
          )}
        />
      </AnimateWrapper>
      {useFavorite.loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

export default FavoriteListScreen