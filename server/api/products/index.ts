import { prisma } from "../../utils/prisma";

export default defineEventHandler(async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: error,
    });
  }
});
