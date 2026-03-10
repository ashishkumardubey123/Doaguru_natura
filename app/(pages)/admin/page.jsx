'use client';

import { useState, useEffect, useContext, useMemo } from 'react';
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
  FileText,
  LayoutDashboard,
  Inbox,
  CheckSquare,
  UserCircle,
  Database,
  ExternalLink
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
  }, [user, userLoading, router, fetchForms]);

  const handleStatusChange = async (id, newStatus, tableName) => {
    setUpdatingId(id);
    const result = await updateStatus(id, newStatus, tableName);
    setUpdatingId(null);
    if (!result.success) alert(result.message || 'Failed to update status');
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const stats = useMemo(() => {
    const total = forms.length;
    const newSubmissions = forms.filter(f => f.status === 'new').length;
    const reviewed = forms.filter(f => f.status === 'reviewed').length;
    return { total, newSubmissions, reviewed };
  }, [forms]);

  const getDetailSection = (data) => {
    return data.companyProfile || data.details || data.message || '-';
  };

  if (userLoading || formsLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-5">
      <Loader2 className="w-12 h-12 text-[#2A5C32] animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse">Syncing Database...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* 🟢 Compact Topbar */}
      <header className="bg-[#1e293b] text-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-full mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} className="text-emerald-400" />
            <span className="font-bold text-lg tracking-tight">Natura <span className="text-emerald-400">Admin</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium bg-white/10 py-1 px-3 rounded text-slate-200 border border-white/5">
              <UserCircle size={14} />
              {user?.name || 'Admin'}
            </div>
            <button onClick={handleLogout} className="text-xs font-bold hover:text-red-400 transition-colors flex items-center gap-1">
              <LogOut size={14} /> LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        
        {/* 📊 Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Records', val: stats.total, icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Review', val: stats.newSubmissions, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Completed', val: stats.reviewed, icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className={`p-3 rounded-md ${s.bg} ${s.color}`}><s.icon size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{s.label}</p>
                <p className="text-xl font-black">{s.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 📋 Excel-Style Table Container */}
        <div className="bg-white rounded-lg border border-slate-300 shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tighter flex items-center gap-2">
              <Database size={16} /> Database Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300">
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase w-12 text-center">#</th>
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase">Timestamp</th>
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase">Source</th>
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase">Client Name</th>
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase">Contact Info</th>
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase">Company/Context</th>
                  <th className="px-4 py-2.5 border-r border-slate-300 text-[11px] font-bold text-slate-600 uppercase">Content</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold text-slate-600 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px] divide-y divide-slate-200">
                {currentRecords.length === 0 ? (
                  <tr><td colSpan="8" className="p-20 text-center text-slate-400 italic">No records found in database.</td></tr>
                ) : (
                  currentRecords.map((sub, idx) => (
                    <tr key={sub.id} className="hover:bg-blue-50/40 even:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-400 font-mono">
                        {(currentPage - 1) * 10 + (idx + 1)}
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">
                        <div className="font-semibold text-slate-700">{new Date(sub.date).toLocaleDateString('en-GB')}</div>
                        <div className="text-[10px] text-slate-400">{new Date(sub.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase">
                          {sub.type || sub.tableName}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 font-bold text-slate-800">
                        {sub.data.name || '-'}
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200">
                        <div className="flex flex-col gap-1">
                          {sub.data.email && (
                            <a href={`mailto:${sub.data.email}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 group w-fit">
                              <Mail size={12} /> {sub.data.email} 
                              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100" />
                            </a>
                          )}
                          {sub.data.phone && (
                            <a href={`tel:${sub.data.phone}`} className="text-emerald-700 font-semibold hover:text-emerald-900 flex items-center gap-1 group w-fit">
                              <Phone size={12} /> {sub.data.phone}
                              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200">
                        <div className="text-slate-700 font-medium">{sub.data.company || sub.data.country || '-'}</div>
                        <div className="text-[11px] text-slate-400 italic">{sub.data.supplyCategory || sub.data.partnership || ''}</div>
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 max-w-xs">
                        <p className="line-clamp-2 text-slate-600 leading-snug" title={getDetailSection(sub.data)}>
                          {getDetailSection(sub.data)}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {sub.status === 'new' ? (
                          <button 
                            onClick={() => handleStatusChange(sub.id, 'reviewed', sub.tableName)}
                            disabled={updatingId === sub.id}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black px-3 py-1.5 rounded shadow-sm flex items-center gap-1 mx-auto transition-all disabled:opacity-50"
                          >
                            {updatingId === sub.id ? <Loader2 size={12} className="animate-spin" /> : 'PENDING'}
                          </button>
                        ) : (
                          <span className="text-emerald-500 font-bold text-[10px] flex items-center justify-center gap-1">
                            <CheckCircle size={14} /> REVIEWED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 🎯 Excel Pagination */}
          {totalPages > 1 && (
            <div className="bg-slate-50 px-4 py-2 border-t border-slate-300 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => paginate(n)}
                    className={`px-3 py-1 text-xs font-bold rounded border transition-all ${
                      currentPage === n ? 'bg-[#1e293b] text-white border-[#1e293b]' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}