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
  data:Cat[]
}

export interface SubCategory {
  id: number;
  name: string;
  category_id: number;
  [key: string]: unknown;
}

export interface Listing {
  id: number;
  title: string;
  slug: string;
  total_price: number;
  available_stock: number;
  [key: string]: unknown;
}

export interface ListingsParams {
  category_id?: number;
  subcategory_id?: number;
  search?: string;
  sort?: 'sort_key' | 'total_price' | 'available_stock' | 'title';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
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

export const getSubCategories = async (id: number): Promise<SubCategory[]> => {
  const { data } = await axios.get<SubCategory[]>(
    `${API_URL}/categories/${id}/subcategories`,
    { headers }
  );
  console.log('the sub-categories: ', data)

  return data;
};

export const getListings = async (params?: ListingsParams): Promise<Listing[]> => {
  const { data } = await axios.get<Listing[]>(`${API_URL}/listings`, {
    headers,
    params,
  });
  return data;
};

export const getListingBySlug = async (slug: string): Promise<Listing> => {
  const { data } = await axios.get<Listing>(`${API_URL}/listings/${slug}`, {
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