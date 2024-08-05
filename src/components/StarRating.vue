<template>
  <!-- Container for the star rating display -->
  <div class="flex items-center mb-2">
    <!-- Render 5 star SVGs -->
    <svg
      v-for="star in 5"
      :key="star"
      :class="[
        'w-5 h-5',
        star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300',
      ]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <!-- SVG path for a star shape -->
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
    <!-- Placeholder for displaying additional rating information -->
    <span class="ml-2 text-sm text-gray-600"> {{}} </span>
  </div>
</template>

<script>
/**
 * @module StarRating
 * @vue-component
 * @description A component that displays a star rating based on a given numeric value.
 */
export default {
  name: "StarRating",
  props: {
    /**
     * @property {number} rating - The rating to be displayed (between 0 and 5).
     * @required
     */
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>
