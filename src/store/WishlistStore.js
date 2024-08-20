import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: [],
  }),
  getters: {
    itemCount: (state) => state.items.length,
    isInWishlist: (state) => (productId) =>
      state.items.some((item) => item.id === productId),
  },
  actions: {
    addToWishlist(product) {
      if (!this.isInWishlist(product.id)) {
        this.items.push(product);
        this.saveToLocalStorage();
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    clearWishlist() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        localStorage.setItem("wishlist", JSON.stringify(this.items));
      }
    },
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
