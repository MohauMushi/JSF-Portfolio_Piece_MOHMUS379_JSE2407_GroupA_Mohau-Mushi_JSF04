import { defineStore } from "pinia";

/**
 * @typedef {Object} FilterSortState
 * @property {string} selectedCategory - The currently selected product category
 * @property {string} sortOrder - The current sort order for products
 */

/**
 * Pinia store for managing filtering and sorting options
 * @type {import('pinia').Store<'filterSort', FilterSortState>}
 */
export const useFilterSortStore = defineStore("filterSort", {
  /**
   * @returns {FilterSortState}
   */
  state: () => ({
    selectedCategory: "",
    sortOrder: "",
  }),
  actions: {
    /**
     * Sets the selected category for filtering
     * @param {string} category - The category to set as selected
     */
    setSelectedCategory(category) {
      this.selectedCategory = category;
    },

    /**
     * Sets the sort order for products
     * @param {string} order - The sort order to set (e.g., "asc" or "desc")
     */
    setSortOrder(order) {
      this.sortOrder = order;
    },
  },
});
