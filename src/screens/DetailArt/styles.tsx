import {  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  pagerView: {
    flex: 1, 
  },
  page: {
    flex: 1, 
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent', 
  },
  gradient: { 
    padding: 16, 
    height: '40%'
  },
  textInCorner: {
    position: 'absolute',
    top: 0, 
    right: 0, 
    padding: 10, 
  },
  textInCornerLeft: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    padding: 10, 
  },
  circularButton: {
    backgroundColor: 'white',
    borderRadius: 25, 
    width: 50, 
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const TagsStyles = {
  p: {
    color: 'white',
    fontSize: 16,
  },
  a: {
    color: 'green',
    textDecorationLine: 'underline',
  },
};

export default styles