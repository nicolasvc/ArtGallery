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
  pagination: Pagination
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null; 
}


export interface ArtModel {
  id: number;
  title: string;
  main_reference_number: string;
  artist_display: string;
  image_id: string | null;
  description: string | null;
  favorite: boolean
}

export interface DetailApiResponse extends ApiResponse {
  data: ArtModel;
}

export interface ListApiResponse extends ApiResponse {
  data: ArtModel[];
}
