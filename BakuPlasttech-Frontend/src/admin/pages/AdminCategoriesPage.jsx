import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Plus, Grid3X3, Pencil, Trash2, UploadCloud, X } from 'lucide-react';
import { resolveMediaUrl } from '../utils/mediaUrl';

const emptyForm = {
  id: null,
  nameAz: '',
  nameRu: '',
  nameEn: '',
  slug: '',
  imageUpload: null,
};

const getCategoryValue = (category, key) => category?.[key] ?? category?.[`${key[0].toUpperCase()}${key.slice(1)}`];

const CategoryCard = ({ category, onEdit, onDelete, onView }) => {
  const categoryId = getCategoryValue(category, 'id');
  const imageUrl = resolveMediaUrl(getCategoryValue(category, 'imageUrl'));

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      onClick={() => onView?.(category)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ height: '140px', width: '100%', backgroundColor: '#0a0a0a', position: 'relative' }}>
        {imageUrl ? (
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
            <Grid3X3 size={40} />
          </div>
        )}
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
          {getCategoryValue(category, 'nameAz') || getCategoryValue(category, 'nameEn')}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          {getCategoryValue(category, 'slug')}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              backgroundColor: 'var(--color-bg-base)',
              color: 'var(--color-text-secondary)',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              border: '1px solid var(--color-border)',
            }}
          >
            Category
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="admin-btn-icon" onClick={(e) => { e.stopPropagation(); onEdit(category); }}>
              <Pencil size={16} />
            </button>
            <button
              className="admin-btn-icon"
              onClick={(e) => { e.stopPropagation(); onDelete(category); }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setModalMode('edit');
    setFormData({
      id: getCategoryValue(category, 'id'),
      nameAz: getCategoryValue(category, 'nameAz') || '',
      nameRu: getCategoryValue(category, 'nameRu') || '',
      nameEn: getCategoryValue(category, 'nameEn') || '',
      slug: getCategoryValue(category, 'slug') || '',
      imageUpload: null,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
      return;
    }

    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'nameAz') {
        next.slug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    if (modalMode === 'edit') {
      data.append('Id', String(formData.id));
    }
    data.append('NameAz', formData.nameAz);
    data.append('NameRu', formData.nameRu);
    data.append('NameEn', formData.nameEn);
    data.append('Slug', formData.slug);
    if (formData.imageUpload) {
      data.append('ImageUpload', formData.imageUpload);
    }

    try {
      if (modalMode === 'create') {
        await axiosInstance.post('/categories', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axiosInstance.put(`/categories/${formData.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      closeModal();
      fetchCategories();
    } catch (err) {
      console.error('Failed to save category:', err);
      alert(err.response?.data?.Message || 'Failed to save category.');
    } finally {
      setIsSaving(false);
    }
  };

  const requestDeleteCategory = (category) => {
    setDeleteTarget(category);
  };

  const openCategoryDetails = (category) => {
    setSelectedCategory(category);
  };

  const confirmDeleteCategory = async () => {
    if (!deleteTarget) return;
    const categoryId = getCategoryValue(deleteTarget, 'id');
    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
      alert(err.response?.data?.Message || 'Failed to delete category.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 className="admin-page-title">Categories</h1>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'var(--color-text-secondary)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500' }}>
            {categories.length} categories
          </span>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading...</div>
      ) : categories.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No categories found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {categories.map((category) => (
            <CategoryCard
              key={getCategoryValue(category, 'id')}
              category={category}
              onEdit={openEditModal}
              onDelete={requestDeleteCategory}
              onView={openCategoryDetails}
            />
          ))}
        </div>
      )}

      {selectedCategory && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 70, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '560px', maxWidth: '92vw', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', borderTop: '3px solid var(--color-accent)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>Category Details</h2>
              <button onClick={() => setSelectedCategory(null)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div style={{ padding: '20px', display: 'grid', gap: '14px' }}>
              {resolveMediaUrl(getCategoryValue(selectedCategory, 'imageUrl')) ? (
                <img
                  src={resolveMediaUrl(getCategoryValue(selectedCategory, 'imageUrl'))}
                  alt=""
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                />
              ) : null}
              <div style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>
                {getCategoryValue(selectedCategory, 'nameAz') || getCategoryValue(selectedCategory, 'nameEn')}
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                Slug: <span style={{ color: 'white' }}>{getCategoryValue(selectedCategory, 'slug') || '-'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                  <div className="admin-muted-label">Name (AZ)</div>
                  <div style={{ color: 'white', marginTop: '4px' }}>{getCategoryValue(selectedCategory, 'nameAz') || '-'}</div>
                </div>
                <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                  <div className="admin-muted-label">Name (RU)</div>
                  <div style={{ color: 'white', marginTop: '4px' }}>{getCategoryValue(selectedCategory, 'nameRu') || '-'}</div>
                </div>
                <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                  <div className="admin-muted-label">Name (EN)</div>
                  <div style={{ color: 'white', marginTop: '4px' }}>{getCategoryValue(selectedCategory, 'nameEn') || '-'}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'var(--color-bg-elevated)' }}>
              <button type="button" onClick={() => setSelectedCategory(null)} className="admin-btn admin-btn-ghost">Close</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '600px', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', borderTop: '3px solid var(--color-accent)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                {modalMode === 'create' ? 'Add Category' : 'Edit Category'}
              </h2>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} disabled={isSaving}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div>
                    <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Name (Az)</label>
                    <input type="text" name="nameAz" value={formData.nameAz} onChange={handleChange} className="admin-input" required />
                  </div>
                  <div>
                    <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Name (Ru)</label>
                    <input type="text" name="nameRu" value={formData.nameRu} onChange={handleChange} className="admin-input" required />
                  </div>
                  <div>
                    <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Name (En)</label>
                    <input type="text" name="nameEn" value={formData.nameEn} onChange={handleChange} className="admin-input" required />
                  </div>
                </div>

                <div>
                  <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="admin-input" required />
                </div>

                <div>
                  <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>
                    {modalMode === 'create' ? 'Cover Image' : 'Cover Image (optional)'}
                  </label>
                  <label style={{ display: 'block', cursor: 'pointer' }}>
                    <div style={{ border: '2px dashed var(--color-border-strong)', borderRadius: 'var(--radius-md)', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
                      <UploadCloud size={28} color="var(--color-text-secondary)" style={{ marginBottom: '8px' }} />
                      <div style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: '500' }}>
                        {formData.imageUpload ? formData.imageUpload.name : 'Select image'}
                      </div>
                      <input type="file" name="imageUpload" onChange={handleChange} accept="image/*" style={{ display: 'none' }} />
                    </div>
                  </label>
                </div>
              </div>
              <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: 'var(--color-bg-elevated)' }}>
                <button type="button" onClick={closeModal} className="admin-btn admin-btn-ghost" disabled={isSaving}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : modalMode === 'create' ? 'Save Category' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '460px', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', borderTop: '3px solid var(--color-danger)' }}>
            <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>Delete Category</div>
              <div style={{ marginTop: '8px', color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                This action will permanently remove <strong style={{ color: 'white' }}>{getCategoryValue(deleteTarget, 'nameAz') || getCategoryValue(deleteTarget, 'nameEn')}</strong>.
              </div>
            </div>
            <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: 'var(--color-bg-elevated)' }}>
              <button type="button" onClick={() => setDeleteTarget(null)} className="admin-btn admin-btn-ghost">Cancel</button>
              <button type="button" onClick={confirmDeleteCategory} className="admin-btn admin-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
