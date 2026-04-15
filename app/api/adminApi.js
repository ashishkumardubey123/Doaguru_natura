import axios from 'axios';

// const API_BASE_URL = "https://jaipurdentalhospital.dentalguru.software"
const API_BASE_URL = "http://localhost:5000"

const getAuthConfig = (token) => ({
  withCredentials: true,
  headers: token
    ? {
        Authorization: `Bearer ${token}`
      }
    : undefined
});

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
    const response = await axios.post(`${API_BASE_URL}/api/admin/logout`, {}, getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error('Error logging out admin:', error);
    throw error;
  }
};

export const fetchPendingAdmins = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/pending`, getAuthConfig(token));
    return response.data;
  } catch (error) {
  if (error.response?.status !== 403) {
      console.error('Error fetching pending admins:', error);
    }
    // Error ko aage Context tak bhej do taaki wo apna kaam kar sake
    throw error;
  }
};

export const updateAdminStatus = async (id, status, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/admin/update-status/${id}`,
      { status },
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error updating admin status:', error);
    throw error;
  }
};

export const uploadExportShipments = async (formData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/shipments/upload-shipments`,
      formData,
      {
        ...getAuthConfig(token),
        headers: {
          ...getAuthConfig(token).headers,
          // usually axios sets multipart/form-data automatically for FormData
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading shipments:', error);
    throw error;
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/forgot-password`, { 
      Email: email 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/verify-otp`, { 
      Email: email, 
      otp: otp 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const resetPasswordApi = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/reset-password`, { 
      Email: email, 
      newPassword: newPassword 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
