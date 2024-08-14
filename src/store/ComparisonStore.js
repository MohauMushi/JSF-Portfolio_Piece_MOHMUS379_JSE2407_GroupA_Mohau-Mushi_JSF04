import { defineStore } from "pinia";
import { useProductStore } from './ProductStore.js';

export const useComparisonStore = defineStore("comparison", {
  state: () => ({
    comparisonList: [],
    maxComparisonItems: 4,
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
    },
    clearComparison() {
      this.comparisonList = [];
    },
  },
});