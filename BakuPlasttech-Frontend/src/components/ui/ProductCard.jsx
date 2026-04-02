import React from 'react';
import '../../styles/home.css';

const ProductCard = ({ product }) => {
  const { title, category, image, icon } = product;

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="product-card-info">
        <div className="product-card-text">
          <span className="product-card-category">{category}</span>
          <h3 className="product-card-title">{title}</h3>
        </div>
        {icon && <span className="material-symbols-outlined product-card-icon">{icon}</span>}
      </div>
    </div>
  );
};

export default ProductCard;
