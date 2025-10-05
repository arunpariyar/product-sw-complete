import { prisma } from "../../utils/prisma";

export default defineEventHandler(async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    // Log the error for debugging
    console.error("Failed to fetch products:", error);

    // Return a proper error response
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: error,
    });
  }
});
