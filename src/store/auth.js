import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt') || null,
    // user: JSON.parse(localStorage.getItem('user')) || null,
    alert: {
      show: false,
      message: '',
      type: 'success'
    },
    authModal: {
      isOpen: false,
      destination: ''
    }
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        this.token = data.token;
        
        // const decodedToken = jwtDecode(this.token);
        // this.user = { ...decodedToken, username };
        
        localStorage.setItem('jwt', this.token);
        // localStorage.setItem('user', JSON.stringify(this.user));
        
        this.showAlert('Successfully logged in', 'success');
      } catch (error) {
        // console.error('Login error:', error);
        this.showAlert('Login failed', 'error');
        throw error;
      }
    },
    logout() {
      this.token = null;
      // this.user = null;
      localStorage.removeItem('jwt');
      // localStorage.removeItem('user');
      this.showAlert('Successfully logged out', 'success');
    },
    checkAuth() {
      const token = localStorage.getItem('jwt');
      const user = JSON.parse(localStorage.getItem('user'));
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
    showAlert(message, type = 'success') {
      this.alert = { show: true, message, type };
      setTimeout(() => {
        this.alert = { show: false, message: '', type: 'success' };
      }, 3000);
    },
    showAuthModal(destination) {
      this.authModal = { isOpen: true, destination };
    },
    hideAuthModal() {
      this.authModal = { isOpen: false, destination: '' };
    }
  },
});