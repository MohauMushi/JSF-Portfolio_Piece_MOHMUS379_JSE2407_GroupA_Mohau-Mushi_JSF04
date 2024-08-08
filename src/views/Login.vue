<template>
  <div
    class="flex flex-col items-center justify-between bg-gradient-to-br from-teal-200 via-yellow-100 to-teal-200 min-h-screen"
  >
    <div class="flex-grow flex items-center justify-center w-full p-4">
      <div class="w-full max-w-md">
        <div
          class="bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl"
        >
          <h2 class="text-2xl font-semibold text-center mb-2 text-gray-800">
            Welcome Back
          </h2>
          <p class="text-sm text-center text-gray-600 mb-6">
            Sign in to continue to FluxStore
          </p>
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Username</label
              >
              <input
                type="text"
                id="username"
                v-model="username"
                required
                placeholder="Enter your username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Password</label
              >
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center">
                <input type="checkbox" v-model="showPassword" class="mr-2" />
                Show Password
              </label>
              <a href="#" class="text-teal-600 hover:underline"
                >Forgot Password?</a
              >
            </div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-3 rounded-lg hover:from-green-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? "Signing In..." : "Sign In" }}
              <svg
                v-if="!isLoading"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 inline-block ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="error" class="text-red-500 text-sm text-center mt-2">
              {{ error }}
            </div>
            <div class="text-center text-sm mt-4">
              <span class="text-gray-600">New to FluxStore?</span>
              <a href="#" class="text-teal-600 hover:underline ml-1 font-medium"
                >Create an account</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer class="w-full text-center text-sm text-gray-600 mb-16 p-4">
      <a href="#" class="hover:underline">Contact Us</a> •
      <span>&copy; {{ currentYear }} FluxStore All Rights Reserved</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const username = ref("");
const password = ref("");
const currentYear = computed(() => new Date().getFullYear());
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    error.value = "Username and password are required";
    return;
  }
};
</script>
