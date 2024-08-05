<template>
  <!-- Wrap the entire card in a router-link for navigation to product detail page -->
  <router-link :to="`/product/${product.id}`" class="block">
    <div
      class="cursor-pointer flex flex-col h-full bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
    >
      <!-- Product Image -->
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full mt-5 h-48 object-contain"
      />
      <div class="p-4">
        <!-- Product Title -->
        <h2 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ product.title }}
        </h2>
        <!-- Star Rating Component -->
        <StarRating :rating="product.rating.rate" />
        <!-- Product Price -->
        <p class="text-xl font-bold text-[#415a77] mb-2">
          ${{ product.price.toFixed(2) }}
        </p>
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 space-y-2 sm:space-y-0"
        >
          <!-- Product Category -->
          <p
            class="px-2 py-1 bg-indigo-100 text-[#415a77] rounded-md text-xs font-medium"
          >
            {{ product.category }}
          </p>
          <div class="flex items-center space-x-2">
            <!-- Wishlist Button -->
            <button class="p-1 rounded-full transition-colors duration-300">
              <svg
                class="h-6 w-6 hover:text-red-500 hover:fill-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            </button>
            <!-- Add to Cart Button -->
            <button
              class="inline-flex items-center justify-center px-3 py-2 bg-[#354961] text-white text-sm font-medium rounded-md hover:bg-[#415a77] transition-colors duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import StarRating from "./StarRating.vue";

/**
 * @module ProductCard
 * @description A component that renders a card displaying product information including image, title, rating, price, category, and action buttons.
 */
export default {
  name: "ProductCard",
  components: {
    /**
     * @component StarRating
     * @description Component used to display the product's star rating.
     */
    StarRating,
  },
  props: {
    /**
     * @property {Object} product - The product object containing all necessary information to display.
     * @property {number} product.id - Unique identifier for the product.
     * @property {string} product.image - URL of the product image.
     * @property {string} product.title - Title of the product.
     * @property {Object} product.rating - Rating information for the product.
     * @property {number} product.rating.rate - The average rating of the product.
     * @property {number} product.price - The price of the product.
     * @property {string} product.category - The category of the product.
     * @required
     */
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
