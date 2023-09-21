import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles/StylesContainer';

interface CustomComponentProps {
  customComponent: React.ReactNode; 
}

const CustomComponentWithGradient: React.FC<CustomComponentProps> = ({ customComponent }) => {
  return (
    <ScrollView style={{ marginTop: 16, marginBottom: 16 }} persistentScrollbar={true}>
        {customComponent}
      </ScrollView>
  );
};

export default CustomComponentWithGradient