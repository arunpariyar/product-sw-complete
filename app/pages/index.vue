<script setup lang="ts">
import type { Product } from "../../types/product";

const products = ref<Product[]>([]);
const query = ref("");
const selectedCategory = ref("all");

const {
  data: fetchedProducts,
  pending,
  error,
} = await useAsyncData<Product[]>("products", () => $fetch("/api/products"));
products.value = fetchedProducts.value ?? [];

const searchParams = computed(() =>
  buildSearchParams(query.value, selectedCategory.value)
);

const categories = computed(() =>
  extractCategories(products.value as Product[])
);

async function queryItems() {
  try {
    const searchResults = await $fetch<Product[]>(
      `/api/products/search?${searchParams.value}`
    );
    products.value = searchResults;
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}
</script>
<template>
  <div class="w-full flex justify-center items-center gap-5 mb-10 pt-10">
    <input
      class="border border-blue-500 p-2 rounded"
      type="text"
      v-model="query"
      placeholder="Search products..."
    />

    <select
      v-model="selectedCategory"
      class="border border-blue-500 p-2 rounded"
    >
      <option value="all">all</option>

      <option v-for="category in categories" key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <button @click="queryItems">Search</button>
  </div>

  <div v-if="pending" class="text-center">Loading...</div>
  <div v-else-if="error" class="text-center text-red-500">
    Error: {{ error.message }}
  </div>
  <div v-else>
    <div class="flex flex-wrap gap-5 justify-center">
      <div
        class="border border-blue-300 p-3 rounded w-60 text-center"
        v-for="product in products"
        :key="product.id"
      >
        <p class="font-semibold">{{ product.title }}</p>
        <p class="text-gray-600">€{{ product.price }}</p>
        <NuxtLink
          class="text-blue-600 hover:underline"
          :to="`/products/${product.id}`"
          >View</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
