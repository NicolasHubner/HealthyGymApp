import { ApiPaginationResponse } from '../pagination/Pagination';

interface ImageFormat {
    [key: string]: {
      alternativeText: string | null;
      caption: string | null;
      createdAt: string;
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    };
  }
interface ImageData {
    attributes: {
      alternativeText: string | null;
      caption: string | null;
      createdAt: string;
      ext: string;
      formats: {
        large: ImageFormat;
        medium: ImageFormat;
        small: ImageFormat;
        thumbnail: ImageFormat;
      };
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    };
    id: number;
  }

export interface EvolutionPhotoHistory {
    id?: number | null;
    attributes?: {
        datetime?: string | null;
        side_photo?: {
            data: ImageData;
        }
        front_photo?: {
            data: ImageData;
        }
        back_photo?: {
            data: ImageData;
        }
        createdAt?: string | null;
        updatedAt?: string | null;
        publishedAt?: string | null;
        user?: {
            data?: {
                id?: number | null;
                attributes?: {
                    username?: string | null;
                    email?: string | null;
                    provider?: string | null;
                    confirmed?: boolean | null;
                    blocked?: boolean | null;
                    name?: string | null;
                    birthdate?: string | null;
                    gender?: string | null;
                    weight?: number | null;
                    height?: number | null;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                    goal_type?: string | null;
                    phone?: string | null;
                    is_coach?: boolean | null;
                };
            };
        };
    };
}

export interface EvolutionPhotoHistoryResponse {
    data?: EvolutionPhotoHistory[];
    meta?: ApiPaginationResponse;
}
