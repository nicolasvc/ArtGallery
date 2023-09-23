import {
  useColorScheme,
} from 'react-native';

import * as React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import MainNavigator from './src/navigation/NavigationView';
import DbProvider from './src/services/database/DbProvider';
import Config from 'react-native-config';

const SaveValue = async () => {
  try {
    await EncryptedStorage.setItem(
      "user_session",
      JSON.stringify({
        age: 21,
        token: "ACCESS_TOKEN",
        username: "emeraldsanto",
        languages: ["fr", "en", "de"]
      })
    );

  
  } catch (error) {
    
  }
}

const getValue = async () => {
  try {   
    const session = await EncryptedStorage.getItem("user_session");

    if (session !== undefined) {
      
    }
} catch (error) {
 
}
}

const dbProvider = new DbProvider()


function App(): JSX.Element {
  console.log("config",Config.REACT_APP_API_URL)
  SaveValue()
  getValue() 
  dbProvider.createTables()
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <MainNavigator />
  );
}


export default App;
