import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

/**
 * Pinia store for managing the user's wishlist.
 *
 */
export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    /**
     * The list of products in the user's wishlist.
     * @type {{ id: number; title: string; price: number; image: string }[]}
     */
    items: [],
  }),
  getters: {
    /**
     * The number of items in the user's wishlist.
     * @returns {number} The number of items in the wishlist.
     */
    itemCount: (state) => state.items.length,
    /**
     * Checks if a given product is in the user's wishlist.
     * @param {number} productId - The unique identifier of the product.
     * @returns {boolean} True if the product is in the wishlist, false otherwise.
     */
    isInWishlist: (state) => (productId) =>
      state.items.some((item) => item.id === productId),
  },
  actions: {
    /**
     * Adds a product to the user's wishlist, if it's not already in the list.
     * @param {object} product - The product to be added to the wishlist.
     * @param {number} product.id - The unique identifier of the product.
     * @param {string} product.title - The title of the product.
     * @param {number} product.price - The price of the product.
     * @param {string} product.image - The URL of the product image.
     * @returns {void}
     */
    addToWishlist(product) {
      if (!this.isInWishlist(product.id)) {
        this.items.push(product);
        this.saveToLocalStorage();
      }
    },
    /**
     * Removes a product from the user's wishlist.
     * @param {number} productId - The unique identifier of the product to be removed.
     * @returns {void}
     */
    removeFromWishlist(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    /**
     * Clears the entire wishlist.
     * @returns {void}
     */
    clearWishlist() {
      this.items = [];
      this.saveToLocalStorage();
    },
    /**
     * Saves the current wishlist to the user's local storage.
     * @returns {void}
     */
    saveToLocalStorage() {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        localStorage.setItem("wishlist", JSON.stringify(this.items));
      }
    },
    /**
     * Loads the user's wishlist from local storage.
     * @returns {void}
     */
    loadFromLocalStorage() {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          this.items = JSON.parse(savedWishlist);
        }
      }
    },
  },
});
