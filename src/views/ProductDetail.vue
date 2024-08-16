<template>
  <div class="flex flex-col container mx-auto px-4 py-8">
    <!-- Back to Products link -->
    <div>
      <router-link
        to="/"
        class="inline-block bg-teal-500 dark:bg-[#29223a] text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-[#2f2b3a]"
      >
        ← Back to Products
      </router-link>
    </div>

    <!-- Main content container -->
    <div class="flex-grow flex justify-center items-start p-4 overflow-auto">
      <div class="w-full max-w-4xl">
        <!-- Skeleton loader -->
        <ProductDetailSkeleton :show="loading" />

        <!-- Product details -->
        <div
          v-if="!loading && product"
          class="bg-white dark:bg-gray-800 md:flex rounded-lg shadow-md p-6"
        >
          <div class="flex flex-col md:flex-row">
            <!-- Product image -->
            <div
              class="md:w-1/2 flex items-center justify-center mb-4 md:mb-0 m-"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="max-w-full h-64 max-h-96 object-contain"
              />
            </div>
            <!-- Product information -->
            <div class="md:w-1/2 md:pl-6">
              <h2
                class="text-2xl dark:text-white sm:text-3xl md:text-4xl font-semibold mb-3"
              >
                {{ product.title }}
              </h2>
              <!-- Rating -->
              <div class="mb-2 flex items-center">
                <svg
                  class="w-5 h-5 text-yellow-400 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="dark:text-white"
                  >{{ product.rating.rate }} ({{
                    product.rating.count
                  }}
                  reviews)</span
                >
              </div>
              <!-- Category -->
              <p
                class="text-gray-500 px-2 py-1 bg-indigo-100 dark:bg-[#212121] dark:text-gray-400 rounded-md text-xs font-medium mb-2 inline-block"
              >
                {{ product.category }}
              </p>
              <!-- Price -->
              <p class="text-black font-bold mb-2 text-xl dark:text-white">
                ${{ product.price.toFixed(2) }}
              </p>
              <!-- Add to cart button -->
              <div
                @mouseenter="handleButtonHover(true)"
                @mouseleave="handleButtonHover(false)"
              >
                <button
                  @click="handleAddToCart"
                  :disabled="isAddToCartDisabled"
                  :class="[
                    'inline-flex items-center justify-center px-3 py-2 mt-2 bg-[#354961] dark:bg-[#1a1625] text-white text-sm font-medium rounded-md transition-colors duration-300',
                    isAddToCartDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#415a77] dark:hover:bg-[#2f2b3a]',
                  ]"
                >
                  <svg
                    class="h-6 w-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                  Add To Cart
                </button>
              </div>
              <!-- Description -->
              <h3
                class="text-black text-xl font-medium mt-4 mb-2 dark:text-white"
              >
                Description
              </h3>
              <p class="text-gray-600 dark:text-white">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
        <!-- Error message if product not found -->
        <p
          v-if="!loading && !product"
          class="text-center text-red-500 font-extrabold p-4 flex items-center justify-center"
        >
          Oops! It looks like the product you're looking for isn't available.
        </p>
      </div>
    </div>
    <Notification
      v-if="showNotification"
      class="fixed top-5 left-1/2 mt-20 transform -translate-x-1/2 z-50 w-11/12 max-w-md"
      message="Please log in to add items to your cart"
      :duration="3000"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/ProductStore";
import { useCartStore } from "../store/CartStore.js";
import { useAuthStore } from "../store/auth";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton.vue";
import Notification from "../components/ButtonDisabledNotification.vue";

/**
 * @constant {Object} route - Vue Router instance for accessing route parameters
 */
const route = useRoute();

/**
 * @constant {Object} productStore - Product store instance for fetching product data
 */
const productStore = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

/**
 * @type {import('vue').Ref<Object|null>}
 * @description Reactive reference to store the current product's data
 */
const product = ref(null);

/**
 * @type {import('vue').Ref<boolean>}
 * @description Reactive reference to track loading state
 */
const loading = ref(true);
const showNotification = ref(false);

const isAddToCartDisabled = computed(() => !authStore.isLoggedIn);

/**
 * @function
 * @async
 * @description Fetches product data on component mount
 */
onMounted(async () => {
  const id = route.params.id;
  try {
    product.value = await productStore.fetchProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1300);
  }
});

const handleAddToCart = () => {
  if (authStore.isLoggedIn) {
    cartStore.addToCart(product.value);
  } else {
    authStore.showAuthModal("cart");
  }
};

const handleButtonHover = (isHovering) => {
  if (isAddToCartDisabled.value && isHovering) {
    showNotification.value = true;
  } else {
    showNotification.value = false;
  }
};
</script>
