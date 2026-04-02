import React from 'react';
import { ImageOff, Star, Pencil, Trash2 } from 'lucide-react';
import { resolveMediaUrl } from '../../utils/mediaUrl';

const ProductsTable = ({ products, loading, onEdit, onDelete, categoriesMap = {} }) => {
  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading...</div>;
  }

  if (products.length === 0) {
    return <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No products found.</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
          <th style={{ padding: '16px 20px', fontWeight: '500', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thumbnail</th>
          <th style={{ padding: '16px 20px', fontWeight: '500', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name (Az)</th>
          <th style={{ padding: '16px 20px', fontWeight: '500', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
          <th style={{ padding: '16px 20px', fontWeight: '500', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
          <th style={{ padding: '16px 20px', fontWeight: '500', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Featured</th>
          <th style={{ padding: '16px 20px', fontWeight: '500', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const productId = product.id ?? product.Id;
          const categoryId = product.categoryId ?? product.CategoryId;
          const productName = product.nameAz ?? product.NameAz ?? product.nameEn ?? product.NameEn;
          const slug = product.slug ?? product.Slug;
          const isActive = product.isActive ?? product.IsActive;
          const isFeatured = product.isFeatured ?? product.IsFeatured;
          const imageUrls = product.imageUrls ?? product.ImageUrls ?? [];
          const thumbnail = imageUrls.length > 0 ? resolveMediaUrl(imageUrls[0]) : null;
          const categoryName = categoriesMap[categoryId] || `#${categoryId ?? '-'}`;

          return (
            <tr
              key={productId}
              style={{ borderBottom: '1px solid var(--color-border)', height: '64px' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <td style={{ padding: '0 20px' }}>
                {thumbnail ? (
                  <img src={thumbnail} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                ) : (
                  <div style={{ width: '48px', height: '48px', borderRadius: '6px', backgroundColor: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
                    <ImageOff size={20} />
                  </div>
                )}
              </td>
              <td style={{ padding: '0 20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{productName}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{slug}</div>
              </td>
              <td style={{ padding: '0 20px' }}>
                <span style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-secondary)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', border: '1px solid var(--color-border)' }}>
                  {categoryName}
                </span>
              </td>
              <td style={{ padding: '0 20px' }}>
                {isActive ? (
                  <span style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: 'var(--color-success)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>Active</span>
                ) : (
                  <span style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-secondary)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>Inactive</span>
                )}
              </td>
              <td style={{ padding: '0 20px', textAlign: 'center' }}>
                <Star size={18} color={isFeatured ? '#f59e0b' : 'var(--color-text-muted)'} fill={isFeatured ? '#f59e0b' : 'none'} style={{ margin: '0 auto' }} />
              </td>
              <td style={{ padding: '0 20px', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="admin-btn-icon" style={{ color: 'var(--color-text-secondary)' }} onClick={() => onEdit?.(product)}>
                    <Pencil size={18} />
                  </button>
                  <button
                    className="admin-btn-icon"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onClick={() => onDelete?.(product)}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; e.currentTarget.style.backgroundColor = 'var(--color-accent-muted)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'; }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsTable;
