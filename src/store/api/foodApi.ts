import { rootApiSlice } from "./rootApiSlice";

export interface Store {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  openingHours?: string;
  isOpen: boolean;
  storeType: string;
  rating: number;
  totalRatings: number;
  minOrderAmount: number;
  deliveryFee: number;
  estimatedDeliveryTime?: string;
  owner?: { id: string; firstName: string; avatarUrl?: string };
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  fileUrl?: string[];
  thumbnailUrl?: string;
  category: string;
  subCategory?: string;
  stock: number;
  isAvailable: boolean;
  isVeg: boolean;
  isBestseller: boolean;
  rating: number;
  storeId?: string;
}

export const foodApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get nearby stores/restaurants by city
    getNearbyRestaurants: builder.query<Store[], { city: string; storeType?: string }>({
      query: ({ city, storeType }) => ({
        url: "/stores/nearby",
        params: { city, storeType },
      }),
      providesTags: ["Stores"],
    }),

    // Get all stores with filters
    getStores: builder.query<Store[], { city?: string; storeType?: string; search?: string }>({
      query: (params) => ({ url: "/stores", params }),
      providesTags: ["Stores"],
    }),

    // Get store details
    getStoreDetails: builder.query<Store, string>({
      query: (id) => `/stores/${id}`,
      providesTags: ["Stores"],
    }),

    // Get products by store (menu)
    getStoreMenu: builder.query<Product[], string>({
      query: (storeId) => `/products/store/${storeId}`,
      providesTags: ["Products"],
    }),

    // Get all products with filters
    getProducts: builder.query<Product[], { category?: string; subCategory?: string; search?: string }>({
      query: (params) => ({ url: "/products", params }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetNearbyRestaurantsQuery,
  useGetStoresQuery,
  useGetStoreDetailsQuery,
  useGetStoreMenuQuery,
  useGetProductsQuery,
} = foodApi;
