import { StyleSheet } from 'react-native';
import { defaultSystemFonts } from 'react-native-render-html';

const styles = StyleSheet.create({
  gradient: {
    padding: 16,
    height: '40%'
  },
  container: {
    flexDirection: 'row', // Para colocar los elementos en una fila
    alignItems: 'center',
    height: '40%'
  },
  button: {
    marginHorizontal: 10,
  },
  customComponentContainer: {
    flex: 1,
  }
});


export const stylesText= StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "LibreBaskerville-Regular",
    color:'white',
    marginBottom:8
  },
});


export const TagsStyles = {
  body: {
      whiteSpace: 'normal',
      color: 'white',
      fontFamily: 'LibreBaskerville-Regular',
      fontSize: 16
      
  },
  p: {
      fontFamily: 'LibreBaskerville-Regular',
      fontSize: 16,
  },
  a: {
      color: 'green',
      fontFamily: 'LibreBaskerville-Regular',
  }
};
export const systemFonts = [...defaultSystemFonts, 'LibreBaskerville-Regular',];


export default styles