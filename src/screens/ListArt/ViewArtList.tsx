import { Button, View, Text,ActivityIndicator } from 'react-native';
import ServiceArtistApi from '../../services/ServiceArtGallery';
import React, { useState } from 'react';

class MyState {
  constructor(public loading: boolean = false, public data: string | null = null) {}
}

const initialState = new MyState();

function HelloWorld({ navigation }) {
  const service = new ServiceArtistApi();
  const [state, setState] = useState(initialState);

  const updateLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  const updateData = (data: string | null) => {
    setState((prevState) => ({ ...prevState, data }));
  };

  const handleTestAxios = async () => {
    updateLoading(true);
    try {
      const artwork  = await service.getDetailArt();
      updateData(artwork.data.artist_display);
    } catch (error) {
     //TODO HANDLE ERROR
    } finally {
      updateLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{state.data}</Text>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
      <Button title="Test axioss" onPress={handleTestAxios} />
      {state.loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

export default HelloWorld;