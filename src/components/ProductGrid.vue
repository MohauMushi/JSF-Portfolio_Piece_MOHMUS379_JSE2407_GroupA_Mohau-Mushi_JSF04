<template>
  <!-- Main container for the product grid -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <!-- Render a ProductCard component for each product in the products array -->
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";

/**
 * @property {Array} products - An array of product objects to be displayed in the grid.
 * @required
 */
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>
