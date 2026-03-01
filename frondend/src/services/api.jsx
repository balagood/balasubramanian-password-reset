const API_URL = "https://password-reset-8g5f.onrender.com";
//const API_URL = "http://localhost:3000";

const api = {
  post: async (endpoint, body) => {
    console.log(API_URL.endpoint);
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errorText = await res.text(); // fallback if not JSON
      throw new Error(`Server error: ${res.status} - ${errorText}`);
    }
    return res.json();
  },

  get: async (endpoint) => {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
      const errorText = await res.text(); // fallback if not JSON
      throw new Error(`Server error: ${res.status} - ${errorText}`);
    }


    return res.json();
  }
  
};

export default api;