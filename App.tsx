import React, { useEffect } from 'react';
import MainNavigator from './src/navigation/NavigationView';
import DbProvider from './src/services/database/DbProvider';
import messaging from '@react-native-firebase/messaging';
import NotificationProvider from './src/notification/NotificationProvider';

const dbProvider = new DbProvider()
const notificationProvider = new NotificationProvider()

function App(): JSX.Element {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      notificationProvider.showNotification(remoteMessage)
    });
    dbProvider.createTables()
    return unsubscribe;
  }, []);
  
  return (
    <MainNavigator />
  );
}


export default App;


