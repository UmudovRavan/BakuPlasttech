import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';
import '../../styles/home.css';

const FeaturedProductsSection = () => {
  return (
    <section className="section featured-products">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <SectionTitle 
            title="Featured Products" 
            subtitle="Our precision-molded solutions for modern infrastructure and electrical installations."
          />
        </div>
        
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
