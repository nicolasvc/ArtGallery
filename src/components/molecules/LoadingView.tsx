import React from 'react';
import LottieView from "lottie-react-native";
import { View, Text} from 'react-native';
import { useTranslation } from 'react-i18next';

interface LoadingProps {
    showLoading: Boolean
}

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fcfdf6',
    zIndex: 999, 
};


const LoadingView: React.FC<LoadingProps> = ({ showLoading }) => {
    const { t } = useTranslation();
    return (
        <View style={overlayStyle}>
            <LottieView
                source={require('../../assets/lottie_anim/animation_loading.json')}
                style={{ width: '80%', aspectRatio: 1 }}
                autoPlay
                loop
            />
            <Text style={{textAlign:"center", fontFamily: "Mooli-Regular"}}>{t('common:loading')}</Text>
        </View>
    )
}


export default LoadingView