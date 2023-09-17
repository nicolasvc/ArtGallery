import { logger } from "react-native-logs";

export const getUrl = (imageId:string|null) :string |null =>{
    if(imageId === null){
      return null
    }else {
      return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`
    }
}

export const LogCustome = logger.createLogger({
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
      debug: "white",
    },
  },
});


