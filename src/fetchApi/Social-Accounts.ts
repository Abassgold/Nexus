import { Product } from '@/data/mockData';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_ACCS_ZONE_BASE_URL}`;
const API_KEY = `${process.env.NEXT_PUBLIC_ACCS_ZONE_API_KEY}`;

const headers = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json',
};

export type Cat = {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export interface Category {
  success: boolean;
  data: Cat[]
}


export type SubCat = {
  id: number;
  title: string;
  slug?: string;
}
export interface SubCategory {
  success: boolean;
  data: {
    category: SubCat,
    subcategories: SubCat[]
  }
}

export interface Listing {
  success: boolean;
  data: Product[];
}

export interface ListingDetail {
  id: number;
  title: string;
  slug: string;
  price: string;
  available_stock: number;
  sold: number;
  category: {
    id: number;
    title: string;
    slug: string;
  };
  subcategory: {
    id: number;
    title: string;
    slug: string;
  };
  description: string;
  supplier: {
    name: string;
  };
}
export interface ListingBySlug {
  success: boolean;
  data: ListingDetail;
}


export interface PurchasePayload {
  ad_id: number;
  quantity: number;
  promo_code?: string;
}

export interface PurchaseResult {
  success: boolean;
  accounts: string[];
  [key: string]: unknown;
}


export const getCategories = async (): Promise<Cat[]> => {
  const { data } = await axios.get<Category>(`${API_URL}/categories`, {
    headers,
  });
  console.log('the categories: ', data)
  return data.data;
};

export const getSubCategories = async (id: number): Promise<SubCat[]> => {
  const { data } = await axios.get<SubCategory>(
    `${API_URL}/categories/${id}/subcategories`,
    { headers }
  );
  console.log('the sub-categories: ', data)

  return data.data.subcategories;
};

export const getListings = async (category_id: number, subcategory_id: number): Promise<Product[]> => {
  const params = {
    category_id,
    subcategory_id,
  };

  const { data } = await axios.get<Listing>(`${API_URL}/listings`, {
    headers,
    params,
  });

  return data.data;
};

export const getListingBySlug = async (slug: string): Promise<ListingBySlug> => {
  const { data } = await axios.get<ListingBySlug>(`${API_URL}/listings/${slug}`, {
    headers,
  });
  return data;
};

export const purchase = async (payload: PurchasePayload): Promise<PurchaseResult> => {
  const { data } = await axios.post<PurchaseResult>(
    `${API_URL}/purchase`,
    payload,
    { headers }
  );
  return data;
};