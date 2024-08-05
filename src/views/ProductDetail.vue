<template>
  <div class="flex flex-col">
    <!-- Back to Products link -->
    <div>
      <router-link
        to="/"
        class="inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
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
          class="bg-white md:flex rounded-lg shadow-md p-6"
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
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
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
                <span
                  >{{ product.rating.rate }} ({{
                    product.rating.count
                  }}
                  reviews)</span
                >
              </div>
              <!-- Category -->
              <p
                class="text-gray-500 px-2 py-1 bg-indigo-100 rounded-md text-xs font-medium mb-2 inline-block"
              >
                {{ product.category }}
              </p>
              <!-- Price -->
              <p class="text-black font-bold mb-2 text-xl">
                ${{ product.price.toFixed(2) }}
              </p>
              <!-- Add to cart button -->
              <button
                @click="addToCart"
                class="inline-flex items-center justify-center px-3 py-2 mt-2 bg-[#354961] text-white text-sm font-medium rounded-md hover:bg-[#415a77] transition-colors duration-300"
              >
                Add To Cart
              </button>
              <!-- Description -->
              <h3 class="text-black font-semibold mt-4 mb-2">Description</h3>
              <p class="text-gray-600">
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
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/ProductStore";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton.vue";

/**
 * @component ProductDetail
 * @description Displays detailed information about a single product.
 */
export default {
  name: "ProductDetail",
  components: {
    ProductDetailSkeleton,
  },

  setup() {
    /**
     * @constant {Object} route - Vue Router instance for accessing route parameters
     */
    const route = useRoute();

    /**
     * @constant {Object} productStore - Product store instance for fetching product data
     */
    const productStore = useProductStore();

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

    /**
     * @function
     * @description Handles the "Add to Cart" button click
     * @todo Implement the actual cart functionality
     */
    const addToCart = () => {
      // console.log("Added to cart:", product.value.title);
    };

    return {
      product,
      loading,
      addToCart,
    };
  },
};
</script>
