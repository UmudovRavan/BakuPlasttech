import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Loader2 } from 'lucide-react';
import '../admin.css';

const AdminLoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login, loading, error } = useAdminAuth();
    const [shake, setShake] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(credentials.username, credentials.password);
        if (res?.success) {
            navigate('/admin');
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    const gridBackground = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-base)',
        backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-main)'
    };

    const cardStyle = {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        margin: '0 20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transform: shake ? 'translateX(0)' : 'none',
        animation: shake ? 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both' : 'none',
    };

    return (
        <div className="admin-panel-container" style={gridBackground}>
            <style>
                {`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                `}
            </style>
            <div style={cardStyle}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    {/* Placeholder for BakuPlastTech logo - using text for now */}
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>
                        BAKUPLASTTECH
                    </div>
                    <div style={{ color: 'var(--color-accent)', fontSize: '14px', fontWeight: '600', marginTop: '4px', letterSpacing: '0.1em' }}>
                        ADMIN PANEL
                    </div>
                    <div style={{ height: '2px', width: '40px', backgroundColor: 'var(--color-accent)', margin: '16px auto 0' }} />
                </div>
                
                {error && (
                    <div style={{ 
                        padding: '12px', 
                        marginBottom: '20px', 
                        backgroundColor: 'var(--color-accent-muted)', 
                        color: 'var(--color-accent)', 
                        fontSize: '13px', 
                        border: '1px solid rgba(232, 25, 44, 0.3)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="admin-input"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="admin-input"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="admin-btn admin-btn-primary"
                        disabled={loading}
                        style={{ marginTop: '10px', padding: '12px' }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
