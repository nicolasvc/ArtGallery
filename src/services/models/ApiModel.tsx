interface ApiResponse {
    config: {
      iiif_url: string;
      website_url: string;
    };
    info: {
      license_links: string[];
      license_text: string;
      version: string;
    };
  }


export interface ArtModel {
    id: number;
    title: string;
    main_reference_number: string;
    artist_display: string;
    image_id: string;
}

export interface DetailApiResponse extends ApiResponse {
    data: ArtModel;
  }
  
export  interface ListApiResponse extends ApiResponse {
    data: ArtModel[];
  }
