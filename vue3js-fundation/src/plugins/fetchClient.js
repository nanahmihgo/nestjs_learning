const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:8000';

export const fetchClient = {
  get: async (endpoint) => {
    // const token = sessionStorage.getItem('token'); 
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
  },
  post: async (endpoint, data) => {
    // const token = sessionStorage.getItem('token'); 
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
  },
  // You can add more methods (PUT, DELETE, etc.) as needed
};
