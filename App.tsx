import HelloWorld from './src/screens/ListArt';
import HelloDetail from './src/screens/DetailArt/DetailArtView';
import HelloFavorite from './src/screens/FavoriteArt/FavoriteArtView';
import {
  useColorScheme,
} from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';



const Tab = createBottomTabNavigator();
const OverviewStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Overview'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "home"

            if (route.name === 'Overview') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'home' : 'home';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false
        })}
      >
        <Tab.Screen name='Overview'>
          {() => (
            <OverviewStack.Navigator initialRouteName='Home'>
              <OverviewStack.Screen name="Home" component={HelloWorld} options={{title:'Overview'}} />
              <OverviewStack.Screen name='Details' component={HelloDetail}/>
            </OverviewStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name='Favorite'>
          {()=> (
            <FavoriteStack.Navigator initialRouteName='Favorite'>
              <Tab.Screen name="Favorite" component={HelloFavorite} />
              <FavoriteStack.Screen name='Details'component={HelloDetail}/>
            </FavoriteStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;
