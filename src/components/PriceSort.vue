<template>
  <div class="w-full md:w-auto mb-4 md:mb-0">
    <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">
      Sort by Price:
    </label>
    <select
      id="sort"
      :value="selectedSort"
      @change="handleSortChange"
      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="">Default</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
/**
 * @component PriceSort
 * @description A component that allows users to sort products by price.
 */
export default {
  name: "PriceSort",

  /**
   * @property {Object} props - The properties that the component accepts.
   * @property {string} props.selectedSort - The currently selected sort order.
   */
  props: {
    selectedSort: {
      type: String,
      required: true,
    },
  },

  /**
   * @property {string[]} emits - The events that this component emits.
   */
  emits: ["sortChange"],

  /**
   * @function setup
   * @description The setup function for the component's composition API.
   * @param {Object} props - The component's props.
   * @param {Object} context - The setup context object.
   * @param {Function} context.emit - The function to emit events.
   * @returns {Object} An object containing the component's methods.
   */
  setup(props, { emit }) {
    /**
     * @function handleSortChange
     * @description Handles the change event of the sort select element.
     * @param {Event} event - The change event object.
     */
    const handleSortChange = (event) => {
      emit("sortChange", event.target.value);
    };

    return {
      handleSortChange,
    };
  },
};
</script>
