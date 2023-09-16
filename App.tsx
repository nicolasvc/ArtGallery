import {
  useColorScheme,
} from 'react-native';

import * as React from 'react';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import TabsApp from './src/navigation/NavigationView';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <TabsApp/>
  );
}


export default App;
