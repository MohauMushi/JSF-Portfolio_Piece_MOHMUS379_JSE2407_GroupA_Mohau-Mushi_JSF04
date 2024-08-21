import { defineStore } from "pinia";
import { useCartStore } from "./CartStore.js";
import { useAuthStore } from "./auth.js";

/**
 * Pinia store for managing the checkout process.
 * @returns {object} The checkout store instance.
 */
export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    /**
     * An object containing the user's information for the checkout process.
     * @type {object}
     * @property {string} name - The user's name.
     * @property {string} address - The user's address.
     * @property {string} email - The user's email.
     */
    userInfo: {
      name: "",
      address: "",
      email: "",
    },
    /**
     * An object containing the order summary information.
     * @type {object|null}
     * @property {object[]} items - The items in the cart.
     * @property {number} totalCost - The total cost of the items.
     */
    orderSummary: null,
    /**
     * The selected payment method.
     * @type {string}
     */
    paymentMethod: "",
    /**
     * An array of past orders.
     * @type {object[]}
     * @property {number} orderNumber - The unique identifier of the order.
     * @property {string} date - The date the order was placed.
     * @property {number} total - The total cost of the order.
     * @property {string} status - The status of the order (e.g., "Processing", "Cancelled").
     */
    orderHistory: [],
    /**
     * The error message, if any, that occurred during the checkout process.
     * @type {string|null}
     */
    checkoutError: null,
    /**
     * The confirmation message after a successful order placement.
     * @type {string|null}
     */
    orderConfirmation: null,
  }),

  actions: {
    /**
     * Initializes the checkout process by fetching the user's information and the order summary.
     * @returns {void}
     */
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
    /**
     * Updates the user's information for the checkout process.
     * @param {object} info - The new user information.
     * @param {string} [info.name] - The new name.
     * @param {string} [info.address] - The new address.
     * @param {string} [info.email] - The new email.
     * @returns {void}
     */
    updateUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    /**
     * Sets the selected payment method for the checkout process.
     * @param {string} method - The selected payment method.
     * @returns {void}
     */
    setPaymentMethod(method) {
      this.paymentMethod = method;
    },
    /**
     * Attempts to place the order.
     * @returns {Promise<void>} A Promise that resolves when the order is successfully placed or rejects when an error occurs.
     */
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
    /**
     * Cancels a specific order from the order history.
     * @param {number} orderNumber - The unique identifier of the order to be cancelled.
     * @returns {void}
     */
    cancelOrder(orderNumber) {
      const orderIndex = this.orderHistory.findIndex(
        (order) => order.orderNumber === orderNumber
      );
      if (orderIndex !== -1) {
        this.orderHistory[orderIndex].status = "Cancelled";
      }
    },
    /**
     * Clears the checkout state, resetting all the data.
     * @returns {void}
     */
    clearCheckoutState() {
      this.userInfo = { name: "", address: "", email: "" };
      this.paymentMethod = "";
      this.orderSummary = null;
      this.checkoutError = null;
      this.orderConfirmation = null;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "checkout",
        storage: localStorage,
        paths: ["orderHistory"],
      },
    ],
  },
});
