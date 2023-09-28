import React from 'react';
import LottieView from "lottie-react-native";
import { View, Text, GestureResponderEvent, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';


interface AnimatedWrapperProps {
    handleClick?: (event: GestureResponderEvent) => void;
    textError: string
}

const GenericErrorRequestView: React.FC<AnimatedWrapperProps> = ({ handleClick, textError }) => {
    const { t } = useTranslation();
    return (
        <View
            style={styles.container}>
            <LottieView
                source={require('../../../assets/lottie_anim/animation_bad_request.json')}
                style={styles.lottie}
                autoPlay
                loop
            />
            <Text style={{ textAlign: "center", fontFamily: "IBMPlexSans-SemiBolItalic", marginHorizontal: 16, fontSize: 16 }}>{t(`common:${textError}`)}</Text>
            <Pressable
                onPress={handleClick}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#a9d9bf' : '#d5e8cf',
                        padding: 8,
                        borderRadius: 8,
                        marginTop:16
                    },
                ]}>
                <Text style={styles.buttonText}>{t(`common:tryagain`)}</Text>
            </Pressable>


        </View>
    )
}


export default GenericErrorRequestView