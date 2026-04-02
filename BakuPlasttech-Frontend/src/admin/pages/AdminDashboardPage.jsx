import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Package, Grid3X3, MessageSquare, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, trend, isDangerValue }) => (
    <div style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    }}>
        <div style={{
            width: '40px', height: '40px', borderRadius: 'var(--radius-md)', 
            backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
        }}>
            <Icon size={20} />
        </div>
        <div style={{
            fontSize: '28px', fontWeight: '700', color: isDangerValue ? 'var(--color-danger)' : 'white', marginBottom: '4px'
        }}>
            {value}
        </div>
        <div className="admin-section-heading">
            {label}
        </div>
        
        {trend && (
            <div style={{
                position: 'absolute', bottom: '24px', right: '24px',
                color: trend > 0 ? 'var(--color-success)' : 'var(--color-danger)',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '500'
            }}>
                {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(trend)}%
            </div>
        )}
    </div>
);

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({ products: 0, activeProducts: 0, categories: 0, inquiries: 0, unreadInquiries: 0 });
    const [recentInquiries, setRecentInquiries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pRes, cRes, iRes] = await Promise.all([
                    axiosInstance.get('/products'),
                    axiosInstance.get('/categories'),
                    axiosInstance.get('/inquiries')
                ]);
                
                const products = pRes.data || [];
                const inquiries = iRes.data || [];
                
                setStats({
                    products: products.length,
                    activeProducts: products.filter(p => p.isActive).length,
                    categories: (cRes.data || []).length,
                    inquiries: inquiries.length,
                    unreadInquiries: inquiries.filter(i => !i.isRead).length
                });

                setRecentInquiries(inquiries.slice(0, 5));
            } catch (err) {
                console.error('Xəta:', err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <StatCard 
                    icon={Package} 
                    value={stats.products} 
                    label="TOTAL PRODUCTS" 
                    trend={+12} 
                />
                <StatCard 
                    icon={Grid3X3} 
                    value={stats.categories} 
                    label="TOTAL CATEGORIES" 
                    trend={+2} 
                />
                <StatCard 
                    icon={MessageSquare} 
                    value={stats.unreadInquiries} 
                    label="UNREAD INQUIRIES" 
                    isDangerValue={stats.unreadInquiries > 0}
                />
                <StatCard 
                    icon={CheckCircle} 
                    value={stats.activeProducts} 
                    label="ACTIVE PRODUCTS" 
                    trend={+8} 
                />
            </div>

            <div>
                <h2 className="admin-section-heading" style={{ marginBottom: '16px' }}>RECENT INQUIRIES</h2>
                <div style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                    {recentInquiries.length === 0 ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No recent inquiries</div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Name</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Message</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Date</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentInquiries.map((inq) => (
                                    <tr 
                                        key={inq.id} 
                                        style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}
                                        onClick={() => navigate('/admin/inquiries')}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <td style={{ padding: '16px 20px', color: 'white', fontWeight: '500' }}>{inq.fullName}</td>
                                        <td style={{ padding: '16px 20px', color: 'var(--color-text-primary)' }}>
                                            {(inq.message || '').length > 40 ? (inq.message || '').substring(0, 40) + '...' : inq.message}
                                        </td>
                                        <td style={{ padding: '16px 20px', color: 'var(--color-text-muted)' }}>
                                            {new Date(inq.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                            {inq.isRead ? (
                                                <span style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: 'var(--color-success)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                                    Read
                                                </span>
                                            ) : (
                                                <span style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-danger)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                                    Unread
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
