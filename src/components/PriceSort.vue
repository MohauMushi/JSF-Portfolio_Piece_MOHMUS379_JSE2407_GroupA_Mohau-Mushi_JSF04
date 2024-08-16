<template>
  <div class="w-full md:w-auto mb-4 md:mb-0">
    <label for="sort" class="block text-sm font-medium text-gray-700 dark:text-white mb-1">
      Sort by Price:
    </label>
    <select
      id="sort"
      :value="selectedSort"
      @change="handleSortChange"
      class="block w-full pl-3 pr-10 py-2 text-base dark:bg-gray-700 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="">Default</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

/**
 * @property {string} selectedSort - The currently selected sort order.
 */
const props = defineProps({
  selectedSort: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["sortChange"]);

/**
 * @function handleSortChange
 * @description Handles the change event of the sort select element.
 * @param {Event} event - The change event object.
 */
const handleSortChange = (event) => {
  emit("sortChange", event.target.value);
};
</script>
