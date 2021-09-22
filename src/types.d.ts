interface Product {
  name: string;
  description: string;
  images: ProductImage[];
  madeIn?: string;
  stock: number;
  points: number;
  offerPoints?: number;
}

interface ProductImage {
  url: string;
}

interface Voucher {
  name: string;
  description: string;
  images: ProductImage[];
  stock: number;
  points: number;
  savingPercentage?: number;
}
