import { logger } from "react-native-logs";

export const getUrl = (imageId: string | null): string | null => {
  if (imageId === null) {
    return null
  } else {
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

export function validateUrl(imageId: string | null): string {
 
  return imageId !== null ? `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg` : "https://img.freepik.com/free-photo/dark-gray-wall-with-row-spotlights-empty-room_53876-74618.jpg?w=996&t=st=1695321214~exp=1695321814~hmac=f71d46687d4d0f6a018c91abffb412abcb7050354e65bee35c2e29dec4d7f2bd";
}


export enum INFO_ART {
  ADD_FAVORITE, DELETE_FAVORITE
}

interface InfoArtFactory {
  getMessageInfo: (type: INFO_ART) => string;
}

export const InfoArtFactory: InfoArtFactory = {

  getMessageInfo: (type) => {
    switch (type) {
      case INFO_ART.ADD_FAVORITE:
        return  'Art add to favorites.';

      case INFO_ART.DELETE_FAVORITE:
        return 'Art remove from favorites.';
    }
  },
};




