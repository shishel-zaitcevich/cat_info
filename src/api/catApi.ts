import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

// export interface CatImage {
//   id: string;
//   url: string;
//   width: number;
//   height: number;
// }

export type CatBreed = {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  life_span: string;
  wikipedia_url: string;
};

export interface CatImage {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds: {
      description?: string;
      weight: {
          imperial: string;
          metric: string;
      };
      id: string;
      name: string;
      temperament: string;
      origin: string;
      country_codes: string;
      country_code: string;
      life_span: string;
      wikipedia_url: string;
  }[];
}

export const fetchCatImages = async (apiKey: string, limit = 10): Promise<CatImage[]> => {
  try {
    const response = await axios.get<CatImage[]>(`${BASE_URL}/images/search?limit=${limit}&has_breeds=1`, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (response.status === 200) {
      console.log('Данные успешно получены:', response.data);
      return response.data;
    } else {
      console.error(`Ошибка при загрузке данных: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error('Ошибка при запросе к API:', error);
    throw new Error('Не удалось загрузить данные.');
  }
};

const apiKey = import.meta.env.VITE_CAT_API_KEY || '';

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', apiKey);
      return headers;
    },
  }),
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    fetchCatImages: builder.query<CatImage[], number>({
      query: (limit = 10) => `images/search?limit=${limit}&has_breeds=1`,
    }),
    fetchCatByBreed: builder.query<CatImage[], string>({
      query: (breedId) => `images/search?breed_ids=${breedId}`,
    }),
  }),
});

export const { useFetchCatImagesQuery, useFetchCatByBreedQuery } = catApi;