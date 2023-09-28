import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fcfdf6',
        zIndex: 999, 
    },
    lottie: {
    width: '80%', aspectRatio: 1
},
    item: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#d6e8ce',
    borderRadius: 16,
    paddingBottom: 8
},
    buttonText: {
    color: 'black',
    fontFamily: "IBMPlexSans-SemiBolItalic"
},
});

export default styles