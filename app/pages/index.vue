<script setup lang="ts">
import type { Product } from "../../types/product";
const products = ref<Product[]>([]);
const query = ref("");
const selectedCategory = ref("all");

//getting categories
const { data: categories } = await useFetch<{ category: String[] }>(
  "/api/products/types"
);

//getting all products
const { data, pending, error } = await useFetch<Product[]>("/api/products");
products.value = data.value ?? [];

//generate search params from user-input
const searchParams = computed(() =>
  buildSearchParams(query.value, selectedCategory.value)
);

//search items after user selection
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
  <div
    class="w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 mb-10 pt-10"
  >
    <input
      class="border border-blue-500 p-2 rounded"
      type="text"
      v-model="query"
      placeholder="Search products..."
    />

    <select
      v-model="selectedCategory"
      class="border border-blue-500 px-3 py-2 rounded"
    >
      <option value="all">all</option>
      <ClientOnly>
        <option
          v-for="category in categories?.category"
          :key="category.toString()"
          :value="category"
        >
          {{ category }}
        </option>
      </ClientOnly>
    </select>
    <button
      class="cursor-pointer bg-blue-900 text-white px-3 py-2 rounded-md"
      @click="queryItems"
    >
      Search
    </button>
  </div>

  <div v-if="pending" class="text-center">Loading...</div>
  <div v-else-if="error" class="text-center text-red-500">
    <p>No Products found</p>
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
