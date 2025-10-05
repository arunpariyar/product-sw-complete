// prisma/seed.ts
import { PrismaClient } from "../app/generated/prisma/index.js"; // <-- adjust relative path

const prisma = new PrismaClient();

import type { ProductCreateInput } from "../types/product";

const url =
  "https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json";

function sanitizeString(str: string): string {
  return str.replace(/\0/g, ""); // remove null bytes
}

async function main() {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch date from url");

  const products: ProductCreateInput[] = await response.json();

  const prismaData: ProductCreateInput[] = products.map((p) => ({
    title: sanitizeString(p.title),
    type: sanitizeString(p.type),
    description: sanitizeString(p.description),
    filename: sanitizeString(p.filename),
    height: Number(p.height),
    width: Number(p.width),
    price: Number(p.price),
    rating: Number(p.rating),
  }));
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: prismaData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Database seeded successfully 🌱");
  });
