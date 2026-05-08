import axios from 'axios';

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://natura-backend-xct1.onrender.com"
export const fetchAllShipments = async (page = 1, limit = 50) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/shipments/get-shipments`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching global shipments:", error);
    throw error;
  }
};
