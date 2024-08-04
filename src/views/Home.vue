<template>
  <div class="container mx-auto px-4">
    <div class="mb-6 flex flex-wrap items-center justify-between">
      <CategoryFilter
        :categories="categories"
        @filterChange="handleCategoryChange"
      />
      <PriceSort @sortChange="handleSortChange" />
    </div>

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
      <ProductGrid :products="filteredAndSortedProducts" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../store/ProductStore.js";
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
    const loading = ref(true);
    const selectedCategory = ref("");
    const sortOrder = ref("");

    const filteredAndSortedProducts = computed(() => {
      return productStore.products
        .filter((product) =>
          selectedCategory.value
            ? product.category === selectedCategory.value
            : true
        )
        .sort((a, b) => {
          if (sortOrder.value === "asc") return a.price - b.price;
          if (sortOrder.value === "desc") return b.price - a.price;
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
      selectedCategory.value = category;
    };

    const handleSortChange = (order) => {
      sortOrder.value = order;
    };

    return {
      loading,
      error: computed(() => productStore.error),
      categories: computed(() => productStore.categories),
      filteredAndSortedProducts,
      handleCategoryChange,
      handleSortChange,
    };
  },
};
</script>
