import DetailArtView from "../screens/DetailArt/DetailArtView";
import FavoriteListScreen from "../screens/FavoriteArt/FavoriteArtView";
import ListArtScreen from "../screens/ListArt/ViewArtList";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName='Overview'
      screenOptions={({ route }) => ({
        headerStyle:{
          backgroundColor: '#53634e'
        },
        tabBarStyle:{
          backgroundColor: '#53634e'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home"

          if (route.name === 'Overview') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'favorite' : 'favorite-border';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#bcebef',
        tabBarInactiveTintColor: '#002202',
        headerShown: false
      })}>
      <Tab.Screen name='Overview' component={ListArtScreen} options={{ title: t('navigate:overview') }} />
      <Tab.Screen name='Favorite' component={FavoriteListScreen} options={{ title: t('navigate:favorite') }}/>
    </Tab.Navigator>
  )
}

export default function MainNavigator() {

  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerStyle:{ backgroundColor: '#53634e'},headerTintColor:'#bcebef'}} >
        <Stack.Screen name="Home" component={HomeNavigator}  />
        <Stack.Screen name="Details" component={DetailArtView} options={{ title: t('navigate:detail') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}