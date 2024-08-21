import { defineStore } from "pinia";
import { useProductStore } from "./ProductStore.js";

/**
 * Pinia store for managing the product comparison functionality.
 * @returns {object} The comparison store instance.
 */
export const useComparisonStore = defineStore("comparison", {
  state: () => ({
    /**
     * An array of products currently in the comparison list.
     * @type {object[]}
     * @property {number} id - The unique identifier of the product.
     * @property {string} title - The title of the product.
     * @property {number} price - The price of the product.
     * @property {string} description - The description of the product.
     * @property {string} image - The URL of the product image.
     */
    comparisonList: [],
    /**
     * The maximum number of products allowed in the comparison list.
     * @type {number}
     */
    maxComparisonItems: 4,
    /**
     * An object that tracks the state of the comparison checkboxes for each product.
     * @type {object}
     * @property {boolean} [productId] - The state of the comparison checkbox for the product with the given ID.
     */
    comparisonCheckboxes: {},
  }),
  actions: {
    /**
     * Adds a product to the comparison list, if the list is not already at the maximum capacity.
     * @param {number} productId - The unique identifier of the product to be added.
     * @returns {Promise<void>} A Promise that resolves when the product is added to the comparison list.
     */
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
            console.error("Product not found");
          }
        }
      }
    },
    /**
     * Removes a product from the comparison list.
     * @param {number} productId - The unique identifier of the product to be removed.
     * @returns {void}
     */
    removeFromComparison(productId) {
      this.comparisonList = this.comparisonList.filter(
        (product) => product.id !== productId
      );
      delete this.comparisonCheckboxes[productId];
    },
    /**
     * Clears the entire comparison list.
     * @returns {void}
     */
    clearComparison() {
      this.comparisonList = [];
      this.comparisonCheckboxes = {};
    },
    /**
     * Toggles the state of the comparison checkbox for a given product.
     * If the checkbox is checked, the product is added to the comparison list.
     * If the checkbox is unchecked, the product is removed from the comparison list.
     * @param {number} productId - The unique identifier of the product.
     * @returns {Promise<void>} A Promise that resolves when the comparison checkbox is toggled.
     */
    async toggleComparisonCheckbox(productId) {
      if (this.comparisonCheckboxes[productId]) {
        this.removeFromComparison(productId);
      } else {
        await this.addToComparison(productId);
      }
    },
    /**
     * Checks if a given product is currently in the comparison list.
     * @param {number} productId - The unique identifier of the product.
     * @returns {boolean} True if the product is in the comparison list, false otherwise.
     */
    isInComparison(productId) {
      return !!this.comparisonCheckboxes[productId];
    },
  },
});
