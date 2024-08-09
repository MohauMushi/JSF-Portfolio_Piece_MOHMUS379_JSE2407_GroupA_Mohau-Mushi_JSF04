<template>
  <div
    class="flex flex-col items-center justify-between bg-gradient-to-br from-teal-200 via-yellow-100 to-teal-200 min-h-[90vh]"
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
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
              <button
                type="button"
                @click="toggleShowPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <svg
                  class="h-6 w-6 text-gray-700"
                  fill="none"
                  @click="toggleShowPassword"
                  :class="{ hidden: showPassword, block: !showPassword }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewbox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>

                <svg
                  class="h-6 w-6 text-gray-700"
                  fill="none"
                  @click="toggleShowPassword"
                  :class="{ block: showPassword, hidden: !showPassword }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewbox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  ></path>
                </svg>
              </button>
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
              :disabled="isLoading || !username || !password"
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
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth.js";

const router = useRouter();
const authStore = useAuthStore();

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

  isLoading.value = true;
  error.value = "";

  try {
    await authStore.login(username.value, password.value);
    router.push(router.currentRoute.value.query.redirect || "/");
  } catch (err) {
    error.value = "Login failed. Please check your credentials and try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
