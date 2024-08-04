<template>
  <div class="container mx-auto px-4">
    <div v-if="loading">
      <SkeletonLoader :count="8" />
    </div>
    <div v-else-if="error">
      <p
        class="text-center text-red-500 font-extrabold p-4 flex items-center justify-center"
      >
        {{ error }}
      </p>
    </div>
    <div v-else>
      <div class="mb-6 flex flex-wrap items-center justify-between">
        <CategoryFilter
          :categories="categories"
          :selectedCategory="filterSortStore.selectedCategory"
          @filterChange="handleCategoryChange"
        />
        <PriceSort
          :selectedSort="filterSortStore.sortOrder"
          @sortChange="handleSortChange"
        />
      </div>
      <p
        v-if="filteredAndSortedProducts.length === 0"
        class="text-center text-red-500 font-extrabold p-4 flex items-center justify-center"
      >
        No products found.
      </p>
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

export default {
  name: "Home",
  components: {
    ProductGrid,
    SkeletonLoader,
    CategoryFilter,
    PriceSort,
  },
  setup() {
    const productStore = useProductStore();
    const filterSortStore = useFilterSortStore();
    const loading = ref(true);

    const filteredAndSortedProducts = computed(() => {
      return productStore.products
        .filter((product) =>
          filterSortStore.selectedCategory
            ? product.category === filterSortStore.selectedCategory
            : true
        )
        .sort((a, b) => {
          if (filterSortStore.sortOrder === "asc") return a.price - b.price;
          if (filterSortStore.sortOrder === "desc") return b.price - a.price;
          return 0;
        });
    });

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

    const handleCategoryChange = (category) => {
      filterSortStore.setSelectedCategory(category);
    };

    const handleSortChange = (order) => {
      filterSortStore.setSortOrder(order);
    };

    return {
      loading,
      error: computed(() => productStore.error),
      categories: computed(() => productStore.categories),
      filteredAndSortedProducts,
      filterSortStore,
      handleCategoryChange,
      handleSortChange,
    };
  },
};
</script>
