// Get the backend API URL based on environment
export const getAPIUrl = () => {
  // For local development
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || "http://localhost:5000";
  }
  
  // For production - use deployed backend
  return import.meta.env.VITE_API_URL || "https://amazon-clone-backend-c615.onrender.com";
};

export const API_URL = getAPIUrl();
