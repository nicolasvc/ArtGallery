import React from 'react';
import { Image, ImageURISource ,ImageProps,TouchableOpacity,GestureResponderEvent} from 'react-native';


interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
    url: string | null;
    defaultSource: ImageURISource;
    onPress?: (event: GestureResponderEvent) => void; 
  }
  
  const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ url, defaultSource,onPress, ...props }) => {
    const renderImage = (source: any) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <Image source={source} {...props} />
        </TouchableOpacity>
      );
    };
  
    if (url) {
      return renderImage({ uri: url });
    } else {
      return renderImage(defaultSource);
    }
  };


  
  export default ImageWithFallback;
