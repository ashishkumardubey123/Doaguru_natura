'use client';

import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { fetchFormsData, submitFormsData, updateFormStatus } from '../app/api/formsApi';
import { UserContext } from './UserContext';

export const FormsContext = createContext();

const initialAccessState = {
  status: 'idle',
  message: ''
};

export const FormsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessState, setAccessState] = useState(initialAccessState);

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

  useEffect(() => {
    if (!user?.token) {
      setForms([]);
      setAccessState(initialAccessState);
      setCurrentPage(1);
    }
  }, [user?.token]);

  const fetchForms = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await fetchFormsData(user.token);

      if (Array.isArray(data)) {
        setForms([...data].reverse());
        setAccessState({ status: 'allowed', message: '' });
        return;
      }

      if (data?.isPending) {
        setForms([]);
        setAccessState({
          status: 'pending',
          message: data.message || 'status pending waiting for approvel'
        });
        return;
      }

      const fallbackData = Array.isArray(data?.data) ? data.data : [];
      setForms([...fallbackData].reverse());
      setAccessState({ status: 'allowed', message: data?.message || '' });
    } catch (error) {
      setForms([]);
      setAccessState({
        status: 'error',
        message: error.response?.data?.message || error.message || 'Failed to fetch forms'
      });
      console.error('Failed to fetch forms', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const submitForm = async (type, data) => {
    try {
      await submitFormsData(type, data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || 'Submission failed' };
    }
  };

  const updateStatus = useCallback(async (id, status, tableName) => {
    if (!user) return { success: false, message: 'Not authenticated' };
    try {
      await updateFormStatus(id, status, tableName, user?.token);
      await fetchForms();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message || 'Update failed' };
    }
  }, [fetchForms, user]);

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
      accessState,
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
