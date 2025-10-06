import type { Product } from "~~/types/product";

export function buildSearchParams(query: string, category: string) {
  const params = new URLSearchParams();

  if (query) params.append("item", query);
  if (category) params.append("category", category);

  return params.toString();
}

export function extractCategories(product: Product[]) {
  const set = new Set<String>();
  product?.forEach((item) => set.add(item.type));

  return [...set];
}
