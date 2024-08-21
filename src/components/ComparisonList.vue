<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2
      class="text-3xl font-extrabold text-gray-900 dark:text-white mb-5 text-center"
    >
      Product Comparison
    </h2>
    <div
      v-if="comparisonList.length === 0"
      class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <p class="text-xl text-gray-600 dark:text-yellow-50">
        Your comparison list is empty. Add some products to compare!
      </p>
      <router-link
        to="/"
        class="mt-4 inline-block bg-teal-500 dark:bg-[#7a5af5] dark:hover:bg-[#9171f8] text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Continue Comparing
      </router-link>
    </div>
    <div v-else class="overflow-x-auto">
      <table
        class="w-full border-collapse bg-white dark:bg-[#282828] shadow-lg rounded-lg overflow-hidden"
      >
        <thead class="bg-white dark:bg-gray-800">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-black dark:text-slate-50 uppercase tracking-wider"
            >
              Product Image
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
                <p
                  class="text-sm font-semibold text-gray-900 dark:text-slate-50"
                >
                  {{ product.title }}
                </p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-gray-200 dark:divide-slate-600 dark:bg-gray-800"
        >
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50"
            >
              Price
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-slate-50"
            >
              ${{ product.price.toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50"
            >
              Rating
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 whitespace-nowrap text-center"
            >
              <div class="flex flex-col items-center">
                <StarRating :rating="product.rating.rate" />
                <p class="text-sm text-gray-500 dark:text-slate-300 mt-1">
                  {{ product.rating.rate.toFixed(1) }} ({{
                    product.rating.count
                  }}
                  reviews)
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50"
            >
              Description
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 text-sm text-gray-500 dark:text-slate-50"
            >
              <p class="line-clamp-3">{{ product.description }}</p>
            </td>
          </tr>
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50"
            >
              Actions
            </td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-6 py-4 text-center"
            >
              <button
                @click="removeFromComparison(product.id)"
                class="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Remove
              </button>
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
import { computed } from "vue";
import { useComparisonStore } from "../store/ComparisonStore";
import StarRating from "./StarRating.vue";

/**
 * A component that displays a product comparison table, allowing users to compare selected products.
 */
const comparisonStore = useComparisonStore();

/**
 * The list of products currently in the comparison list.
 */
const comparisonList = computed(() => comparisonStore.comparisonList);

/**
 * Removes a product from the comparison list.
 *
 * @param {number} productId - The ID of the product to be removed from the comparison list.
 */
const removeFromComparison = (productId) => {
  comparisonStore.removeFromComparison(productId);
};

/**
 * Clears the entire comparison list.
 */
const clearComparison = () => {
  comparisonStore.clearComparison();
};
</script>
