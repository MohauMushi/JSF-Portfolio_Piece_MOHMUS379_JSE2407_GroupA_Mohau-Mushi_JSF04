<template>
  <!-- Grid container for skeleton product cards -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <!-- Individual skeleton product card -->
    <div
      v-for="_ in count"
      :key="_"
      class="animate-pulse bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
    >
      <!-- Skeleton for product image -->
      <div class="flex items-center justify-center h-48 bg-gray-400">
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

      <!-- Skeleton for product details -->
      <div class="p-4">
        <!-- Placeholder for product title -->
        <div class="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
        <!-- Placeholder for product description (line 1) -->
        <div class="h-4 bg-gray-400 rounded w-1/2 mb-2"></div>
        <!-- Placeholder for product description (line 2) -->
        <div class="h-4 bg-gray-400 rounded w-1/4"></div>
      </div>

      <!-- Skeleton for price and action button -->
      <div class="p-4 flex justify-between items-center">
        <!-- Placeholder for price -->
        <div class="h-6 bg-gray-400 rounded w-1/4"></div>
        <!-- Placeholder for action button -->
        <div class="h-8 bg-gray-400 rounded w-1/3"></div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module SkeletonLoader
 * @description A component that renders a grid of skeleton loaders for product cards.
 */
export default {
  name: "SkeletonLoader",
  props: {
    /**
     * @property {number} count - The number of skeleton product cards to render.
     * @default 8
     */
    count: {
      type: Number,
      default: 8,
    },
  },
};
</script>
