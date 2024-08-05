<template>
  <!-- Main container for the skeleton, only shown when 'show' prop is true -->
  <div v-if="show" class="flex flex-col md:flex-row animate-pulse">
    <!-- Product Image Placeholder -->
    <div class="md:w-1/2 mb-4 md:mb-0 md:mr-4">
      <div
        class="flex items-center justify-center bg-gray-300 h-64 w-full rounded"
      >
        <!-- Placeholder SVG for product image -->
        <svg
          class="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path
            d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
          />
          <path
            d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
          />
        </svg>
      </div>
    </div>

    <!-- Product Details Placeholders -->
    <div class="md:w-1/2">
      <!-- Placeholder for product title -->
      <div class="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <!-- Placeholder for product rating -->
      <div class="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
      <!-- Placeholder for product price -->
      <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <!-- Placeholder for product availability -->
      <div class="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
      <!-- Placeholder for add to cart button -->
      <div class="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
      <!-- Placeholders for product description -->
      <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
</template>

<script>
/**
 * @module ProductDetailSkeleton
 * @description A component that renders a skeleton loader for a product detail page.
 */
export default {
  name: "ProductDetailSkeleton",
  props: {
    /**
     * @property {boolean} show - Determines whether the skeleton loader should be displayed.
     * @default false
     */
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
