import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

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

interface Favourite {
  id: number;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}


interface FavouriteResponse {
  id: number;
  image_id: string;
  sub_id?: string;
  created_at: string;
}

export const fetchCatImages = async (apiKey: string, limit = 10): Promise<CatImage[]> => {
  try {
    const response = await axios.get<CatImage[]>(`${BASE_URL}/images/search?limit=${limit}&has_breeds=1&size=small`, {
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

  tagTypes: ["Favorite"],
  endpoints: (builder) => ({
    fetchCatImages: builder.query<CatImage[], number>({
      query: (limit = 10) => `images/search?limit=${limit}&has_breeds=1`,
    }),
    fetchCatByBreed: builder.query<CatImage[], string>({
      query: (breedId) => `images/search?breed_ids=${breedId}`,
    }),

  fetchFavorites: builder.query<Favourite[], { subId: string; page?: number; limit?: number }>({
    query: ({ subId, page = 1, limit = 10 }) =>
      `favourites?sub_id=${subId}&limit=${limit}&page=${page}&order=DESC`,
    providesTags: ["Favorite"],
  }),

  addToFavorites: builder.mutation<FavouriteResponse, { imageId: string; subId: string }>({
    query: ({ imageId, subId }) => ({
      url: "favourites",
      method: "POST",
      body: { image_id: imageId, sub_id: subId },
    }),
    invalidatesTags: ["Favorite"],
  }),

  removeFromFavorites: builder.mutation<void, { favouriteId: string }>({
    query: ({ favouriteId }) => ({
      url: `favourites/${favouriteId}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Favorite"],
  }),
}),
});

export const {
useFetchCatImagesQuery,
useFetchCatByBreedQuery,
useFetchFavoritesQuery,
useAddToFavoritesMutation,
useRemoveFromFavoritesMutation,
} = catApi;


