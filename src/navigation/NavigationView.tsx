import HelloDetail from "../screens/DetailArt/DetailArtView";
import HelloFavorite from "../screens/FavoriteArt/FavoriteArtView";
import HelloWorld from "../screens/ListArt/ViewArtList";
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { useRef, useState } from "react";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();





function HomeTabs() {
  return (
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
        headerShown: false
      })}>
      <Tab.Screen name='Overview' component={HelloWorld} />
      <Tab.Screen name='Favorite' component={HelloFavorite} />
    </Tab.Navigator>
  )
}

export default function TabsApp() {

  const buttonRef = useRef<LottieView>(null)

  const [isFavorite, setIsFavorite] = useState(false);
  const toggleAnimation = () => {
    if (isFavorite) {
      buttonRef.current?.play(0,0)
    } else {
      buttonRef.current?.play()
    }
    console.log(isFavorite)
    setIsFavorite(!isFavorite)
  }; 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Details" component={HelloDetail} options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleAnimation}>
              <LottieView
                ref={buttonRef}
                autoPlay={false}
                loop={false}
                style={{ width: 40, height: 40 }}
                source={require('../assets/animation_favorite.json')}
              />
            </TouchableOpacity>
          ),
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}