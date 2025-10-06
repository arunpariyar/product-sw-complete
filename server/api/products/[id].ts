import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const productId = event.context.params ? event.context.params.id : null;

  if (productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  }

  throw new Error("Product cannot be found");
});
