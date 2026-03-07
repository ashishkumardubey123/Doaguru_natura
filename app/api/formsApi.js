import axios from 'axios';

const API_BASE_URL = "http://localhost:5000" || '';

// 1. GET Request: Yahan 2nd parameter config hota hai
export const fetchFormsData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/form/data`, {
      withCredentials: true, // <--- YAHAN LAGAANA HAI
      headers: {
        Authorization: `Bearer ${token}` // (Agar Cookie set ho gayi hai toh iski zarurat nahi, par abhi ke liye rakh sakte hain)
      }
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

// 2. POST Request: Yahan 3rd parameter config hota hai (Data ke baad)
export const submitFormsData = async (type, data) => {
  try {
    const endpoint = type.replace(/\s+/g, '');

    let formattedData = {};

    if (type === "General Inquiry") {
      formattedData = {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Message: data.message
      };
    } else if (type === "Export Query") {
      formattedData = {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Company: data.company,
        Country: data.country,
        Products: data.products,
        Details: data.message
      };
    } else if (type === "Business Partnership") {
      formattedData = {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Company: data.company,
        Partnership: data.partnershipType,
        Details: data.message
      };
    } else if (type === "Supplier Registration") {
      formattedData = {
        Company: data.company,
        Name: data.contactPerson,
        Email: data.email,
        Phone: data.phone,
        SupplyCategory: data.supplyCategory,
        CompanyProfile: data.message
      };
    }

    const response = await axios.post(`${API_BASE_URL}/api/form/${endpoint}`, 
      formattedData, 
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

// 3. PATCH Request: Yahan bhi 3rd parameter config hota hai (Data ke baad)
export const updateFormStatus = async (id, status, tableName, token) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/form/update-status/${id}`, 
    { 
      status: status,
      tableName: tableName 
    }, 
    {
      withCredentials: true, // <--- YAHAN LAGAANA HAI (3rd parameter)
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating form status:', error);
    throw error;
  }
};
