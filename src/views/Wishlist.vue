<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1
      class="text-3xl font-extrabold text-gray-900 dark:text-white mb-5 text-center"
    >
      My Wishlist
    </h1>
    <div
      v-if="wishlistItems.length === 0"
      class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <p class="text-lg sm:text-xl dark:text-white">Your wishlist is empty.</p>
      <router-link
        to="/"
        class="mt-4 inline-block bg-teal-500 dark:bg-[#7a5af5] dark:hover:bg-[#9171f8] text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Continue Shopping
      </router-link>
    </div>
    <div v-else>
      <div
        class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <button
          @click="clearWishlist"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Clear Wishlist
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in WishlistItems"
          :key="item.id"
          class="flex flex-col h-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-lg shadow-slate-950/5 dark:shadow-gray-900/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-102 hover:shadow-xl dark:hover:shadow-gray-800/40"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-contain p-4"
          />
          <div class="p-4 flex-grow">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2"
            >
              {{ item.title }}
            </h2>
            <StarRating :rating="item.rating.rate" />
            <p class="text-xl font-bold text-[#415a77] dark:text-gray-300 mb-2">
              ${{ item.price.toFixed(2) }}
            </p>
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 space-y-2 sm:space-y-0"
            >
              <p
                class="px-2 py-1 bg-indigo-100 dark:bg-gray-600 text-[#415a77] dark:text-gray-300 rounded-md text-xs font-medium"
              >
                {{ item.category }}
              </p>
            </div>
          </div>
          <div
            class="flex justify-between m-4 p-2.5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner dark:shadow-black/20"
          >
            <button
              @click="addToCart(item)"
              class="flex items-center justify-center px-4 py-2 bg-[#354961] dark:bg-gray-900 text-white text-sm font-medium rounded-md transition-colors duration-300 hover:bg-[#415a77] dark:hover:bg-gray-800"
            >
              <svg
                class="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z"
                  fill="currentColor"
                ></path>
              </svg>
              Add To Cart
            </button>
            <button
              @click="removeFromWishlist(item.id)"
              class="flex items-center justify-center px-4 py-2 bg-[#ff0c0c] dark:bg-[#ff0c0c] text-white text-sm font-medium rounded-md transition-colors duration-300 hover:bg-[#c41b1b] dark:hover:bg-[#c41b1b]"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWishlistStore } from "../store/WishlistStore";
import { useCartStore } from "../store/CartStore";
import StarRating from "../components/StarRating.vue";

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const wishlistItems = computed(() => wishlistStore.items);

const WishlistItems = computed(() => {
  return [...wishlistItems.value];
});

const addToCart = (item) => {
  cartStore.addToCart(item);
};

const removeFromWishlist = (itemId) => {
  wishlistStore.removeFromWishlist(itemId);
};

const clearWishlist = () => {
  wishlistStore.clearWishlist();
};
</script>
