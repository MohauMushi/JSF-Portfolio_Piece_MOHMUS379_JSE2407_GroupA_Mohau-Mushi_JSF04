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
    paymentMethod: "",
    orderHistory: [],
    checkoutError: null,
    orderConfirmation: null,
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
    updateUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    setPaymentMethod(method) {
      this.paymentMethod = method;
    },
    async placeOrder() {
      if (
        !this.userInfo.name ||
        !this.userInfo.address ||
        !this.userInfo.email
      ) {
        this.checkoutError = "Please provide all required information.";
        return;
      }

      if (!this.paymentMethod) {
        this.checkoutError = "Please select a payment method.";
        return;
      }

      try {
        // Simulating API call to process payment
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const success = Math.random() > 0.2;

        if (success) {
          const orderNumber = Math.floor(Math.random() * 1000000);
          this.orderConfirmation = `Order #${orderNumber} placed successfully!`;
          this.orderHistory.push({
            orderNumber,
            date: new Date().toISOString(),
            total: this.orderSummary.totalCost,
            status: "Processing",
          });
          useCartStore().clearCart();
        } else {
          throw new Error("Payment failed");
        }
      } catch (error) {
        this.checkoutError = error.message;
      }
    },

    cancelOrder(orderNumber) {
      const orderIndex = this.orderHistory.findIndex(
        (order) => order.orderNumber === orderNumber
      );
      if (orderIndex !== -1) {
        this.orderHistory[orderIndex].status = "Cancelled";
      }
    },

    clearCheckoutState() {
      this.userInfo = { name: "", address: "", email: "" };
      this.paymentMethod = "";
      this.orderSummary = null;
      this.checkoutError = null;
      this.orderConfirmation = null;
    },
  },
});
