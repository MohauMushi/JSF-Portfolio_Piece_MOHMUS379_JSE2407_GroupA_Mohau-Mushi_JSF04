import { defineStore } from "pinia";
import { useProductStore } from './ProductStore.js';

export const useComparisonStore = defineStore("comparison", {
  state: () => ({
    comparisonList: [],
    maxComparisonItems: 4,
    comparisonCheckboxes: {},
  }),
  actions: {
    async addToComparison(productId) {
      if (this.comparisonList.length < this.maxComparisonItems) {
        const existingProduct = this.comparisonList.find(
          (product) => product.id === productId
        );
        if (!existingProduct) {
          const productStore = useProductStore();
          const product = await productStore.fetchProductById(productId);
          if (product) {
            this.comparisonList.push(product);
            this.comparisonCheckboxes[productId] = true;
          } else {
            console.error('Product not found');
          }
        }
      }
    },
    removeFromComparison(productId) {
      this.comparisonList = this.comparisonList.filter(
        (product) => product.id !== productId
      );
      delete this.comparisonCheckboxes[productId];
    },
    clearComparison() {
      this.comparisonList = [];
      this.comparisonCheckboxes = {};
    },
    async toggleComparisonCheckbox(productId) {
      if (this.comparisonCheckboxes[productId]) {
        this.removeFromComparison(productId);
      } else {
        await this.addToComparison(productId);
      }
    },
    isInComparison(productId) {
      return !!this.comparisonCheckboxes[productId];
    },
  },
});