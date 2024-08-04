<template>
  <div class="w-full md:w-auto mb-4 md:mb-0">
    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
      Filter by Category:
    </label>
    <select
      id="category"
      v-model="selectedCategory"
      @change="handleCategoryChange"
      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CategoryFilter",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  emits: ["filterChange"],
  setup(props, { emit }) {
    const selectedCategory = ref("");

    const handleCategoryChange = (event) => {
      const category = event.target.value;
      selectedCategory.value = category;
      emit("filterChange", category);
    };

    return {
      selectedCategory,
      handleCategoryChange,
    };
  },
};
</script>
