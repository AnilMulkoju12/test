const API_BASE_URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_API_BASE_URL : `${window.location.origin}/api`;

console.log("API_BASE_URL",API_BASE_URL);
console.log("ENV:", import.meta.env);


export const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
