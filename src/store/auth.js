import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

/**
 * Pinia store for authentication-related state and actions.
 * @returns {object} The authentication store instance.
 */
export const useAuthStore = defineStore("auth", {
  state: () => ({
    /**
     * The user's JWT token, stored in localStorage.
     * @type {string|null}
     */
    token: localStorage.getItem("jwt") || null,
    // /**
    //  * The user's information, stored in localStorage.
    //  * @type {object|null}
    //  */
    // user: JSON.parse(localStorage.getItem('user')) || null,
    /**
     * An object representing the alert state.
     * @type {object}
     * @property {boolean} show - Whether the alert is currently shown.
     * @property {string} message - The message to display in the alert.
     * @property {string} type - The type of the alert (e.g., 'success', 'error').
     */
    alert: {
      show: false,
      message: "",
      type: "success",
    },
    /**
     * An object representing the authentication modal state.
     * @type {object}
     * @property {boolean} isOpen - Whether the authentication modal is currently open.
     * @property {string} destination - The destination to redirect to after successful authentication.
     */
    authModal: {
      isOpen: false,
      destination: "",
    },
  }),
  getters: {
    /**
     * Checks if the user is logged in.
     * @returns {boolean} True if the user is logged in, false otherwise.
     */
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    /**
     * Logs the user in using the provided username and password.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} A Promise that resolves when the login is successful or rejects when it fails.
     */
    async login(username, password) {
      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        this.token = data.token;

        // const decodedToken = jwtDecode(this.token);
        // this.user = { ...decodedToken, username };

        localStorage.setItem("jwt", this.token);
        // localStorage.setItem('user', JSON.stringify(this.user));

        this.showAlert("Successfully logged in", "success");
      } catch (error) {
        // console.error('Login error:', error);
        this.showAlert(
          "Login failed. Please check your credentials and try again.",
          "error"
        );
        throw error;
      }
    },
    /**
     * Logs the user out by removing the token and user information from localStorage.
     * @returns {void}
     */
    logout() {
      this.token = null;
      // this.user = null;
      localStorage.removeItem("jwt");
      // localStorage.removeItem('user');
      this.showAlert("Successfully logged out", "success");
    },
    /**
     * Checks if the user is authenticated by retrieving the token and user information from localStorage.
     * @returns {void}
     */
    checkAuth() {
      const token = localStorage.getItem("jwt");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp) {
            this.token = token;
            // this.user = user;
          } else {
            this.logout();
          }
        } catch (error) {
          this.logout();
        }
      }
    },
    /**
     * Shows an alert with the specified message and type.
     * @param {string} message - The message to display in the alert.
     * @param {string} [type='success'] - The type of the alert (e.g., 'success', 'error').
     * @returns {void}
     */
    showAlert(message, type = "success") {
      this.alert = { show: true, message, type };
      setTimeout(() => {
        this.alert = { show: false, message: "", type: "success" };
      }, 3000);
    },
    /**
     * Shows the authentication modal with the specified destination.
     * @param {string} destination - The destination to redirect to after successful authentication.
     * @returns {void}
     */
    showAuthModal(destination) {
      this.authModal = { isOpen: true, destination };
    },
    /**
     * Hides the authentication modal.
     * @returns {void}
     */
    hideAuthModal() {
      this.authModal = { isOpen: false, destination: "" };
    },
  },
});
