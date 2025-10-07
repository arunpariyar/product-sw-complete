<script setup lang="ts">
import type { Product } from "~/generated/prisma";
import { useRoute, useFetch } from "#app";
import generateImageUrl from "~/utils/generateImageLink";

const route = useRoute();
const productId = route.params.id as string;

const { data: product } = await useFetch<Product>(`/api/products/${productId}`);
</script>

<template>
  <div class="p-5" v-if="product ">
    <div>
      <NuxtLink class="uppercase text-md" to="/">&#8592 back</NuxtLink>
      <p class=" text-blue-500 py-5 text-lg uppercase tracking-wide">{{ product.title }}</p>
    </div>
    <div class="rounded-xl">
      <img
        :src="generateImageUrl(product.filename)"
        :alt="product.description"
      />
    </div>

    <p class="bg-blue-300 inline-block p-1.5 my-3 rounded-md">{{ product.type }}</p>
    <div>
      <span v-for="i in 5" :key="i" class="text-yellow-400">
      {{ i <= product.rating ? '★' : '☆' }}
      </span>
    </div>
    <p class="my-1 font-light w-50% text-wrap">{{ product.description }}</p>
    <p>€{{ product.price }}</p>

     
  </div>
   
  <div v-else>Product {{ productId }} not found</div>
</template>
