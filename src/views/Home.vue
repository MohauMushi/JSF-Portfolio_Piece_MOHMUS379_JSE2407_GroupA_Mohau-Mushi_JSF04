<template>
  <div class="container mx-auto px-4">
    <!-- Loading state -->
    <div v-if="loading">
      <SkeletonLoader :count="8" />
    </div>
    <!-- Error state -->
    <div v-else-if="error">
      <p
        class="text-center text-red-500 font-extrabold p-4 flex items-center justify-center"
      >
        {{ error }}
      </p>
    </div>
    <!-- Content state -->
    <div v-else>
      <div class="mb-6 flex flex-wrap items-center justify-between">
        <CategoryFilter
          :categories="categories"
          :selectedCategory="filterSortStore.selectedCategory"
          @filterChange="handleCategoryChange"
        />
        <SearchBar @search="handleSearch" />
        <PriceSort
          :selectedSort="filterSortStore.sortOrder"
          @sortChange="handleSortChange"
        />
      </div>
      <!-- No products found message -->
      <p
        v-if="filteredAndSortedProducts.length === 0"
        class="text-center text-red-500 font-extrabold p-4 flex items-center justify-center"
      >
        No products found.
      </p>
      <!-- Product grid -->
      <ProductGrid v-else :products="filteredAndSortedProducts" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../store/ProductStore.js";
import { useFilterSortStore } from "../store/FilterSortStore.js";
import ProductGrid from "../components/ProductGrid.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import PriceSort from "../components/PriceSort.vue";
import SearchBar from "../components/SearchBar.vue";

/**
 * @component Home
 * @description The main component for the home page, displaying products with filtering, sorting, and search functionality.
 */
export default {
  name: "Home",
  components: {
    ProductGrid,
    SkeletonLoader,
    CategoryFilter,
    PriceSort,
    SearchBar,
  },
  setup() {
    /**
     * @type {import('vue').Ref<boolean>}
     * @description Indicates whether the component is in a loading state.
     */
    const loading = ref(true);

    /**
     * @type {import('vue').Ref<string>}
     * @description The current search term entered by the user.
     */
    const searchTerm = ref("");

    /**
     * @type {Object}
     * @description Store for managing product data and operations.
     */
    const productStore = useProductStore();

    /**
     * @type {Object}
     * @description Store for managing filtering and sorting state.
     */
    const filterSortStore = useFilterSortStore();

    /**
     * @type {import('vue').ComputedRef<Array>}
     * @description Computed property that returns filtered and sorted products based on current filters, sort order, and search term.
     */
    const filteredAndSortedProducts = computed(() => {
      return productStore.products
        .filter((product) => {
          const categoryMatch = filterSortStore.selectedCategory
            ? product.category === filterSortStore.selectedCategory
            : true;
          const searchMatch = product.title
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase());
          return categoryMatch && searchMatch;
        })
        .sort((a, b) => {
          if (filterSortStore.sortOrder === "asc") return a.price - b.price;
          if (filterSortStore.sortOrder === "desc") return b.price - a.price;
          return 0;
        });
    });

    /**
     * @function
     * @async
     * @description Fetches products and categories on component mount.
     */
    onMounted(async () => {
      try {
        await productStore.fetchProducts();
        await productStore.fetchCategories();
      } catch (e) {
        productStore.error = "An error occurred while fetching products.";
      } finally {
        loading.value = false;
      }
    });

    /**
     * @function
     * @param {string} category - The selected category.
     * @description Handles category change event from CategoryFilter component.
     */
    const handleCategoryChange = (category) => {
      filterSortStore.setSelectedCategory(category);
    };

    /**
     * @function
     * @param {string} order - The selected sort order ('asc' or 'desc').
     * @description Handles sort order change event from PriceSort component.
     */
    const handleSortChange = (order) => {
      filterSortStore.setSortOrder(order);
    };

    /**
     * @function
     * @param {string} term - The search term entered by the user.
     * @description Handles search event from SearchBar component.
     */
    const handleSearch = (term) => {
      searchTerm.value = term;
    };

    return {
      loading,
      error: computed(() => productStore.error),
      categories: computed(() => productStore.categories),
      filteredAndSortedProducts,
      filterSortStore,
      handleCategoryChange,
      handleSortChange,
      handleSearch,
    };
  },
};
</script>
