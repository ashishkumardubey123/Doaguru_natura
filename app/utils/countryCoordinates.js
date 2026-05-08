import axios from 'axios';

export const fetchAllCountryCoordinates = async () => {
  try {
    // Apne Node.js backend ka sahi URL yahan dalein
    //  const baseUrl = `http://localhost:5000`
    const baseUrl = "https://natura-backend-xct1.onrender.com"
    const response = await axios.get(`${baseUrl}/api/contry/AllCountries`);
    
    if (response.data.success) {
      return response.data.data; // Ye database ki saari countries return karega
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch country coordinates from backend:", error);
    return [];
  }
};