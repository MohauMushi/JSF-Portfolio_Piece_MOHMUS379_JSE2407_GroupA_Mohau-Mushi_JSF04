import { ref } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref(localStorage.getItem("theme") || "light");

  const setTheme = (newTheme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const applyTheme = (currentTheme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(currentTheme);
  };

  applyTheme(theme.value);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    setTheme(newTheme);
  });

  return { theme, setTheme, toggleTheme };
});
