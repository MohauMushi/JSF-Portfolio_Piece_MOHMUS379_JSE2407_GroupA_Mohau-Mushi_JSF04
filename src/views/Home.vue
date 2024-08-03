<template>
  <div class="container mx-auto px-4">
    <div class="mb-6 flex flex-wrap items-center justify-between">
      <div class="w-full md:w-auto mb-4 md:mb-0">
        <CategoryFilter />
      </div>
    </div>
    
    <div v-if="loading">
      <SkeletonLoader :count="8" />
    </div>
    <div v-else>
      <ProductGrid :products="filteredProducts" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../store/ProductStore.js";
import ProductGrid from "../components/ProductGrid.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";
import CategoryFilter from "../components/CategoryFilter.vue";

export default {
  name: "Home",
  components: {
    ProductGrid,
    SkeletonLoader,
    CategoryFilter,
  },
  setup() {
    const productStore = useProductStore();
    const filteredProducts = computed(() => productStore.filteredProducts);
    const loading = ref(true);

    onMounted(async () => {
      try {
        await productStore.fetchProducts();
        await productStore.fetchCategories();
      } catch (e) {
        error("An error occurred while fetching products.");
      } finally {
        setTimeout(() => {
          loading.value = false;
        }, 1300);
      }
    });

    return {
      loading,
      filteredProducts,
    };
  },
};
</script>