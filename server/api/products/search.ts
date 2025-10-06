import { prisma } from "../../utils/prisma";
export default defineEventHandler(async (event) => {
  const queries = getQuery(event);

  const { item, category } = queries;

  const where: any = {};

  if (item) {
    where.title = {
      contains: item,
      mode: "insensitive",
    };
  }

  if (category && category !== "all") {
    where.type = category;
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products");
    throw createError({
      statusCode: 500,
      message: "Error searching products",
    });
  }
});
