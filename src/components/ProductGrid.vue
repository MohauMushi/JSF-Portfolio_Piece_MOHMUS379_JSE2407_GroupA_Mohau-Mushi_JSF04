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

<script>
import ProductCard from "./ProductCard.vue";

/**
 * @module ProductGrid
 * @vue-component
 * @description A component that renders a grid of ProductCard components based on the provided products array.
 */
export default {
  name: "ProductGrid",
  components: {
    /**
     * @component ProductCard
     * @description Component used to display individual product information.
     */
    ProductCard,
  },
  props: {
    /**
     * @property {Array} products - An array of product objects to be displayed in the grid.
     * @required
     */
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
