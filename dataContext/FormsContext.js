'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { fetchFormsData, submitFormsData, updateFormStatus } from '../app/api/formsApi';
import { UserContext } from './UserContext';

export const FormsContext = createContext();

export const FormsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const fetchForms = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const data = await fetchFormsData(user.token);
      setForms(Array.isArray(data) ? data.reverse() : []); // Newest first
    } catch (error) {
      console.error('Failed to fetch forms', error);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (type, data) => {
    try {
      await submitFormsData(type, data);
      // Optionally re-fetch forms if needed, but usually not needed on client side immediately
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || 'Submission failed' };
    }
  };

  // ✅ FIX: Added tableName parameter here
  const updateStatus = async (id, status, tableName) => {
    if (!user?.token) return { success: false, message: 'Not authenticated' };
    try {
      // ✅ FIX: Passed tableName to the API function along with id, status, and token
      await updateFormStatus(id, status, tableName, user.token);
      await fetchForms(); // Re-fetch to get updated data
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || 'Update failed' };
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = forms.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(forms.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <FormsContext.Provider value={{
      forms,
      loading,
      fetchForms,
      submitForm,
      updateStatus,
      currentRecords,
      currentPage,
      totalPages,
      paginate
    }}>
      {children}
    </FormsContext.Provider>
  );
};
