import { ref } from "vue";
import { defineStore } from "pinia";

/**
 * Pinia store for managing the application's theme.
 *
 */
export const useThemeStore = defineStore("theme", () => {
  /**
   * The current theme of the application, stored in the user's local storage.
   * @type {import('vue').Ref<'light' | 'dark'>}
   */
  const theme = ref(localStorage.getItem("theme") || "light");

  /**
   * Sets the current theme of the application and applies the corresponding styles.
   * @param {('light' | 'dark')} newTheme - The new theme to set.
   * @returns {void}
   */
  const setTheme = (newTheme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  /**
   * Toggles the current theme of the application between 'light' and 'dark'.
   * @returns {void}
   */
  const toggleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  /**
   * Applies the specified theme to the document's root element.
   * @param {('light' | 'dark')} currentTheme - The theme to apply.
   * @returns {void}
   */
  const applyTheme = (currentTheme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(currentTheme);
  };

  // Apply the initial theme
  applyTheme(theme.value);

  // Listen for system theme changes and update the theme accordingly
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    setTheme(newTheme);
  });

  return { theme, setTheme, toggleTheme };
});
