<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <div
      v-for="_ in count"
      :key="_"
      class="animate-pulse bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
    >
      <!-- Skeleton for product image -->
      <div class="h-48 bg-gray-400"></div>

      <!-- Skeleton for product details -->
      <div class="p-4">
        <div class="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-400 rounded w-1/2 mb-2"></div>
        <div class="h-4 bg-gray-400 rounded w-1/4"></div>
      </div>

      <!-- Skeleton for price and action button -->
      <div class="p-4 flex justify-between items-center">
        <div class="h-6 bg-gray-400 rounded w-1/4"></div>
        <div class="h-8 bg-gray-400 rounded w-1/3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: {
    count: {
      type: Number,
      default: 8,
    },
  },
};
</script>
