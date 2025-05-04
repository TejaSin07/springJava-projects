export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    current: number;
    original: number;
  };
  discount: number;
  imageUrl: string;
  images: string[];
  category: string;
  brand: string;
  ratings: {
    average: number;
    count: number;
  };
  specs: Record<string, string>;
  inStock: boolean;
  quantity?: number;
}