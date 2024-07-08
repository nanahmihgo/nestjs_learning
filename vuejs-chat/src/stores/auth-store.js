import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchClient } from '../plugins/fetchClient';  

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref(null);
  const token = ref(sessionStorage.getItem('token') || null);
  const error = ref(null);

  const setToken = (newToken) => {
    token.value = newToken;
    sessionStorage.setItem('token', newToken); 
  };

  const login = async ({ email, password }) => {
    try {
      const response = await fetchClient.post('/auth/login', { email, password });
      setToken(response.access_token);
      user.value = response.user;
      token.value = response.access_token;
      error.value = null;
    } catch (err) {
      error.value = 'Login failed: ' + err.message;
    }
  };
  
  const register = async ({email, name, password}) => {
    if (!email || !name || !password) {
      error.value = 'Email, name, and password are required';
      return;
    }

    try {
      const response = await fetchClient.post('/auth/register', { email, name, password });
      setToken(response.access_token);
      user.value = response.id;
      // user.value = response.user;
    } catch (err) {
      error.value = 'Registration failed: ' + err.message;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    sessionStorage.removeItem('token');
    error.value = null;
  };

  const checkToken = () => {
    const storedToken = sessionStorage.getItem('token'); 
    if (storedToken) {
      token.value = storedToken;
    }
  };

  const isLoggedIn = computed(() => !!token.value);

  return {
    user,
    token,
    error,
    login,
    logout,
    register,
    isLoggedIn,
    checkToken,
  };
});


