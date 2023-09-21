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
  return imageId !== null ? `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg` : "https://img.freepik.com/free-photo/3d-render-grunge-interior-with-blank-pictures-spotlights_1048-6354.jpg?w=826&t=st=1695230377~exp=1695230977~hmac=c413e4cf8b13f7bc655c52dd884dc0d166ecca81e3e1d41d52924c6dd6062fc6";
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
        return 'Art add to favorites.';

      case INFO_ART.DELETE_FAVORITE:
        return 'Art remove from favorites.';
    }
  },
};


