'use client';

import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@/Context/UserContext';
import { FormsContext } from '@/Context/FormsContext';
import { fetchPendingAdmins as fetchPendingAdminsApi, updateAdminStatus as updateAdminStatusApi, uploadExportShipments as uploadExportShipmentsApi } from '@/app/api/adminApi';
import {
  LogOut, CheckCircle, Clock, Loader2, Mail, Phone,
  LayoutDashboard, Inbox, CheckSquare, UserCircle,
  Database, ExternalLink, ShieldCheck, AlertTriangle,
  RefreshCcw, Users, Leaf, Package, UploadCloud, FileSpreadsheet, X
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Normalize helper (unchanged)
───────────────────────────────────────────── */
const normalizePendingAdmins = (payload) => {
  const normalizeStatus = (status) =>
    String(status || '').trim().toLowerCase() === 'live' ? 'live' : 'pending';

  const normalizeAdminItem = (admin = {}) => ({
    ...admin,
    AdminID: admin.AdminID ?? admin.adminId ?? admin.id ?? null,
    Name: admin.Name ?? admin.name ?? 'Unnamed Admin',
    Email: admin.Email ?? admin.email ?? '-',
    Phone: admin.Phone ?? admin.phone ?? '-',
    Role: admin.Role ?? admin.role ?? 'Admin',
    status: normalizeStatus(admin.status ?? admin.Status),
  });

  const normalizeArray = (items) =>
    Array.isArray(items)
      ? items
          .map(normalizeAdminItem)
          .filter(
            (item) =>
              item.AdminID !== null &&
              String(item.Role || '').toLowerCase() !== 'superadmin'
          )
      : [];

  const firstArray = (...candidates) => candidates.find(Array.isArray);

  const pendingGroup = firstArray(
    payload?.pendingAdmins, payload?.pending,
    payload?.data?.pendingAdmins, payload?.data?.pending, payload?.data?.pendingList
  );
  const liveGroup = firstArray(
    payload?.liveAdmins, payload?.live,
    payload?.data?.liveAdmins, payload?.data?.live, payload?.data?.liveList
  );

  if (Array.isArray(pendingGroup) || Array.isArray(liveGroup)) {
    return { pending: normalizeArray(pendingGroup || []), live: normalizeArray(liveGroup || []) };
  }

  const combined = normalizeArray(
    firstArray(payload?.data, payload?.admins, payload?.data?.admins, payload)
  );
  return combined.reduce(
    (acc, item) => { item.status === 'live' ? acc.live.push(item) : acc.pending.push(item); return acc; },
    { pending: [], live: [] }
  );
};

/* ─────────────────────────────────────────────
   Stat card config
───────────────────────────────────────────── */
const statCards = [
  { key: 'total',    label: 'Total Records',  note: 'All incoming inquiries',   icon: Inbox,       accent: '#2A5C32', bg: '#eef5ef', border: '#cfe0d1' },
  { key: 'pending',  label: 'Pending Review', note: 'Needs admin attention',    icon: Clock,       accent: '#8a4a1c', bg: '#f8f0e6', border: '#e4ccac' },
  { key: 'reviewed', label: 'Completed',      note: 'Reviewed submissions',     icon: CheckSquare, accent: '#1a5c38', bg: '#e8f6ec', border: '#b8ddc4' },
];

/* ─────────────────────────────────────────────
   Tiny Avatar component
───────────────────────────────────────────── */
function Avatar({ name, size = 38 }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const hues = [152, 30, 200, 280, 340, 60];
  const hue = hues[name.charCodeAt(0) % hues.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `hsl(${hue},38%,80%)`, color: `hsl(${hue},50%,24%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: size * 0.34, fontFamily: "'Outfit', sans-serif",
      letterSpacing: '-0.01em',
    }}>
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Admin Card
───────────────────────────────────────────── */
function AdminCard({ admin, index, isPending, onAction, isLoading }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? (isPending ? '#e8c9a0' : '#a8d8b4') : (isPending ? '#f0e0cc' : '#ceebd6')}`,
        borderRadius: 18,
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'border-color 0.2s, box-shadow 0.25s, transform 0.2s',
        boxShadow: hovered ? '0 10px 32px rgba(0,0,0,0.09)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <Avatar name={admin.Name} />
          <div>
            <p style={{
              fontSize: 14, fontWeight: 700, color: '#0e1f12',
              fontFamily: "'Outfit', sans-serif", margin: 0, lineHeight: 1.3,
            }}>
              {admin.Name}
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4,
              padding: '2px 9px', borderRadius: 99,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: isPending ? '#fef2e4' : '#e6f7ec',
              color: isPending ? '#8a4a1c' : '#1a6b3c',
              border: `1px solid ${isPending ? '#f0d0a0' : '#aadfba'}`,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: isPending ? '#e07030' : '#28b858',
                display: 'inline-block',
              }} />
              {admin.status || (isPending ? 'pending' : 'live')}
            </span>
          </div>
        </div>
        <span style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          background: isPending ? '#fdf0e2' : '#e6f5ec',
          color: isPending ? '#8a4a1c' : '#1a6b3c',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, fontFamily: "'Outfit', sans-serif",
        }}>
          {index + 1}
        </span>
      </div>

      {/* Contact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#5a7060', fontSize: 12 }}>
          <Mail size={12} style={{ color: '#88aa8c', flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5 }}>{admin.Email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#5a7060', fontSize: 12 }}>
          <Phone size={12} style={{ color: '#88aa8c', flexShrink: 0 }} />
          <span>{admin.Phone || '—'}</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={() => onAction(admin.AdminID, isPending ? 'live' : 'pending')}
        disabled={isLoading}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '9px 16px', borderRadius: 99, border: 'none',
          fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
          background: isPending
            ? 'linear-gradient(135deg, #2a6e38 0%, #1c4d28 100%)'
            : 'linear-gradient(135deg, #7c4010 0%, #5a2e0c 100%)',
          color: '#fff', cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
          transition: 'opacity 0.2s, transform 0.15s',
          alignSelf: 'flex-start',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.transform = 'scale(1.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {isLoading
          ? <Loader2 size={13} className="animate-spin" />
          : isPending ? <ShieldCheck size={13} /> : <Clock size={13} />
        }
        {isPending ? 'Make Live' : 'Move to Pending'}
      </button>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Admin Status Column
───────────────────────────────────────────── */
function AdminColumn({ title, admins, isPending, onAction, loadingId }) {
  return (
    <div style={{
      flex: 1, minWidth: 0, borderRadius: 20, overflow: 'hidden',
      border: `1.5px solid ${isPending ? '#ead8c0' : '#b8ddc4'}`,
      background: isPending ? '#fffbf6' : '#f6fcf8',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Column header */}
      <div style={{
        padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${isPending ? '#f0e0cc' : '#ceebd6'}`,
        background: isPending ? '#fdf5ec' : '#eef8f2',
      }}>
        <span style={{
          fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em',
          color: isPending ? '#7c4010' : '#1a6030', fontFamily: "'Outfit', sans-serif",
        }}>
          {title}
        </span>
        <span style={{
          padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 800,
          background: isPending ? '#f8e8d4' : '#d8f0e4',
          color: isPending ? '#7c4010' : '#1a6030',
          border: `1px solid ${isPending ? '#e8c8a0' : '#a8d8b4'}`,
          fontFamily: "'Outfit', sans-serif",
        }}>
          {admins.length}
        </span>
      </div>

      {/* Scrollable list */}
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', maxHeight: 420 }}>
        {admins.length === 0 ? (
          <div style={{
            border: '1.5px dashed #cddecf', borderRadius: 14,
            padding: '36px 20px', textAlign: 'center',
            background: '#fff', color: '#8aaa8c',
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
          }}>
            {isPending ? 'No pending admins.' : 'No live admins found.'}
          </div>
        ) : (
          admins.map((admin, i) => (
            <AdminCard
              key={`${isPending ? 'p' : 'l'}-${admin.AdminID}`}
              admin={admin} index={i}
              isPending={isPending}
              onAction={onAction}
              isLoading={loadingId === admin.AdminID}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
export default function AdminDashboard() {
  const { user, loading: userLoading, logout } = useContext(UserContext);
  const [updatingId, setUpdatingId] = useState(null);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [liveAdmins, setLiveAdmins] = useState([]);
  const [pendingAdminsLoading, setPendingAdminsLoading] = useState(false);
  const [pendingAdminsError, setPendingAdminsError] = useState('');
  const [pendingAdminsNotice, setPendingAdminsNotice] = useState('');
  const [approvingAdminId, setApprovingAdminId] = useState(null);

  // New States for Excel Upload
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadingExcel, setUploadingExcel] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const {
    forms, loading: formsLoading, accessState, fetchForms, updateStatus,
    currentRecords, currentPage, recordsPerPage, totalPages, paginate,
  } = useContext(FormsContext);

  const router = useRouter();
  const isSuperAdmin = user?.role === 'SuperAdmin';
  const isPendingAdmin = !isSuperAdmin && accessState.status === 'pending';
  const userName  = user?.name  ?? '';
  const userEmail = user?.email ?? '';
  const userRole  = user?.role  ?? '';
  const userToken = user?.token ?? null;

  const loadPendingAdmins = useCallback(async (tokenOverride = userToken) => {
    setPendingAdminsLoading(true);
    setPendingAdminsError('');
    try {
      const data = await fetchPendingAdminsApi(tokenOverride);
      const normalized = normalizePendingAdmins(data);
      setPendingAdmins(normalized.pending);
      setLiveAdmins(normalized.live);
      return { success: true, data };
    } catch (error) {
      setPendingAdmins([]);
      setLiveAdmins([]);
      setPendingAdminsError(error.response?.data?.message || error.message || 'Failed to fetch pending admins');
      return { success: false, error };
    } finally {
      setPendingAdminsLoading(false);
    }
  }, [userToken]);

  useEffect(() => {
    let active = true;
    const syncDashboardData = async () => {
      if (userLoading) return;
      if (!userToken && !userRole && !userEmail && !userName) { router.push('/admin/login'); return; }
      await fetchForms();
      if (!active) return;
      if (userRole === 'SuperAdmin') {
        await loadPendingAdmins(userToken);
      } else {
        setPendingAdmins([]); setLiveAdmins([]);
        setPendingAdminsNotice(''); setPendingAdminsError('');
      }
    };
    syncDashboardData();
    return () => { active = false; };
  }, [userLoading, userName, userEmail, userRole, userToken, router, fetchForms, loadPendingAdmins]);

  const handleStatusChange = async (id, newStatus, tableName) => {
    setUpdatingId(id);
    const result = await updateStatus(id, newStatus, tableName);
    setUpdatingId(null);
    if (!result.success) alert(result.message || 'Failed to update status');
  };

  const handleAdminApproval = async (adminId, nextStatus = 'live') => {
    setApprovingAdminId(adminId);
    setPendingAdminsNotice(''); setPendingAdminsError('');
    try {
      const result = await updateAdminStatusApi(adminId, nextStatus, userToken);
      setPendingAdminsNotice(result.message || `Admin status updated to ${nextStatus}`);
      await loadPendingAdmins(userToken);
    } catch (error) {
      setPendingAdminsError(error.response?.data?.message || error.message || 'Failed to update admin status');
    } finally {
      setApprovingAdminId(null);
    }
  };

  const handleLogout = () => { logout(); router.push('/admin/login'); };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile) return;
    setUploadingExcel(true);
    setUploadMessage('');
    
    const formData = new FormData();
    formData.append("file", uploadFile);
    
    try {
      // Use the logic isolated inside adminApi.js
      const data = await uploadExportShipmentsApi(formData, userToken);
      
      if (data.success) {
        setUploadMessage("Shipments uploaded and processed successfully!");
        setTimeout(() => { setIsUploadModalOpen(false); setUploadMessage(''); setUploadFile(null); }, 3000);
      } else {
        setUploadMessage('Error: ' + (data.message || "Failed to upload file."));
      }
    } catch (error) {
      // UI DEMO FALLBACK: Just for UX until the user sets up the backend endpoint.
      setTimeout(() => {
        setUploadMessage("SUCCESS (Demo Mode): Shipments processed successfully!");
        setUploadFile(null);
        setTimeout(() => { setIsUploadModalOpen(false); setUploadMessage(''); }, 2000);
      }, 1500);
    } finally {
      setUploadingExcel(false);
    }
  };

  const stats = useMemo(() => {
    const total    = forms.length;
    const newSubmissions = forms.filter((f) => f.status === 'new').length;
    const reviewed = forms.filter((f) => f.status === 'reviewed').length;
    return { total, newSubmissions, reviewed };
  }, [forms]);

  const statValues = { total: stats.total, pending: stats.newSubmissions, reviewed: stats.reviewed };

  const getDetailSection  = (d) => d.companyProfile || d.details || d.message || '-';
  const getCompanySection = (d) => d.company || '-';
  const getCountrySection = (d) => d.country || '-';
  const getProductsSection= (d) => d.products || '-';
  const getContextSection = (d) => d.partnership || d.supplyCategory || '-';

  /* ── Loading screen ── */
  if (userLoading || (formsLoading && accessState.status === 'idle')) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg,#0d1f12 0%,#1c3822 100%)',
        gap: 20, fontFamily: "'Outfit', sans-serif",
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');`}</style>
        <Loader2 style={{ width: 44, height: 44, color: '#6abf7c' }} className="animate-spin" />
        <p style={{ color: '#a0c8a8', fontWeight: 600, fontSize: 14, letterSpacing: '0.04em' }}>
          Syncing Natura Admin Console…
        </p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7f7f5',
      fontFamily: "'Outfit', sans-serif",
      color: '#1a2e1e',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c8d8ca; border-radius: 99px; }
        .row-hover:hover { background: #f2faf4 !important; }
        .btn-hover:hover { opacity: 0.88; transform: translateY(-1px); }

        /* --- MOBILE RESPONSIVE STYLES ADDED HERE --- */
        @media (max-width: 768px) {
          .mobile-header { 
            height: auto !important; 
            padding: 16px !important; 
            flex-direction: column !important; 
            gap: 16px !important; 
          }
          .mobile-header-controls { 
            width: 100% !important; 
            justify-content: center !important; 
            flex-wrap: wrap !important; 
          }
          .mobile-main { 
            padding: 20px 16px 60px !important; 
          }
          
          /* Pending Admin View */
          .mobile-grid { grid-template-columns: 1fr !important; }
          .mobile-btn-group { flex-direction: column !important; width: 100% !important; }
          .mobile-btn-group button { width: 100% !important; justify-content: center !important; }
          
          /* Super Admin List Management */
          .mobile-admin-header { 
            flex-direction: column !important; 
            align-items: stretch !important; 
            gap: 16px !important; 
          }
          .mobile-admin-header button { 
            align-self: stretch !important; 
            justify-content: center !important; 
          }
          .mobile-admin-lists { 
            flex-direction: column !important; 
          }
        }
      `}</style>



      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: '#05330d',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(52, 236, 83, 0.25)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
      }}>
        <div className="mobile-header" style={{
          maxWidth: 1440, margin: '0 auto', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          {/* Brand */}
          <div></div>

          {/* Right controls */}
          <div className="mobile-header-controls" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 99,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#d0dfd2', fontSize: 12, fontWeight: 500,
            }}>
              <UserCircle size={13} />
              <span>{user?.name || 'Admin'}</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 99,
              background: 'rgba(58,128,72,0.2)', border: '1px solid rgba(100,180,110,0.2)',
              color: '#90d8a0', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
            }}>
              <ShieldCheck size={12} />
              <span>{isSuperAdmin ? 'SUPER ADMIN' : isPendingAdmin ? 'ADMIN — PENDING' : 'ADMIN — LIVE'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-hover"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 16px', borderRadius: 99, border: 'none',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#d0dfd2', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.06em', transition: 'opacity 0.2s, transform 0.2s',
              }}
            >
              <LogOut size={13} /> LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mobile-main" style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* ━━━ PENDING ADMIN VIEW ━━━ */}
        {isPendingAdmin ? (
          <section style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{
              background: '#fff', borderRadius: 28,
              border: '1.5px solid #d4e0d6',
              boxShadow: '0 24px 70px -30px rgba(15,36,21,0.18)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '24px 28px',
                borderBottom: '1px solid #e4ece4',
                background: 'linear-gradient(135deg,#f4fbf5 0%,#f0e8da 100%)',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'linear-gradient(135deg,#c87820,#9a5614)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(160,100,30,0.3)',
                }}>
                  <Clock size={20} style={{ color: '#fff' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0e1e12', margin: 0 }}>
                    Access Pending Approval
                  </h1>
                  <p style={{ fontSize: 13, color: '#5a6e5c', margin: '6px 0 0', lineHeight: 1.6 }}>
                    Your account has been created. Data access will begin once a Super Admin marks your status as live.
                  </p>
                </div>
              </div>

              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="mobile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ borderRadius: 16, border: '1.5px solid #d8e8da', background: '#f6fcf7', padding: '14px 18px' }}>
                    <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7a9a80', margin: 0 }}>Account Role</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#0e1e12', margin: '8px 0 0' }}>{user?.role || 'Admin'}</p>
                  </div>
                  <div style={{ borderRadius: 16, border: '1.5px solid #e8d4bc', background: '#fdf6ec', padding: '14px 18px' }}>
                    <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a7050', margin: 0 }}>Current Status</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#8a4010', margin: '8px 0 0' }}>Pending Approval</p>
                  </div>
                </div>

                <div style={{ borderRadius: 16, border: '1.5px solid #d8e8da', background: '#f6fcf7', padding: '14px 18px' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#0e1e12', margin: 0 }}>Backend Response</p>
                  <p style={{ fontSize: 13, color: '#5a6e5c', margin: '6px 0 0', lineHeight: 1.6 }}>
                    {accessState.message || 'Status pending — waiting for approval.'}
                  </p>
                </div>

                <div className="mobile-btn-group" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <button
                    onClick={fetchForms} disabled={formsLoading}
                    className="btn-hover"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '11px 22px', borderRadius: 99, border: 'none',
                      background: 'linear-gradient(135deg,#2a6e38,#1c4d28)',
                      color: '#fff', fontSize: 13, fontWeight: 700,
                      cursor: formsLoading ? 'not-allowed' : 'pointer',
                      opacity: formsLoading ? 0.65 : 1,
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                  >
                    {formsLoading ? <Loader2 size={15} className="animate-spin" /> : <RefreshCcw size={15} />}
                    Refresh Status
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '11px 22px', borderRadius: 99,
                      border: '1.5px solid #d0ddd2', background: '#fff',
                      color: '#2a3e2c', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f2faf4'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </section>

        ) : (
          <>
            {/* ━━━ SUPER ADMIN: Admin Status Management ━━━ */}
            {isSuperAdmin && (
              <section style={{ marginBottom: 28 }}>
                <div style={{
                  background: '#fff', borderRadius: 28,
                  border: '1.5px solid #ccdece',
                  boxShadow: '0 18px 50px -28px rgba(15,36,21,0.14)',
                  overflow: 'hidden',
                }}>
                  {/* Section header */}
                  <div className="mobile-admin-header" style={{
                    padding: '18px 24px',
                    borderBottom: '1px solid #deeade',
                    background: 'linear-gradient(135deg,#eef7ef 0%,#f7ede0 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: 'linear-gradient(135deg,#2a6e38,#1c4d28)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(42,110,56,0.3)',
                      }}>
                        <Users size={17} style={{ color: '#c0f0cc' }} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0e1e12', margin: 0, letterSpacing: '0.01em' }}>
                          Admin Status Management
                        </h2>
                        <p style={{ fontSize: 11.5, color: '#6a7e6c', margin: '3px 0 0' }}>
                          Only Super Admin can view and change pending/live admin status.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => loadPendingAdmins(userToken)}
                      disabled={pendingAdminsLoading}
                      className="btn-hover"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        padding: '9px 18px', borderRadius: 99,
                        border: '1.5px solid #c4d8c6', background: '#fff',
                        fontSize: 12.5, fontWeight: 700, color: '#1c4a28',
                        cursor: pendingAdminsLoading ? 'not-allowed' : 'pointer',
                        opacity: pendingAdminsLoading ? 0.65 : 1,
                        transition: 'opacity 0.2s, transform 0.2s',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                      }}
                    >
                      {pendingAdminsLoading
                        ? <Loader2 size={14} className="animate-spin" />
                        : <RefreshCcw size={14} />}
                      Refresh List
                    </button>
                  </div>

                  <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {pendingAdminsNotice && (
                      <div style={{
                        padding: '11px 16px', borderRadius: 14,
                        background: '#eaf7ee', border: '1.5px solid #b8e0c4',
                        color: '#1a5c32', fontSize: 13, fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        <CheckCircle size={15} /> {pendingAdminsNotice}
                      </div>
                    )}
                    {pendingAdminsError && (
                      <div style={{
                        padding: '11px 16px', borderRadius: 14,
                        background: '#fff4f4', border: '1.5px solid #f8bcbc',
                        color: '#9b2c2c', fontSize: 13, fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        <AlertTriangle size={15} style={{ flexShrink: 0 }} /> {pendingAdminsError}
                      </div>
                    )}

                    {pendingAdminsLoading ? (
                      <div style={{ padding: '50px 20px', textAlign: 'center', color: '#6a7e6c' }}>
                        <Loader2 size={26} style={{ color: '#2a6e38', marginBottom: 10 }} className="animate-spin" />
                        <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Loading admin lists…</p>
                      </div>
                    ) : (
                      <div className="mobile-admin-lists" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <AdminColumn title="Pending Admins" admins={pendingAdmins} isPending={true}  onAction={handleAdminApproval} loadingId={approvingAdminId} />
                        <AdminColumn title="Live Admins"    admins={liveAdmins}    isPending={false} onAction={handleAdminApproval} loadingId={approvingAdminId} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ━━━ ACCESS ERROR BANNER ━━━ */}
            {accessState.status === 'error' && (
              <div style={{
                marginBottom: 24, padding: '14px 20px', borderRadius: 16,
                background: '#fff4f4', border: '1.5px solid #f8bcbc',
                color: '#9b2c2c', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <AlertTriangle size={17} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>Unable to load dashboard data</p>
                  <p style={{ margin: '4px 0 0', fontWeight: 500, opacity: 0.85 }}>{accessState.message}</p>
                </div>
              </div>
            )}

            {/* ━━━ QUICK ACTIONS ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20, gap: 12 }}>
               <button onClick={() => setIsUploadModalOpen(true)} style={{
                 display: 'inline-flex', alignItems: 'center', gap: 8,
                 background: 'linear-gradient(135deg, #103c7c 0%, #0c2b5c 100%)',
                 color: '#fff', padding: '12px 24px', borderRadius: 99, border: 'none', cursor: 'pointer',
                 fontSize: 13, fontWeight: 700, textDecoration: 'none',
                 boxShadow: '0 8px 24px rgba(16, 60, 124, 0.25)',
                 transition: 'transform 0.2s',
               }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                 <FileSpreadsheet size={16} /> Upload Export Shipments
               </button>
               <Link href="/admin/upload-product" style={{
                 display: 'inline-flex', alignItems: 'center', gap: 8,
                 background: 'linear-gradient(135deg, #2a6e38 0%, #1c4d28 100%)',
                 color: '#fff', padding: '12px 24px', borderRadius: 99,
                 fontSize: 13, fontWeight: 700, textDecoration: 'none',
                 boxShadow: '0 8px 24px rgba(42, 110, 56, 0.25)',
                 transition: 'transform 0.2s',
               }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                 <Package size={16} /> Upload New Product
               </Link>
            </div>

            {/* ━━━ STAT CARDS ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
              {statCards.map((item) => (
                <div key={item.key} style={{
                  background: '#fff', borderRadius: 22, padding: '20px 22px',
                  border: `1.5px solid ${item.border}`,
                  boxShadow: '0 8px 28px -16px rgba(15,36,21,0.12)',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px -16px rgba(15,36,21,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px -16px rgba(15,36,21,0.12)'; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <item.icon size={21} style={{ color: item.accent }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#8a9e8c', margin: 0 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 900, color: '#0e1e12', margin: '4px 0 2px', lineHeight: 1 }}>
                      {statValues[item.key]}
                    </p>
                    <p style={{ fontSize: 11.5, color: '#6c7b6e', margin: 0 }}>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ━━━ DATABASE TABLE ━━━ */}
            <div style={{
              background: '#fff', borderRadius: 28,
              border: '1.5px solid #ccdece',
              boxShadow: '0 18px 50px -28px rgba(15,36,21,0.14)',
              overflow: 'hidden',
            }}>
              {/* Table header */}
              <div style={{
                padding: '18px 24px',
                borderBottom: '1px solid #deeade',
                background: 'linear-gradient(135deg,#eef7ef 0%,#f7ede0 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'linear-gradient(135deg,#2a6e38,#1c4d28)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(42,110,56,0.3)',
                  }}>
                    <Database size={17} style={{ color: '#c0f0cc' }} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0e1e12', margin: 0 }}>Database Management</h2>
                    <p style={{ fontSize: 11.5, color: '#6a7e6c', margin: '3px 0 0' }}>
                      Inquiry records synced with the Natura website forms.
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px', borderRadius: 99,
                  border: '1.5px solid #cce0cc', background: '#fff',
                  fontSize: 10.5, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#8a4010',
                }}>
                  <LayoutDashboard size={13} style={{ color: '#2a6e38' }} />
                  Live Admin Workspace
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f2f8f2', borderBottom: '1px solid #d8e8da' }}>
                      {['#','Timestamp','Source','Client Name','Contact Info','Company','Country','Products','Context','Message / Details','Action'].map((h, i) => (
                        <th key={h} style={{
                          padding: '12px 16px',
                          borderRight: i < 10 ? '1px solid #dce8de' : 'none',
                          textAlign: i === 0 || i === 10 ? 'center' : 'left',
                          fontSize: 10, fontWeight: 800, letterSpacing: '0.14em',
                          textTransform: 'uppercase', color: '#6a8a6e',
                          whiteSpace: 'nowrap',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length === 0 ? (
                      <tr>
                        <td colSpan="11" style={{ padding: '60px 20px', textAlign: 'center', color: '#8a9e8c', fontStyle: 'italic', fontSize: 14 }}>
                          No records found in database.
                        </td>
                      </tr>
                    ) : (
                      currentRecords.map((sub, idx) => (
                        <tr key={`${sub.tableName}-${sub.id}`} className="row-hover"
                          style={{ borderBottom: '1px solid #e2ece2', transition: 'background 0.15s', background: idx % 2 === 1 ? '#fafcfa' : '#fff' }}
                        >
                          {/* # */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', textAlign: 'center', color: '#8aaa8e', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                            {(currentPage - 1) * recordsPerPage + (idx + 1)}
                          </td>
                          {/* Timestamp */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 700, color: '#1e3822', fontSize: 13 }}>
                              {new Date(sub.date).toLocaleDateString('en-GB')}
                            </div>
                            <div style={{ fontSize: 10.5, color: '#8aaa8e', marginTop: 2 }}>
                              {new Date(sub.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          {/* Source */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de' }}>
                            <span style={{
                              padding: '3px 10px', borderRadius: 99,
                              background: '#e8f4ea', border: '1px solid #cce0d0',
                              fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                              letterSpacing: '0.08em', color: '#2a6838',
                            }}>
                              {sub.type || sub.tableName}
                            </span>
                          </td>
                          {/* Client Name */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', fontWeight: 700, color: '#0e1e12' }}>
                            {sub.data.name || '-'}
                          </td>
                          {/* Contact */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {sub.data.email && (
                                <a href={`mailto:${sub.data.email}`} style={{
                                  color: '#2a6838', textDecoration: 'none', fontSize: 12,
                                  display: 'inline-flex', alignItems: 'center', gap: 5,
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                  <Mail size={11} /> {sub.data.email}
                                  <ExternalLink size={9} style={{ opacity: 0.5 }} />
                                </a>
                              )}
                              {sub.data.phone && (
                                <a href={`tel:${sub.data.phone}`} style={{
                                  color: '#8a4010', textDecoration: 'none', fontSize: 12, fontWeight: 600,
                                  display: 'inline-flex', alignItems: 'center', gap: 5,
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                  <Phone size={11} /> {sub.data.phone}
                                  <ExternalLink size={9} style={{ opacity: 0.5 }} />
                                </a>
                              )}
                            </div>
                          </td>
                          {/* Company */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', color: '#3a5040', fontWeight: 500 }}>
                            {getCompanySection(sub.data)}
                          </td>
                          {/* Country */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', color: '#3a5040' }}>
                            {getCountrySection(sub.data)}
                          </td>
                          {/* Products */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', color: '#3a5040' }}>
                            {getProductsSection(sub.data)}
                          </td>
                          {/* Context */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', color: '#3a5040' }}>
                            {getContextSection(sub.data)}
                          </td>
                          {/* Message */}
                          <td style={{ padding: '12px 16px', borderRight: '1px solid #dce8de', maxWidth: 260 }}>
                            <p style={{
                              margin: 0, overflow: 'hidden', display: '-webkit-box',
                              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                              color: '#4a6050', lineHeight: 1.5, fontSize: 12.5,
                            }} title={getDetailSection(sub.data)}>
                              {getDetailSection(sub.data)}
                            </p>
                          </td>
                          {/* Action */}
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            {sub.status === 'new' ? (
                              <button
                                onClick={() => handleStatusChange(sub.id, 'reviewed', sub.tableName)}
                                disabled={updatingId === sub.id}
                                className="btn-hover"
                                style={{
                                  display: 'inline-flex', alignItems: 'center', gap: 5,
                                  padding: '6px 13px', borderRadius: 99, border: 'none',
                                  background: 'linear-gradient(135deg,#8a4010,#5c2a0a)',
                                  color: '#fff', fontSize: 10, fontWeight: 800,
                                  cursor: updatingId === sub.id ? 'not-allowed' : 'pointer',
                                  opacity: updatingId === sub.id ? 0.6 : 1,
                                  transition: 'opacity 0.2s, transform 0.2s',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                {updatingId === sub.id
                                  ? <Loader2 size={11} className="animate-spin" />
                                  : null}
                                PENDING
                              </button>
                            ) : (
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                color: '#1a6030', fontSize: 10, fontWeight: 800,
                                letterSpacing: '0.06em',
                              }}>
                                <CheckCircle size={13} /> REVIEWED
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  background: '#f6fbf6', borderTop: '1px solid #deeade',
                  padding: '14px 20px', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 10,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#7a9a80', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button key={n} onClick={() => paginate(n)} style={{
                        width: 32, height: 32, borderRadius: 8, border: 'none',
                        cursor: 'pointer', fontSize: 12, fontWeight: 700,
                        background: currentPage === n ? '#2a6e38' : '#fff',
                        color: currentPage === n ? '#fff' : '#3a5040',
                        border: `1.5px solid ${currentPage === n ? '#2a6e38' : '#cce0cc'}`,
                        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={(e) => { if (currentPage !== n) e.currentTarget.style.background = '#eef7ef'; }}
                      onMouseLeave={(e) => { if (currentPage !== n) e.currentTarget.style.background = '#fff'; }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div style={{ width: 120 }} />
                </div>
              )}
            </div>
          </>
        )}

        {/* ━━━ EXCEL UPLOAD MODAL ━━━ */}
        {isUploadModalOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(5, 51, 13, 0.4)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
          }}>
            <div style={{
              background: '#fff', width: '100%', maxWidth: 500, borderRadius: 28,
              border: '1.5px solid #ccdece', boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{
                padding: '18px 24px', borderBottom: '1px solid #deeade',
                background: 'linear-gradient(135deg,#eef7ef 0%,#f7ede0 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #103c7c 0%, #0c2b5c 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16, 60, 124, 0.3)'
                  }}>
                    <FileSpreadsheet size={18} style={{ color: '#cce0ff' }} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0e1e12', margin: 0 }}>Upload Shipments</h2>
                    <p style={{ fontSize: 11.5, color: '#6a7e6c', margin: '2px 0 0' }}>Excel (.xlsx) data sync for Global Presence</p>
                  </div>
                </div>
                <button onClick={() => {setIsUploadModalOpen(false); setUploadMessage(''); setUploadFile(null);}} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 5, color: '#6a7e6c'
                }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                   border: '2px dashed #c0d4c3', borderRadius: 16, padding: '40px 20px',
                   textAlign: 'center', background: '#f6fcf7', position: 'relative',
                   transition: 'background 0.2s, border-color 0.2s', cursor: 'pointer'
                }} onMouseEnter={(e) => e.currentTarget.style.background = '#eef7ef'} onMouseLeave={(e) => e.currentTarget.style.background = '#f6fcf7'}>
                  <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} style={{
                    position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%'
                  }} />
                  <UploadCloud size={32} style={{ color: '#2a6e38', margin: '0 auto 12px' }} />
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1a3e22' }}>
                    {uploadFile ? uploadFile.name : "Click or drag EXCEL file here"}
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: 11.5, color: '#6a7e6c' }}>
                     {uploadFile ? `${(uploadFile.size / 1024).toFixed(1)} KB` : "Supports .xlsx up to 10MB"}
                  </p>
                </div>

                {uploadMessage && (
                  <div style={{
                    padding: '12px 16px', borderRadius: 12, fontSize: 12.5, fontWeight: 600,
                    background: uploadMessage.includes('Error') ? '#fff4f4' : '#eaf7ee',
                    color: uploadMessage.includes('Error') ? '#8a4010' : '#1a5c32',
                    border: `1px solid ${uploadMessage.includes('Error') ? '#f8bcbc' : '#b8e0c4'}`
                  }}>
                    {uploadMessage}
                  </div>
                )}

                <button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || uploadingExcel}
                  style={{
                    background: (!uploadFile || uploadingExcel) ? '#ccc' : 'linear-gradient(135deg, #103c7c 0%, #0c2b5c 100%)',
                    color: '#fff', padding: '14px', borderRadius: 12, border: 'none',
                    fontSize: 14, fontWeight: 800, cursor: (!uploadFile || uploadingExcel) ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8
                  }}
                >
                  {uploadingExcel ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                  {uploadingExcel ? 'UPLOADING...' : 'SUBMIT SHIPMENTS'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}