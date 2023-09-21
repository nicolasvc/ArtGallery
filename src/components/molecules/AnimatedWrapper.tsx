import React from 'react';
import LottieView from "lottie-react-native";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

interface AnimatedWrapperProps {
    children: React.ReactNode;
    showAnimation: Boolean
}

const AnimateWrapper: React.FC<AnimatedWrapperProps> = ({ children, showAnimation }) => {

    console.log("wrapper",showAnimation)

    if (!showAnimation) return <>{children}</>

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
            <Text style={{textAlign:"center", fontFamily: "LibreBaskerville-Regular"}}>You dont have any favorite art, go to OverView and discovery your favorite art!</Text>
        </View>
    )
}


export default AnimateWrapper