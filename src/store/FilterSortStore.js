import { defineStore } from "pinia";

export const useFilterSortStore = defineStore("filterSort", {
  state: () => ({
    selectedCategory: "",
    sortOrder: "",
  }),
  actions: {
    setSelectedCategory(category) {
      this.selectedCategory = category;
    },
    setSortOrder(order) {
      this.sortOrder = order;
    },
  },
});
