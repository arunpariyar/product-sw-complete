export interface Product {
  id: string;
  title: string;
  type: string;
  description: string;
  filename: string;
  height: number;
  width: number;
  price: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

// For seeding / creation input
export type ProductCreateInput = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>;
