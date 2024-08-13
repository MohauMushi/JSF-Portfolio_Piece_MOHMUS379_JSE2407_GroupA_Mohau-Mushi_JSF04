import { defineStore } from "pinia";
import { useAuthStore } from "./auth.js";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    totalCost: (state) =>
      Number(
        state.items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)
      ),
    cartItemsCount: (state) => state.items.length,
  },
  actions: {
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
    saveToLocalStorage() {
      const authStore = useAuthStore();
      const userId = this.getUserIdFromToken(authStore.token);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const authStore = useAuthStore();
      const userId = this.getUserIdFromToken(authStore.token);
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },
  },
});
