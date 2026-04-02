import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const ProductForm = ({ categories, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        NameAz: '', NameRu: '', NameEn: '',
        CategoryId: '', Slug: '', IsActive: true
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/products', formData);
            onSuccess();
        } catch (err) {
            console.error('Xəta:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
                <h2 style={{ marginBottom: '1rem' }}>Məhsul Əlavə Et</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input placeholder="Ad (AZ)" onChange={e => setFormData({...formData, NameAz: e.target.value})} required style={{ padding: '0.5rem', border: '1px solid #ddd' }} />
                    <input placeholder="Slug" onChange={e => setFormData({...formData, Slug: e.target.value})} required style={{ padding: '0.5rem', border: '1px solid #ddd' }} />
                    <select onChange={e => setFormData({...formData, CategoryId: e.target.value})} required style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                        <option value="">Kateqoriya seçin</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.NameEn}</option>)}
                    </select>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {loading ? 'Yadda saxlanılır...' : 'Əlavə et'}
                        </button>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Bağla</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
