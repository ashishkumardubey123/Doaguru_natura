'use client';

import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { fetchFormsData, submitFormsData, updateFormStatus } from '../app/api/formsApi';
import { UserContext } from './UserContext';

export const FormsContext = createContext();

export const FormsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncRecordsPerPage = () => {
      setRecordsPerPage(mediaQuery.matches ? 6 : 5);
    };

    syncRecordsPerPage();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncRecordsPerPage);
      return () => mediaQuery.removeEventListener('change', syncRecordsPerPage);
    }

    mediaQuery.addListener(syncRecordsPerPage);
    return () => mediaQuery.removeListener(syncRecordsPerPage);
  }, []);

  const fetchForms = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const data = await fetchFormsData(user.token);
      setForms(Array.isArray(data) ? data.reverse() : []);
    } catch (error) {
      console.error('Failed to fetch forms', error);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  const submitForm = async (type, data) => {
    try {
      await submitFormsData(type, data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || 'Submission failed' };
    }
  };

  const updateStatus = useCallback(async (id, status, tableName) => {
    if (!user?.token) return { success: false, message: 'Not authenticated' };
    try {
      await updateFormStatus(id, status, tableName, user.token);
      await fetchForms();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || 'Update failed' };
    }
  }, [fetchForms, user?.token]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = forms.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(forms.length / recordsPerPage);

  useEffect(() => {
    const lastPage = Math.max(1, totalPages || 1);
    setCurrentPage((prevPage) => Math.min(prevPage, lastPage));
  }, [totalPages]);

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
      recordsPerPage,
      totalPages,
      paginate
    }}>
      {children}
    </FormsContext.Provider>
  );
};
