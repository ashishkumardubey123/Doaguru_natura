import axios from 'axios';

const API_BASE_URL = "http://localhost:5000" || '';

export const registerAdmin = async (name, email, phone, role, password) => {
 try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/register`, 
      { Name: name, Email: email, Phone: phone, Role: role, Password: password },
      { withCredentials: true } // <--- YEH LINE ADD KAREIN
    );
    return response.data;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw error;
  }
};

export const loginAdmin = async (email, password) => {
 try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/login`, 
      { Email: email, Password: password },
      { withCredentials: true } // <--- YEH LINE SABSE ZAROORI HAI COOKIE SAVE KARNE KE LIYE
    );
    return response.data;
  } catch (error) {
    console.error('Error logging in admin:', error);
    throw error;
  }
};

export const logoutAdmin = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error logging out admin:', error);
    throw error;
  }
};