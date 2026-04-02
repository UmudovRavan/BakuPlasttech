import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Grid3X3, MessageSquare, LogOut, Bell } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/categories', label: 'Categories', icon: Grid3X3 },
    { path: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare }
];

const AdminLayout = () => {
    const { logout, admin } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const currentTitle = navItems.find(item => location.pathname.startsWith(item.path))?.label || 'Admin Panel';

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside style={{ backgroundColor: '#0a0a0a', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--color-border)' }}>
                    {/* Placeholder for small white logo */}
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>
                        BAKUPLASTTECH
                    </div>
                    <div style={{ 
                        display: 'inline-block', 
                        backgroundColor: 'var(--color-accent)', 
                        color: 'white', 
                        fontSize: '10px', 
                        fontWeight: '700', 
                        padding: '2px 6px', 
                        borderRadius: 'var(--radius-sm)', 
                        marginTop: '8px',
                        letterSpacing: '0.05em'
                    }}>
                        ADMIN
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 20px',
                                    margin: '0 8px',
                                    borderRadius: 'var(--radius-md)',
                                    textDecoration: 'none',
                                    color: isActive ? 'white' : 'var(--color-text-secondary)',
                                    backgroundColor: isActive ? 'var(--color-accent-muted)' : 'transparent',
                                    borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
                                    fontWeight: isActive ? '500' : '400',
                                    transition: 'all 0.2s',
                                }}
                                className={isActive ? "" : "admin-nav-item"}
                            >
                                <Icon size={20} color={isActive ? 'var(--color-accent)' : 'currentColor'} />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {admin?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {admin?.username || 'Admin'}
                            </div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                                Administrator
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', 
                            width: '100%', padding: '10px', 
                            backgroundColor: 'transparent', border: 'none', 
                            color: 'var(--color-text-secondary)', cursor: 'pointer',
                            borderRadius: 'var(--radius-md)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                {/* Header */}
                <header style={{ 
                    height: '60px', 
                    backgroundColor: '#0a0a0a', 
                    borderBottom: '1px solid var(--color-border)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0 32px'
                }}>
                    <div className="admin-page-title" style={{ fontSize: '16px' }}>
                        {currentTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button className="admin-btn-icon">
                            <Bell size={20} />
                        </button>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {admin?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>
                
                {/* Scrollable Content */}
                <main style={{ 
                    flex: 1, 
                    backgroundColor: 'var(--color-bg-base)', 
                    padding: '28px 32px',
                    overflowY: 'auto'
                }}>
                    <Outlet />
                </main>
            </div>
            {/* Nav item hover style injected globally */}
            <style>
                {`
                .admin-nav-item:hover {
                    background-color: var(--color-bg-hover) !important;
                }
                `}
            </style>
        </div>
    );
};

export default AdminLayout;
