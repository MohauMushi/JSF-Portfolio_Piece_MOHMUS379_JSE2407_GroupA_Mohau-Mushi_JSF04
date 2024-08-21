import { defineStore } from "pinia";
import { useAuthStore } from "./auth.js";
import { jwtDecode } from "jwt-decode";

/**
 * Pinia store for managing the shopping cart.
 * @returns {object} The cart store instance.
 */
export const useCartStore = defineStore("cart", {
  state: () => ({
    /**
     * An array of items in the cart.
     * @type {object[]}
     * @property {number} id - The unique identifier of the product.
     * @property {string} title - The title of the product.
     * @property {number} price - The price of the product.
     * @property {number} quantity - The quantity of the product in the cart.
     */
    items: [],
  }),
  getters: {
    /**
     * Calculates the total number of items in the cart.
     * @returns {number} The total number of items in the cart.
     */
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    /**
     * Calculates the total cost of all items in the cart.
     * @returns {number} The total cost of all items in the cart.
     */
    totalCost: (state) =>
      Number(
        state.items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)
      ),
    /**
     * Retrieves the number of unique items in the cart.
     * @returns {number} The number of unique items in the cart.
     */
    cartItemsCount: (state) => state.items.length,
  },
  actions: {
    /**
     * Adds a product to the cart.
     * @param {object} product - The product to be added to the cart.
     * @param {number} product.id - The unique identifier of the product.
     * @param {string} product.title - The title of the product.
     * @param {number} product.price - The price of the product.
     * @returns {void}
     */
    addToCart(product) {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) {
        authStore.showAuthModal("cart");
        return;
      }

      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveToLocalStorage();
    },
    /**
     * Removes a product from the cart.
     * @param {number} productId - The unique identifier of the product to be removed.
     * @returns {void}
     */
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    /**
     * Updates the quantity of a product in the cart.
     * @param {number} productId - The unique identifier of the product to be updated.
     * @param {number} quantity - The new quantity of the product.
     * @returns {void}
     */
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    },
    /**
     * Clears the entire cart.
     * @returns {void}
     */
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    /**
     * Saves the cart contents to the user's local storage.
     * @returns {void}
     */
    saveToLocalStorage() {
      const authStore = useAuthStore();
      const userId = this.getUserIdFromToken(authStore.token);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(this.items));
    },
    /**
     * Loads the cart contents from the user's local storage.
     * @returns {void}
     */
    loadFromLocalStorage() {
      const authStore = useAuthStore();
      const userId = this.getUserIdFromToken(authStore.token);
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },
    /**
     * Extracts the user ID from the user's JWT token.
     * @param {string} token - The user's JWT token.
     * @returns {string|null} The user ID extracted from the token, or null if the token is invalid.
     */
    getUserIdFromToken(token) {
      if (!token) return null;
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    },
  },
});
