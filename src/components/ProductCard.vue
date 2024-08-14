<template>
  <div
    class="flex flex-col h-full bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
  >
    <router-link :to="`/product/${product.id}`" class="block flex-grow">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full mt-5 h-48 object-contain"
      />
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ product.title }}
        </h2>
        <StarRating :rating="product.rating.rate" />
        <p class="text-xl font-bold text-[#415a77] mb-2">
          ${{ product.price.toFixed(2) }}
        </p>
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 space-y-2 sm:space-y-0"
        >
          <p
            class="px-2 py-1 bg-indigo-100 text-[#415a77] rounded-md text-xs font-medium"
          >
            {{ product.category }}
          </p>
        </div>
      </div>
    </router-link>
    <div class="flex items-center justify-between m-4 mt-auto">
      <button class="p-1 rounded-full transition-colors duration-300">
        <svg
          class="h-6 w-6 hover:text-red-500 hover:fill-red-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      </button>
      <div
        @mouseenter="handleButtonHover(true)"
        @mouseleave="handleButtonHover(false)"
      >
        <button
          @click="handleAddToCart"
          :disabled="isAddToCartDisabled"
          :class="[
            'inline-flex items-center justify-center px-3 py-2 bg-[#354961] text-white text-sm font-medium rounded-md transition-colors duration-300',
            isAddToCartDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#415a77]',
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
    </div>
    <Notification
      v-if="showNotification"
      message="Please log in to add items to your cart"
      :duration="3000"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import StarRating from "./StarRating.vue";
import Notification from "./ButtonDisabledNotification.vue"
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const showNotification = ref(false);

const isAddToCartDisabled = computed(() => !authStore.isLoggedIn);

const handleAddToCart = () => {
  if (authStore.isLoggedIn) {
    cartStore.addToCart(props.product);
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
