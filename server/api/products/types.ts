import { Product } from "../../../types/product";
import { prisma } from "../../../server/utils/prisma";

export default defineEventHandler(async () => {
  try {
    let types = new Set();
    const products: Product[] = await prisma.product.findMany();

    products.forEach((product) => {
      types.add(product.type);
    });

    return {
      category: [...types],
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: error,
    });
  }
});
