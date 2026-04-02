import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Trash2 } from 'lucide-react';

const AdminInquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All'); // All, Unread, Read

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/inquiries');
            setInquiries(response.data || []);
        } catch (err) {
            console.error('Xəta:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchInquiries(); }, []);

    const filteredInquiries = inquiries.filter(inq => {
        if (filter === 'Unread') return !inq.isRead;
        if (filter === 'Read') return inq.isRead;
        return true;
    });

    const markAsRead = async (id, e) => {
        e.stopPropagation();
        // Optimistic update
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, isRead: true } : i));
        try {
            await axiosInstance.put(`/inquiries/${id}/read`);
        } catch (err) {
            console.error(err);
            // Revert if err
            fetchInquiries();
        }
    };

    const deleteInquiry = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
        setInquiries(prev => prev.filter(i => i.id !== id));
        try {
            await axiosInstance.delete(`/inquiries/${id}`);
        } catch (err) {
            console.error(err);
            fetchInquiries();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['All', 'Unread', 'Read'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '999px',
                                fontSize: '13px',
                                fontWeight: '500',
                                backgroundColor: filter === f ? 'var(--color-accent)' : 'transparent',
                                color: filter === f ? 'white' : 'var(--color-text-secondary)',
                                border: filter === f ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>
                    Total: {filteredInquiries.length}
                </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading...</div>
                ) : filteredInquiries.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No inquiries found.</div>
                ) : (
                    filteredInquiries.map(inq => (
                        <div 
                            key={inq.id}
                            style={{
                                backgroundColor: !inq.isRead ? 'var(--color-bg-elevated)' : 'var(--color-bg-surface)',
                                border: '1px solid var(--color-border)',
                                borderLeft: !inq.isRead ? '3px solid var(--color-accent)' : '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '16px 20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'background-color 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = !inq.isRead ? 'var(--color-bg-elevated)' : 'var(--color-bg-surface)'}
                            onClick={() => console.log('Open modal for', inq.id)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: !inq.isRead ? 'var(--color-accent)' : 'var(--color-text-muted)' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '2px' }}>
                                        {inq.fullName}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                                        {inq.email} • {inq.phone}
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {inq.message}
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {inq.productId && (
                                    <span style={{ 
                                        backgroundColor: 'rgba(245, 158, 11, 0.12)', 
                                        color: '#f59e0b', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px', 
                                        fontWeight: '500' 
                                    }}>
                                        Re: Product
                                    </span>
                                )}
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                                    {new Date(inq.createdAt).toLocaleDateString()}
                                </span>
                                
                                {!inq.isRead && (
                                    <button 
                                        className="admin-btn-ghost" 
                                        style={{ padding: '4px 10px', fontSize: '12px' }}
                                        onClick={(e) => markAsRead(inq.id, e)}
                                    >
                                        Mark Read
                                    </button>
                                )}
                                <button 
                                    className="admin-btn-icon" 
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-danger)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    onClick={(e) => deleteInquiry(inq.id, e)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Modal placeholder */}
        </div>
    );
};

export default AdminInquiriesPage;
