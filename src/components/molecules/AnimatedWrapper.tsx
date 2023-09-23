import React from 'react';
import LottieView from "lottie-react-native";
import { View, Text} from 'react-native';
import { useTranslation } from 'react-i18next';

interface AnimatedWrapperProps {
    children: React.ReactNode;
    showAnimation: Boolean
}

const AnimateWrapper: React.FC<AnimatedWrapperProps> = ({ children, showAnimation }) => {
    const { t } = useTranslation();
    if (!showAnimation) return <>{children}</>
    //TODO Mover styles 
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30%'
            }}>
            <LottieView
                source={require('../../assets/animation_lmsfwgd1.json')}
                style={{ width: '80%', aspectRatio: 1 }}
                autoPlay
                loop
            />
            <Text style={{textAlign:"center", fontFamily: "Mooli-Regular"}}>{t('common:emptyfavorite')}</Text>
        </View>
    )
}


export default AnimateWrapper