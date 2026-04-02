import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import ProductsTable from '../components/products/ProductsTable';
import { Plus, UploadCloud, X } from 'lucide-react';
import { resolveMediaUrl } from '../utils/mediaUrl';

const emptyForm = {
  id: null,
  nameAz: '',
  nameRu: '',
  nameEn: '',
  slug: '',
  categoryId: '',
  descriptionAz: '',
  descriptionRu: '',
  descriptionEn: '',
  specifications: '',
  isActive: true,
  isFeatured: false,
  imagesUpload: null,
  existingImages: [],
};

const readValue = (obj, key) => obj?.[key] ?? obj?.[`${key[0].toUpperCase()}${key.slice(1)}`];

const toBool = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return fallback;
};

const ToggleSwitch = ({ checked, onChange, name, activeColor }) => (
  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
    <div
      style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        backgroundColor: checked ? activeColor : 'var(--color-border-strong)',
        transition: 'background-color 0.2s',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: 'white',
          position: 'absolute',
          top: '2px',
          left: checked ? '20px' : '2px',
          transition: 'left 0.2s ease',
        }}
      />
    </div>
  </label>
);

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const categoriesMap = categories.reduce((acc, category) => {
    const categoryId = readValue(category, 'id');
    const categoryName = readValue(category, 'nameAz') || readValue(category, 'nameEn');
    if (categoryId != null) acc[categoryId] = categoryName;
    return acc;
  }, {});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        axiosInstance.get('/products'),
        axiosInstance.get('/categories'),
      ]);
      setProducts(productsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setFormData({
      id: readValue(product, 'id'),
      nameAz: readValue(product, 'nameAz') || '',
      nameRu: readValue(product, 'nameRu') || '',
      nameEn: readValue(product, 'nameEn') || '',
      slug: readValue(product, 'slug') || '',
      categoryId: String(readValue(product, 'categoryId') ?? ''),
      descriptionAz: readValue(product, 'descriptionAz') || '',
      descriptionRu: readValue(product, 'descriptionRu') || '',
      descriptionEn: readValue(product, 'descriptionEn') || '',
      specifications: readValue(product, 'specifications') || '',
      isActive: toBool(readValue(product, 'isActive'), true),
      isFeatured: toBool(readValue(product, 'isFeatured'), false),
      imagesUpload: null,
      existingImages: readValue(product, 'imageUrls') || [],
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setFormData(emptyForm);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files }));
      return;
    }

    setFormData((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
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
    data.append('CategoryId', String(formData.categoryId));
    data.append('DescriptionAz', formData.descriptionAz);
    data.append('DescriptionRu', formData.descriptionRu);
    data.append('DescriptionEn', formData.descriptionEn);
    data.append('Specifications', formData.specifications);
    data.append('IsActive', String(formData.isActive));
    data.append('IsFeatured', String(formData.isFeatured));

    if (formData.imagesUpload?.length > 0) {
      for (let index = 0; index < formData.imagesUpload.length; index += 1) {
        data.append('ImagesUpload', formData.imagesUpload[index]);
      }
    }

    try {
      if (modalMode === 'create') {
        await axiosInstance.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axiosInstance.put(`/products/${formData.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      alert(err.response?.data?.Message || 'Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const requestDeleteProduct = (product) => {
    setDeleteTarget(product);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteTarget) return;
    const productId = readValue(deleteTarget, 'id');
    try {
      await axiosInstance.delete(`/products/${productId}`);
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(err.response?.data?.Message || 'Failed to delete product.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 className="admin-page-title">Products</h1>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'var(--color-text-secondary)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500' }}>
            {products.length} products
          </span>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div style={{ backgroundColor: 'transparent', width: '100%' }}>
        <ProductsTable products={products} loading={loading} onEdit={openEditModal} onDelete={requestDeleteProduct} categoriesMap={categoriesMap} />
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '760px', maxHeight: '88vh', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', borderTop: '3px solid var(--color-accent)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                {modalMode === 'create' ? 'Add Product' : 'Edit Product'}
              </h2>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} disabled={isSaving}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
                <div>
                  <div className="admin-section-heading" style={{ marginBottom: '16px' }}>BASIC INFO</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Name (Az)</label>
                      <input type="text" name="nameAz" value={formData.nameAz} onChange={handleFormChange} className="admin-input" required />
                    </div>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Name (Ru)</label>
                      <input type="text" name="nameRu" value={formData.nameRu} onChange={handleFormChange} className="admin-input" required />
                    </div>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Name (En)</label>
                      <input type="text" name="nameEn" value={formData.nameEn} onChange={handleFormChange} className="admin-input" required />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Slug</label>
                      <input type="text" name="slug" value={formData.slug} onChange={handleFormChange} className="admin-input" required />
                    </div>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Category</label>
                      <select name="categoryId" value={formData.categoryId} onChange={handleFormChange} className="admin-input" required>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={readValue(category, 'id')} value={readValue(category, 'id')}>
                            {readValue(category, 'nameAz') || readValue(category, 'nameEn')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="admin-section-heading" style={{ marginBottom: '16px' }}>DESCRIPTION</div>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Description (Az)</label>
                      <textarea name="descriptionAz" value={formData.descriptionAz} onChange={handleFormChange} className="admin-input" rows={2} />
                    </div>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Description (Ru)</label>
                      <textarea name="descriptionRu" value={formData.descriptionRu} onChange={handleFormChange} className="admin-input" rows={2} />
                    </div>
                    <div>
                      <label className="admin-muted-label" style={{ display: 'block', marginBottom: '6px' }}>Description (En)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn} onChange={handleFormChange} className="admin-input" rows={2} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="admin-section-heading" style={{ marginBottom: '16px' }}>SPECIFICATIONS</div>
                  <textarea name="specifications" value={formData.specifications} onChange={handleFormChange} className="admin-input" rows={4} placeholder="Key: Value (one per line)" />
                </div>

                {modalMode === 'edit' && formData.existingImages.length > 0 && (
                  <div>
                    <div className="admin-section-heading" style={{ marginBottom: '16px' }}>CURRENT IMAGES</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                      {formData.existingImages.map((imageUrl, index) => (
                        <img key={`${imageUrl}-${index}`} src={resolveMediaUrl(imageUrl)} alt="" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="admin-section-heading" style={{ marginBottom: '16px' }}>
                    {modalMode === 'create' ? 'IMAGES' : 'ADD NEW IMAGES'}
                  </div>
                  <label style={{ display: 'block', cursor: 'pointer' }}>
                    <div style={{ border: '2px dashed var(--color-border-strong)', borderRadius: 'var(--radius-md)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
                      <UploadCloud size={32} color="var(--color-text-secondary)" style={{ marginBottom: '12px' }} />
                      <div style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                        {formData.imagesUpload?.length > 0 ? `${formData.imagesUpload.length} file(s) selected` : 'Click to select images'}
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>Multiple images supported.</div>
                      <input type="file" multiple name="imagesUpload" onChange={handleFormChange} accept="image/*" style={{ display: 'none' }} />
                    </div>
                  </label>
                </div>

                <div>
                  <div className="admin-section-heading" style={{ marginBottom: '16px' }}>SETTINGS</div>
                  <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <ToggleSwitch name="isActive" checked={formData.isActive} onChange={handleFormChange} activeColor="var(--color-accent)" />
                      <span style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: '500' }}>Active</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <ToggleSwitch name="isFeatured" checked={formData.isFeatured} onChange={handleFormChange} activeColor="#f59e0b" />
                      <span style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: '500' }}>Featured</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: 'var(--color-bg-elevated)' }}>
                <button type="button" onClick={closeModal} className="admin-btn admin-btn-ghost" disabled={isSaving}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : modalMode === 'create' ? 'Save Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '460px', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', borderTop: '3px solid var(--color-danger)' }}>
            <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>Delete Product</div>
              <div style={{ marginTop: '8px', color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                This action will permanently remove <strong style={{ color: 'white' }}>{readValue(deleteTarget, 'nameAz') || readValue(deleteTarget, 'nameEn')}</strong>.
              </div>
            </div>
            <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: 'var(--color-bg-elevated)' }}>
              <button type="button" onClick={() => setDeleteTarget(null)} className="admin-btn admin-btn-ghost">Cancel</button>
              <button type="button" onClick={confirmDeleteProduct} className="admin-btn admin-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
