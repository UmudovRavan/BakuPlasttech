import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { resolvePublicMediaUrl } from '../../utils/publicMediaUrl';
import { useLanguage } from '../../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  const image = resolvePublicMediaUrl(product?.imageUrls?.[0]) || 'https://via.placeholder.com/600x600?text=No+Image';
  const detailPath = product?.slug ? `/products/${product.slug}` : `/products`;

  return (
    <Link to={detailPath} className="product-card">
      <div className="product-image-container">
        {product.featured && <div className="featured-badge">Featured</div>}
        <img src={image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">
          {product.description}
        </p>
        
        <span className="product-link">
          {t('products.viewDetails')}
          <ArrowRight size={14} className="info-strip-icon" />
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
