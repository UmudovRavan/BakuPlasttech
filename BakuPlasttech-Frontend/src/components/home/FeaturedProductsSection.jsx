import React, { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from '../ui/ProductCard';
import publicAxios from '../../api/publicAxios';
import { resolvePublicMediaUrl } from '../../utils/publicMediaUrl';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/home.css';

const FeaturedProductsSection = () => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [allProductsResponse, categoriesResponse] = await Promise.all([
          publicAxios.get('/products'),
          publicAxios.get('/categories'),
        ]);

        if (cancelled) return;
        setProducts(allProductsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load featured products:', error);
          setProducts([]);
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

  const categoriesMap = useMemo(() => {
    return (categories || []).reduce((acc, category) => {
      const id = category?.id ?? category?.Id;
      const name = language === 'az'
        ? (category?.nameAz ?? category?.NameAz ?? category?.nameEn ?? category?.NameEn)
        : (category?.nameEn ?? category?.NameEn ?? category?.nameAz ?? category?.NameAz);
      if (id != null) acc[id] = name;
      return acc;
    }, {});
  }, [categories, language]);

  const featuredCards = useMemo(() => {
    const allProducts = products || [];
    const activeProducts = allProducts.filter((product) => {
      const isActive = product?.isActive ?? product?.IsActive;
      return isActive !== false;
    });

    const featuredProducts = activeProducts.filter((product) => {
      const isFeatured = product?.isFeatured ?? product?.IsFeatured;
      return isFeatured === true;
    });

    const sourceProducts = (featuredProducts.length > 0 ? featuredProducts : activeProducts).slice(0, 6);

    return sourceProducts.map((product) => {
      const id = product?.id ?? product?.Id;
      const slug = product?.slug ?? product?.Slug;
      const categoryId = product?.categoryId ?? product?.CategoryId;
      const imageUrls = product?.imageUrls ?? product?.ImageUrls ?? [];
      const image = resolvePublicMediaUrl(imageUrls[0]) || 'https://via.placeholder.com/500x500?text=No+Image';
      const title = language === 'az'
        ? (product?.nameAz ?? product?.NameAz ?? product?.nameEn ?? product?.NameEn ?? 'Untitled')
        : (product?.nameEn ?? product?.NameEn ?? product?.nameAz ?? product?.NameAz ?? 'Untitled');

      return {
        id,
        slug,
        title,
        category: categoriesMap[categoryId] || 'Category',
        image,
        icon: 'trending_flat',
      };
    });
  }, [products, categoriesMap, language]);

  return (
    <section className="section featured-products">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <SectionTitle 
            title={t('home.featured.title')}
            subtitle={t('home.featured.subtitle')}
          />
        </div>

        {loading ? (
          <div style={{ color: 'var(--color-text-secondary)' }}>{t('home.featured.loading')}</div>
        ) : featuredCards.length === 0 ? (
          <div style={{ color: 'var(--color-text-secondary)' }}>{t('home.featured.empty')}</div>
        ) : (
          <div className="products-grid">
            {featuredCards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
