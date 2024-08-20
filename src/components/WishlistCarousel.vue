<template>
  <div v-if="wishlistItems.length > 0" class="my-12 px-4">
    <h2
      class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200"
    >
      Your Wishlist
    </h2>
    <div class="relative max-w-7xl mx-auto">
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="item in wishlistItems"
            :key="item.id"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
          >
            <div
              class="flex flex-col h-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-lg shadow-slate-950/5 dark:shadow-gray-900/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-102 hover:shadow-xl dark:hover:shadow-gray-800/40"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-48 object-contain p-4"
              />
              <div class="p-4">
                <h3
                  class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2"
                >
                  {{ item.title }}
                </h3>
                <StarRating :rating="item.rating.rate" />
                <p class="text-xl font-bold text-teal-600 dark:text-teal-400">
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
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="showArrows"
        @click="prevSlide"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        :disabled="currentIndex === 0"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        v-if="showArrows"
        @click="nextSlide"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        :class="{ 'opacity-50 cursor-not-allowed': !hasMoreItems }"
        :disabled="!hasMoreItems"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
    <div v-if="showPagination" class="flex justify-center mt-4">
      <div v-for="(_, index) in pageCount" :key="index" class="mx-1">
        <button
          @click="goToPage(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="
            index === currentIndex
              ? 'bg-teal-600 scale-125'
              : 'bg-gray-300 hover:bg-gray-400'
          "
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useWishlistStore } from "../store/WishlistStore";
import StarRating from "../components/StarRating.vue";

const wishlistStore = useWishlistStore();
const currentIndex = ref(0);
const windowWidth = ref(window.innerWidth);

const wishlistItems = computed(() => wishlistStore.items);
const itemsPerPage = computed(() => {
  if (windowWidth.value >= 1024) return 4;
  if (windowWidth.value >= 768) return 3;
  if (windowWidth.value >= 640) return 2;
  return 1;
});

const pageCount = computed(() =>
  Math.ceil(wishlistItems.value.length / itemsPerPage.value)
);
const maxIndex = computed(() => Math.max(pageCount.value - 1, 0));

const showArrows = computed(
  () => wishlistItems.value.length > itemsPerPage.value
);
const showPagination = computed(
  () => wishlistItems.value.length > itemsPerPage.value
);

const hasMoreItems = computed(() => {
  const nextPageStart = (currentIndex.value + 1) * itemsPerPage.value;
  return nextPageStart < wishlistItems.value.length;
});

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextSlide = () => {
  if (hasMoreItems.value) {
    currentIndex.value++;
  }
};

const goToPage = (index) => {
  currentIndex.value = index;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  currentIndex.value = 0;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
