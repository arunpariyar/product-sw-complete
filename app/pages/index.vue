<script setup lang="ts">
import { ref } from "vue";

const { data: products, pending, error } = await useFetch("/api/products");
</script>
<template>
  <h1>Products</h1>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price }}
    </div>
  </div>
</template>
