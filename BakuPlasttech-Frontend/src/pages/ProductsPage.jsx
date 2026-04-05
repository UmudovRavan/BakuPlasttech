import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import InnerHero from '../components/layout/common/InnerHero';
import ProductCard from '../components/products/ProductCard';
import ProductToolbar from '../components/products/ProductToolbar';
import { Shield, Hammer, Zap, Settings } from 'lucide-react';
import Button from '../components/ui/Button';
import publicAxios from '../api/publicAxios';
import { useLanguage } from '../context/LanguageContext';
import '../styles/products.css';

const ProductsPage = () => {
  const { language, t } = useLanguage();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          publicAxios.get('/products'),
          publicAxios.get('/categories'),
        ]);

        if (cancelled) return;
        setAllProducts(productsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load products page data:', error);
          setAllProducts([]);
          setCategories([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryNameById = useMemo(() => {
    return (categories || []).reduce((acc, category) => {
      const id = category?.id ?? category?.Id;
      const name = language === 'az'
        ? (category?.nameAz ?? category?.NameAz ?? category?.nameEn ?? category?.NameEn ?? `#${id}`)
        : (category?.nameEn ?? category?.NameEn ?? category?.nameAz ?? category?.NameAz ?? `#${id}`);
      if (id != null) acc[id] = name;
      return acc;
    }, {});
  }, [categories, language]);

  const preparedProducts = useMemo(() => {
    return (allProducts || [])
      .filter((product) => {
        const isActive = product?.isActive ?? product?.IsActive;
        return isActive !== false;
      })
      .map((product) => {
        const id = product?.id ?? product?.Id;
        const slug = product?.slug ?? product?.Slug;
        const categoryId = product?.categoryId ?? product?.CategoryId;
        const isFeatured = product?.isFeatured ?? product?.IsFeatured;
        return {
          id,
          rawId: id,
          slug,
          name: language === 'az'
            ? (product?.nameAz ?? product?.NameAz ?? product?.nameEn ?? product?.NameEn ?? 'Untitled')
            : (product?.nameEn ?? product?.NameEn ?? product?.nameAz ?? product?.NameAz ?? 'Untitled'),
          category: categoryNameById[categoryId] || 'Category',
          description: language === 'az'
            ? (product?.descriptionAz ?? product?.DescriptionAz ?? product?.descriptionEn ?? product?.DescriptionEn ?? '')
            : (product?.descriptionEn ?? product?.DescriptionEn ?? product?.descriptionAz ?? product?.DescriptionAz ?? ''),
          imageUrls: product?.imageUrls ?? product?.ImageUrls ?? [],
          featured: isFeatured === true,
        };
      });
  }, [allProducts, categoryNameById, language]);

  const categoryChips = useMemo(() => {
    const categoryNames = Array.from(new Set(
      (categories || [])
        .map((category) => language === 'az'
          ? (category?.nameAz ?? category?.NameAz ?? category?.nameEn ?? category?.NameEn)
          : (category?.nameEn ?? category?.NameEn ?? category?.nameAz ?? category?.NameAz))
        .filter(Boolean),
    ));

    return [
      { value: 'all', label: t('products.allCategory') },
      ...categoryNames.map((name) => ({ value: name, label: name })),
    ];
  }, [categories, language]);

  const filteredProducts = useMemo(() => {
    let results = preparedProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'name') {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      results = [...results].sort((a, b) => (b.rawId || 0) - (a.rawId || 0));
    } else {
      results = [...results].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return results;
  }, [preparedProducts, searchTerm, activeCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, safeCurrentPage]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const breadcrumbs = [
    { label: t('products.breadcrumbsHome'), path: '/' },
    { label: t('products.breadcrumbsProducts'), path: null }
  ];

  return (
    <div className="products-page">
      <Header />
      
      {/* 1. Inner Hero */}
      <InnerHero 
        title={t('products.heroTitle')}
        description={t('products.heroDesc')}
        breadcrumbs={breadcrumbs}
      />

      <div className="products-content">
        <div className="container">
          {/* 2. Toolbar */}
          <ProductToolbar 
            resultsCount={filteredProducts.length} 
            onSearchChange={handleSearchChange} 
            onSortChange={handleSortChange}
          />

          {/* 3. Category Quick Filter Chips */}
          <div className="category-chips">
            {categoryChips.map((category) => (
              <button
                key={category.value}
                className={`category-chip ${activeCategory === category.value ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* 4. Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <h3>{t('products.loading')}</h3>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <h3>{t('products.noResultsTitle')}</h3>
              <p>{t('products.noResultsDesc')}</p>
            </div>
          )}

          {/* 5. Pagination */}
          {filteredProducts.length > 0 && (
            <div className="pagination">
              <button
                className={`page-btn ${safeCurrentPage === 1 ? 'disabled' : ''}`}
                onClick={() => safeCurrentPage > 1 && setCurrentPage(safeCurrentPage - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn ${safeCurrentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className={`page-btn ${safeCurrentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => safeCurrentPage < totalPages && setCurrentPage(safeCurrentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. Highlight Strip Info */}
      <section className="products-info-strip">
        <div className="info-strip-container">
          <div className="info-strip-item">
            <Shield size={20} className="info-strip-icon" />
            <span className="info-strip-text">{t('products.engineDurability')}</span>
          </div>
          <div className="info-strip-item">
            <Hammer size={20} className="info-strip-icon" />
            <span className="info-strip-text">{t('products.industrialMaterials')}</span>
          </div>
          <div className="info-strip-item">
            <Zap size={20} className="info-strip-icon" />
            <span className="info-strip-text">{t('products.precisionManufacturing')}</span>
          </div>
          <div className="info-strip-item">
            <Settings size={20} className="info-strip-icon" />
            <span className="info-strip-text">{t('products.scalableSolutions')}</span>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="section cta industrial-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined cta-icon" style={{ color: '#FFFFFF', fontSize: '64px' }}>
            precision_manufacturing
          </span>
          <h2 className="cta-title" style={{ color: '#FFFFFF' }}>{t('products.needHelpTitle')}</h2>
          <p className="cta-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('products.needHelpDesc')}</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '32px' }}>
             <Link to="/contact">
               <Button variant="white" className="btn-lg">{t('products.sendInquiry')}</Button>
             </Link>
             <Link to="/contact">
               <Button variant="outline" className="btn-lg" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>{t('products.contactUs')}</Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
