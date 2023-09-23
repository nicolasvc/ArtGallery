import React from 'react';
import { View, ScrollView } from 'react-native';

interface CustomComponentProps {
  customComponent: React.ReactNode; 
}

//TODO CHANGE Names
const CustomComponentWithGradient: React.FC<CustomComponentProps> = ({ customComponent }) => {
  return (
    <ScrollView style={{ marginTop: 16, marginBottom: 16 }} persistentScrollbar={true}>
        {customComponent}
    </ScrollView>
  );
};

export default CustomComponentWithGradient