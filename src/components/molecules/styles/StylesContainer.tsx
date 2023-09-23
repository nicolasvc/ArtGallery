import { StyleSheet } from 'react-native';
import { defaultSystemFonts } from 'react-native-render-html';

const styles = StyleSheet.create({
  gradient: {
    padding: 16,
    height: '40%'
  },
  container: {
    flexDirection: 'row', 
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
    fontFamily: "Mooli-Regular",
    color:'white',
    marginBottom:8
  },
});


export const TagsStyles = {
  body: {
      whiteSpace: 'normal',
      color: 'white',
      fontFamily: 'Mooli-Regular',
      fontSize: 16
      
  },
  p: {
      fontFamily: 'Mooli-Regular',
      fontSize: 16,
  },
  a: {
      color: 'green',
      fontFamily: 'Mooli-Regular',
  }
};
export const systemFonts = [...defaultSystemFonts, 'Mooli-Regular',];


export default styles