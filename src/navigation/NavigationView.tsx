import HelloDetail from "../screens/DetailArt/DetailArtView";
import HelloFavorite from "../screens/FavoriteArt/FavoriteArtView";
import HelloWorld from "../screens/ListArt/ViewArtList";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeTabs(){
    return(
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
          })}>
            <Tab.Screen name='Overview' component={HelloWorld}/>
            <Tab.Screen name='Favorite' component={HelloFavorite}/>
      </Tab.Navigator>
    )
  }

export default function TabsApp(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="Details" component={HelloDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}