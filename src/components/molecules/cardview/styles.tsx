import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfdf6',
    },
    image: {
        width: '100%',
        height: 200,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#d6e8ce',
        borderRadius: 16,
        paddingBottom: 8
    },
    provence_text: { color: '#000000', marginHorizontal: 8, marginTop: 4, fontSize: 12, fontFamily: "IBMPlexSans-Italic" },
    thumbmail_text: { color: '#000000', marginHorizontal: 8, fontSize: 14, fontFamily: "IBMPlexSans-Italic" },
    title_card:{ color: '#000000', marginHorizontal: 8, fontSize: 22, fontFamily: "IBMPlexSans-SemiBolItalic" }
});

export default styles