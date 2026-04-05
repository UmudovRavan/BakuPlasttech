import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';

const ProductCard = ({ product }) => {
  const { title, category, image, icon } = product;
  const detailPath = product?.slug ? `/products/${product.slug}` : '/products';

  return (
    <Link to={detailPath} className="product-card">
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
    </Link>
  );
};

export default ProductCard;
