const API_URL = "http://localhost:3000";

const api = {
  post: async (endpoint, body) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return res.json();
  },
  get: async (endpoint) => {
    const res = await fetch(`${API_URL}${endpoint}`);
    return res.json();
  }
};

export default api;