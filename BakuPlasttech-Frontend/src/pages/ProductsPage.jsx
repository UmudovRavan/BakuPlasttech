import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import InnerHero from '../components/layout/common/InnerHero';
import ProductCard from '../components/products/ProductCard';
import ProductToolbar from '../components/products/ProductToolbar';
import { products, categories } from '../data/products';
import { Shield, Hammer, Zap, Settings } from 'lucide-react';
import Button from '../components/ui/Button';
import '../styles/products.css';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  useEffect(() => {
    const results = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(results);
  }, [searchTerm, activeCategory]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: null }
  ];

  return (
    <div className="products-page">
      <Header />
      
      {/* 1. Inner Hero */}
      <InnerHero 
        title="Our Products"
        description="Precision-engineered plastic solutions for construction, electrical infrastructure, and industrial applications."
        breadcrumbs={breadcrumbs}
      />

      <div className="products-content">
        <div className="container">
          {/* 2. Toolbar */}
          <ProductToolbar 
            resultsCount={filteredProducts.length} 
            onSearchChange={handleSearchChange} 
          />

          {/* 3. Category Quick Filter Chips */}
          <div className="category-chips">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-chip ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 4. Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <h3>No products found match your criteria.</h3>
              <p>Try refining your search or broadcategory choice.</p>
            </div>
          )}

          {/* 5. Pagination (Static for now) */}
          {filteredProducts.length > 0 && (
            <div className="pagination">
              <button className="page-btn disabled">Prev</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">Next</button>
            </div>
          )}
        </div>
      </div>

      {/* 6. Highlight Strip Info */}
      <section className="products-info-strip">
        <div className="info-strip-container">
          <div className="info-strip-item">
            <Shield size={20} className="info-strip-icon" />
            <span className="info-strip-text">Engineered for Durability</span>
          </div>
          <div className="info-strip-item">
            <Hammer size={20} className="info-strip-icon" />
            <span className="info-strip-text">Industrial Grade Materials</span>
          </div>
          <div className="info-strip-icon">
            <Zap size={20} className="info-strip-icon" />
            <span className="info-strip-text">Precision Manufacturing</span>
          </div>
          <div className="info-strip-item">
            <Settings size={20} className="info-strip-icon" />
            <span className="info-strip-text">Scalable Solutions</span>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="section cta industrial-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined cta-icon" style={{ color: '#FFFFFF', fontSize: '64px' }}>
            precision_manufacturing
          </span>
          <h2 className="cta-title" style={{ color: '#FFFFFF' }}>Need help choosing the right product?</h2>
          <p className="cta-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Our team can guide you to the best plastic construction solution for your technical needs.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '32px' }}>
             <Link to="/contact">
               <Button variant="white" className="btn-lg">Send Inquiry</Button>
             </Link>
             <Link to="/contact">
               <Button variant="outline" className="btn-lg" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>Contact Us</Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
