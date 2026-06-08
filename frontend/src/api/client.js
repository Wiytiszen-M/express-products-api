const API_URL = import.meta.env.VITE_API_URL;

const request = async (endpoint, options = {}) => {
  const { headers = {}, ...restOptions } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(
      "Server did not return JSON. Check API URL or backend route.",
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export default request;
