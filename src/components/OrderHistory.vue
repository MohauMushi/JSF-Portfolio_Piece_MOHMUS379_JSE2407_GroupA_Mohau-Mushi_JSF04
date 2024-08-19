<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1
      class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center"
    >
      Order History
    </h1>
    <div
      v-if="orderHistory.length === 0"
      class="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
    >
      <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
        You have no past orders.
      </p>
      <router-link
        to="/"
        class="mt-4 inline-block bg-teal-500 dark:bg-[#7a5af5] dark:hover:bg-[#9171f8] text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Continue Shopping
      </router-link>
    </div>
    <div v-else class="space-y-6">
      <div
        v-for="order in orderHistory"
        :key="order.orderNumber"
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md max-w-md mx-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            Order #{{ order.orderNumber }}
          </h2>
          <span
            :class="{
              'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100':
                order.status === 'Completed',
              'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100':
                order.status === 'Processing',
              'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100':
                order.status === 'Cancelled',
              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100':
                !['Completed', 'Processing', 'Cancelled'].includes(
                  order.status
                ),
            }"
            class="px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ order.status }}
          </span>
        </div>
        <div class="space-y-2 mb-4">
          <p class="text-gray-600 dark:text-gray-300">
            <span class="font-medium">Date:</span>
            {{ new Date(order.date).toLocaleString() }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            <span class="font-medium">Total:</span> ${{
              order.total.toFixed(2)
            }}
          </p>
        </div>
        <button
          v-if="order.status !== 'Cancelled'"
          @click="cancelOrder(order.orderNumber)"
          class="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Cancel Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCheckoutStore } from "../store/CheckoutStore";

const checkoutStore = useCheckoutStore();

const orderHistory = computed(() => checkoutStore.orderHistory);

const cancelOrder = (orderNumber) => {
  checkoutStore.cancelOrder(orderNumber);
};
</script>
