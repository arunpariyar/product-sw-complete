<script setup lang="ts">
import type { Product } from "~/generated/prisma";
import { useRoute, useFetch } from "#app";
import generateImageUrl from "~/utils/generateImageLink";

const route = useRoute();
const productId = route.params.id as string;

const { data: product } = await useFetch<Product>(`/api/products/${productId}`);
</script>

<template>
  <div v-if="product">
    <div>
      <NuxtLink to="/">back</NuxtLink>
      <p>{{ product.title }}</p>
    </div>
    <div>
      <img
        :src="generateImageUrl(product.filename)"
        :alt="product.description"
      />
    </div>
    <p>{{ product.type }}</p>
    <p>{{ product.description }}</p>
    <p>{{ product.rating }}</p>
    <p>€{{ product.price }}</p>
  </div>
  <div v-else>Product {{ productId }} not found</div>
</template>
