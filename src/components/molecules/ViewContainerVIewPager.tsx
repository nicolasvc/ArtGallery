
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



interface CustomComponentProps {
    customComponent: React.ReactNode;
    events?: HandlerEvents;
}

export interface HandlerEvents {
    handlePrev?: (event: GestureResponderEvent) => void;
    handleNext?: (event: GestureResponderEvent) => void;
    showNext: boolean;
    showPrev: boolean;
}


const ViewContainerViewPager: React.FC<CustomComponentProps> = ({ customComponent, events }) => {
    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)', 'transparent']}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                {events?.showPrev &&
                    <TouchableOpacity style={styles.button} onPress={events?.handlePrev}>
                        <Icon name="arrow-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>}
                <View style={[styles.customComponentContainer, events?.showPrev === false ? { marginLeft: 24 } : {}]}>
                    {customComponent}
                </View>
                {events?.showNext && 
                <TouchableOpacity style={styles.button} onPress={events?.handleNext}>
                    <Icon name="arrow-right" size={24} color="#FFFFFF" />
                </TouchableOpacity>}
            </View>
        </LinearGradient>
    )
}

export default ViewContainerViewPager


const styles = StyleSheet.create({
    container: {
        maxHeight: '40%',
        justifyContent: 'center',
        borderRadius: 16
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 40
    },
    customComponentContainer: {
        flex: 1,
    },
});