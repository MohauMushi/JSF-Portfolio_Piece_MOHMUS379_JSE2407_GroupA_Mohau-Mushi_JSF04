<template>
  <!-- Main container for the search bar -->
  <div class="w-full md:w-auto mb-3">
    <div class="relative">
      <!-- Search input field -->
      <input
        type="search"
        id="search-input"
        v-model="searchTerm"
        @input="handleInput"
        class="p-2.5 w-full z-20 text-sm text-gray-900 dark:text-white dark:bg-gray-700 bg-gray-50 border-none rounded-lg border focus:ring-teal-500 focus:border-teal-500"
        placeholder="Search products..."
      />
      <!-- Search button -->
      <button
        type="button"
        class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-teal-700 dark:bg-gray-950 rounded-e-lg border border-teal-700 dark:border-gray-700 focus:ring-4 focus:outline-none"
      >
        <!-- Search icon SVG -->
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <!-- Screen reader text for the search button -->
        <span class="sr-only">Search</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);

/**
 * @type {import('vue').Ref<string>}
 * @description Reactive reference to the current search term.
 */
const searchTerm = ref("");

/**
 * @function handleInput
 * @description Emits a 'search' event with the current search term whenever the input changes.
 */
function handleInput() {
  emit("search", searchTerm.value);
}
</script>
