<template>
  <!-- Container for the category filter dropdown -->
  <div class="w-full md:w-auto mb-4 md:mb-0">
    <!-- Label for the category filter dropdown -->
    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
      Filter by Category:
    </label>
    <!-- Category filter dropdown -->
    <select
      id="category"
      :value="selectedCategory"
      @change="handleCategoryChange"
      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <!-- Default option for all categories -->
      <option value="">All Categories</option>
      <!-- Options generated from the categories prop -->
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CategoryFilter",
  props: {
    /**
     * Array of categories to display in the dropdown.
     * @type {Array}
     * @required
     */
    categories: {
      type: Array,
      required: true,
    },
    /**
     * The currently selected category.
     * @type {String}
     * @required
     */
    selectedCategory: {
      type: String,
      required: true,
    },
  },
  emits: ["filterChange"],
  setup(props, { emit }) {
    /**
     * Handles the change event for the category dropdown.
     * Emits the 'filterChange' event with the selected category.
     * @param {Event} event - The change event object.
     */
    const handleCategoryChange = (event) => {
      emit("filterChange", event.target.value);
    };

    return {
      handleCategoryChange,
    };
  },
};
</script>
