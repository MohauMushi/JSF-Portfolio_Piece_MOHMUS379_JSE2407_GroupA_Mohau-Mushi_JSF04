import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null
  }),
  actions: {
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