import { defineStore } from "pinia";
import { useCartStore } from "./CartStore.js";
import { useAuthStore } from "./auth.js";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    userInfo: {
      name: "",
      address: "",
      email: "",
    },
    orderSummary: null,
  }),

  actions: {
    async initiateCheckout() {
      const cartStore = useCartStore();
      const authStore = useAuthStore();

      // Auto-fill user information
      const decodedToken = authStore.decodedToken || {};
      this.userInfo = {
        name: decodedToken.name || "",
        address: decodedToken.address || "",
        email: decodedToken.email || "",
      };

      this.orderSummary = {
        items: cartStore.items,
        totalCost: cartStore.totalCost,
      };
    },
  },
});