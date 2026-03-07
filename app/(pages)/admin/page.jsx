'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/dataContext/UserContext';
import { FormsContext } from '@/dataContext/FormsContext';
import { 
  LogOut, 
  CheckCircle, 
  Clock, 
  Loader2, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Briefcase, 
  Package, 
  FileText 
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading: userLoading, logout } = useContext(UserContext);
  const [updatingId, setUpdatingId] = useState(null);
  const { 
    forms, 
    loading: formsLoading, 
    fetchForms, 
    updateStatus, 
    currentRecords, 
    currentPage, 
    totalPages, 
    paginate 
  } = useContext(FormsContext);
  
  const router = useRouter();

  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.push('/admin/login');
      } else {
        fetchForms();
      }
    }
  }, [user, userLoading, router]);

  // ✅ FIX: function me tableName parameter add kiya
  const handleStatusChange = async (id, newStatus, tableName) => {
    setUpdatingId(id);
    const result = await updateStatus(id, newStatus, tableName);
    setUpdatingId(null);

    if (!result.success) {
      alert(result.message || 'Failed to update status');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Modern Loading Screen
  if (userLoading || formsLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#2A5C32]" />
      <p className="text-gray-500 font-medium animate-pulse tracking-wide">Loading Dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#2A5C32] selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sleek Gradient Header */}
      <header className="bg-gradient-to-r from-[#1a3c22] to-[#2A5C32] text-white py-4 px-6 md:px-10 flex justify-between items-center shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>
          </div>
          <div className="font-extrabold text-xl tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Natura Admin
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-2 bg-white/10 hover:bg-white/25 px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-semibold backdrop-blur-sm border border-white/5 hover:border-white/20 shadow-sm"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform duration-300" /> 
          Logout
        </button>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        {/* Page Title & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Form Submissions
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Manage and review all incoming requests</p>
          </div>
          <div className="bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm text-sm font-bold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2A5C32]"></span>
            Total Submissions: <span className="text-[#2A5C32] text-base">{forms.length}</span>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold">Date & Time</th>
                  <th className="p-5 font-bold">Type</th>
                  <th className="p-5 font-bold">Contact Info</th>
                  <th className="p-5 font-bold">Details</th>
                  <th className="p-5 font-bold text-center">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium text-slate-500">No submissions found yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                      {/* Date Column */}
                      <td className="p-5 align-top whitespace-nowrap">
                        <div className="text-sm font-semibold text-slate-700">
                          {new Date(sub.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(sub.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Type Column */}
                      <td className="p-5 align-top">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                          {sub.type}
                        </span>
                      </td>

                      {/* Contact Info Column */}
                      <td className="p-5 align-top">
                        <div className="font-bold text-slate-800 text-sm mb-2">
                          {sub.data.firstName} {sub.data.lastName} {sub.data.contactPerson && <span className="text-slate-500 font-normal">({sub.data.contactPerson})</span>}
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Mail size={14} className="text-slate-400" />
                            <a href={`mailto:${sub.data.email}`} className="hover:text-[#2A5C32] transition-colors">{sub.data.email}</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Phone size={14} className="text-slate-400" />
                            <a href={`tel:${sub.data.phone}`} className="hover:text-[#2A5C32] transition-colors">{sub.data.phone}</a>
                          </div>
                          {sub.data.company && (
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Building2 size={14} className="text-slate-400" />
                              <span className="font-medium">{sub.data.company}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Details Column */}
                      <td className="p-5 align-top max-w-md">
                        <div className="grid grid-cols-1 gap-2 mb-3">
                          {sub.data.country && (
                            <div className="flex items-start gap-2 text-sm text-slate-600">
                              <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                              <span><span className="font-semibold text-slate-700">Country:</span> {sub.data.country}</span>
                            </div>
                          )}
                          {sub.data.partnershipType && (
                            <div className="flex items-start gap-2 text-sm text-slate-600">
                              <Briefcase size={14} className="text-slate-400 mt-0.5 shrink-0" />
                              <span><span className="font-semibold text-slate-700">Type:</span> {sub.data.partnershipType}</span>
                            </div>
                          )}
                          {sub.data.supplyCategory && (
                            <div className="flex items-start gap-2 text-sm text-slate-600">
                              <Package size={14} className="text-slate-400 mt-0.5 shrink-0" />
                              <span><span className="font-semibold text-slate-700">Category:</span> {sub.data.supplyCategory}</span>
                            </div>
                          )}
                        </div>
                        
                        {sub.data.message && (
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 relative" title={sub.data.message}>
                            <span className="font-bold text-slate-700 block mb-1 text-xs uppercase tracking-wider">Message</span>
                            {sub.data.message}
                          </div>
                        )}
                        {sub.data.products && (
                          <div className="mt-2 text-sm text-slate-600 bg-emerald-50/50 p-2 rounded-md border border-emerald-50 inline-block">
                            <span className="font-bold text-[#2A5C32]">Products:</span> {sub.data.products}
                          </div>
                        )}
                      </td>

                      {/* Status Column */}
                      <td className="p-5 align-middle text-center">
                        {sub.status === 'new' ? (
                          <button 
                            // ✅ FIX: yahan pass kiya sub.tableName
                            onClick={() => handleStatusChange(sub.id, 'reviewed', sub.tableName)}
                            disabled={updatingId === sub.id}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full max-w-[140px] bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-full text-xs font-bold transition-all duration-200 hover:shadow-sm"
                          >
                            <Clock size={14} /> {updatingId === sub.id ? 'Updating...' : 'Mark Reviewed'}
                          </button>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full max-w-[140px] bg-slate-50 text-slate-500 border border-slate-200 rounded-full text-xs font-bold">
                            <CheckCircle size={14} className="text-emerald-500" /> Reviewed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-center gap-2 bg-slate-50/50">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    currentPage === number
                      ? 'bg-[#2A5C32] text-white shadow-md shadow-green-900/20 scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
