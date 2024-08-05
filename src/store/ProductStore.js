import { defineStore } from 'pinia'

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product
 * @property {string} title - The name of the product
 * @property {number} price - The price of the product
 * @property {string} description - A description of the product
 * @property {string} category - The category of the product
 * @property {string} image - The URL of the product image
 * @property {Object} rating - The rating information of the product
 * @property {number} rating.rate - The average rating of the product
 * @property {number} rating.count - The number of ratings for the product
 */

/**
 * @typedef {Object} ProductState
 * @property {Product[]} products - Array of products
 * @property {string[]} categories - Array of product categories
 * @property {boolean} loading - Loading state flag
 * @property {string|null} error - Error message, if any
 */

/**
 * Pinia store for managing products and categories
 * @type {import('pinia').Store<'products', ProductState>}
 */
export const useProductStore = defineStore('products', {
  /**
   * @returns {ProductState}
   */
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null
  }),
  actions: {
    /**
     * Fetches all products from the API
     * @async
     * @throws {Error} When the API request fails
     */
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://fakestoreapi.com/products`)
        if (!response.ok) throw new Error('Failed to fetch products')
        this.products = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetches all product categories from the API
     * @async
     * @throws {Error} When the API request fails
     */
    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://fakestoreapi.com/products/categories`)
        if (!response.ok) throw new Error('Failed to fetch categories')
        this.categories = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetches a single product by its ID
     * @async
     * @param {number} id - The ID of the product to fetch
     * @returns {Promise<Product|null>} The fetched product or null if an error occurred
     * @throws {Error} When the API request fails
     */
    async fetchProductById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        return await response.json()
      } catch (error) {
        this.error = error.message
        return null
      } finally {
        this.loading = false
      }
    }
  }
})