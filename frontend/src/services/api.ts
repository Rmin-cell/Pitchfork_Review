import axios, { AxiosInstance, AxiosError } from "axios";
import { Album } from "../types";

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(
      `Response received from ${response.config.url}:`,
      response.status
    );
    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    console.error("Response error:", error);

    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "Server error occurred";
      throw new Error(`${error.response.status}: ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error: Unable to connect to server");
    } else {
      // Something else happened
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
);

// API service functions using functional programming
export const fetchAlbums = async (): Promise<Album[]> => {
  try {
    const response = await api.get<Album[]>("/api/albums");
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
};

// Utility function to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get("/api/albums");
    return response.status === 200;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

// Function to retry failed requests
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error("All retries failed");
};

export default api;
