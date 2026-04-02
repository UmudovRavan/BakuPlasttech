import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.featured && <div className="featured-badge">Featured</div>}
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">
          {product.description}
        </p>
        
        <button className="product-link">
          View Details
          <ArrowRight size={14} className="info-strip-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
