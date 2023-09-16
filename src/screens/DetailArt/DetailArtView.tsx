import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp,ParamListBase } from '@react-navigation/native';



function HelloDetail({ route,navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
          <Button
            title="Go to Favorites"
            onPress={() => navigation.navigate('Favorite')}
          />
          <Button title="Update UI" onPress={() => navigation.setParams({itemId: Math.floor(Math.random() * 100)}) } />
          <Button title="Go back" onPress={() => navigation.goBack()} />
          <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
        </View>
      );
}

export default HelloDetail