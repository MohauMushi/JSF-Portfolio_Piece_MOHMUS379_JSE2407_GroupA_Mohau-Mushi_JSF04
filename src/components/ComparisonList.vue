<template>
  <div class="comparison-list max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-5 text-center">
      Product Comparison
    </h2>
    <div
      v-if="comparisonList.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg"
    >
      <p class="text-xl text-gray-600">
        Your comparison list is empty. Add some products to compare!
      </p>
    </div>
    <div v-else class="overflow-x-auto">
      <table
        class="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <thead class="bg-white">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Specification
            </th>
            <th
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-3 text-center"
            >
              <div class="flex flex-col items-center">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-32 h-32 object-contain mb-2"
                />
                <p class="text-sm font-semibold text-gray-900">
                  {{ product.title }}
                </p>
                <button
                  @click="removeFromComparison(product.id)"
                  class="mt-2 text-sm text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                >
                  Remove
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              Price
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
            >
              ${{ product.price.toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              Rating
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 whitespace-nowrap text-center"
            >
              <StarRating :rating="product.rating.rate" />
            </td>
          </tr>
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              Description
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 text-sm text-gray-500"
            >
              <p class="line-clamp-3">{{ product.description }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-6 text-center" v-if="comparisonList.length > 0">
      <button
        @click="clearComparison"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Clear Comparison List
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useComparisonStore } from "../store/ComparisonStore";
import StarRating from "./StarRating.vue";

const comparisonStore = useComparisonStore();

const comparisonList = computed(() => comparisonStore.comparisonList);

const removeFromComparison = (productId) => {
  comparisonStore.removeFromComparison(productId);
};

const clearComparison = () => {
  comparisonStore.clearComparison();
};
</script>
