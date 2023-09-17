import React from 'react';
import { Image, ImageURISource ,ImageProps} from 'react-native';


interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
    url: string | null;
    defaultSource: ImageURISource;
  }
  
  const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ url, defaultSource, ...props }) => {
    if (url) {
      return <Image source={{ uri: url }} {...props} />;
    } else {
      return <Image source={defaultSource} {...props} />;
    }
  };


  
  export default ImageWithFallback;
