import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import publicAxios from '../../api/publicAxios';
import { resolvePublicMediaUrl } from '../../utils/publicMediaUrl';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/home.css';

const CategoriesShowcaseSection = () => {
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        const response = await publicAxios.get('/categories');
        if (!cancelled) setCategories(response.data || []);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load categories:', error);
          setCategories([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  const showcaseCategories = useMemo(() => {
    const variants = ['image', 'solid', 'light', 'image-centered'];

    return (categories || []).slice(0, 4).map((category, index) => {
      const id = category?.id ?? category?.Id;
      const title = language === 'az'
        ? (category?.nameAz ?? category?.NameAz ?? category?.nameEn ?? category?.NameEn ?? 'Category')
        : (category?.nameEn ?? category?.NameEn ?? category?.nameAz ?? category?.NameAz ?? 'Category');
      const slug = category?.slug ?? category?.Slug ?? '';
      const imageUrl = resolvePublicMediaUrl(category?.imageUrl ?? category?.ImageUrl);

      return {
        id: id ?? index + 1,
        title,
        slug,
        image: imageUrl,
        variant: variants[index % variants.length],
        size: index === 0 ? 'large' : 'small',
      };
    });
  }, [categories, language]);

  return (
    <section className="section showcase">
      <div className="container">
        {loading ? (
          <div style={{ color: 'var(--color-text-secondary)' }}>{t('home.categories.loading')}</div>
        ) : showcaseCategories.length === 0 ? (
          <div style={{ color: 'var(--color-text-secondary)' }}>{t('home.categories.empty')}</div>
        ) : (
          <div className="showcase-grid">
          {showcaseCategories.map((cat) => {
            if (cat.variant === 'image') {
              return (
                <div key={cat.id} className={`showcase-item ${cat.size}`}>
                  {cat.image ? <img src={cat.image} alt={cat.title} /> : null}
                  <div className="showcase-overlay"></div>
                  <div className="showcase-content">
                    <h3 className="showcase-title-white">{cat.title}</h3>
                    <p className="showcase-desc-white">{t('home.categories.genericDesc')}</p>
                    <Link to="/products" className="showcase-link">
                      {t('home.categories.viewCollection')} <span className="material-symbols-outlined">trending_flat</span>
                    </Link>
                  </div>
                </div>
              );
            }
            if (cat.variant === 'solid') {
              return (
                <div key={cat.id} className={`showcase-item ${cat.size} variant-solid`}>
                  <h3 className="showcase-title-white">{cat.title}</h3>
                  <p className="showcase-desc-white">{t('home.categories.exploreDesc')}</p>
                  <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'rgba(255,255,255,0.2)', position: 'absolute', bottom: '-10px', right: '-10px' }}>
                    category
                  </span>
                </div>
              );
            }
            if (cat.variant === 'light') {
              return (
                <div key={cat.id} className={`showcase-item ${cat.size} variant-light`}>
                  <h3 className="product-card-title" style={{ fontSize: '28px' }}>{cat.title}</h3>
                  <p className="section-subtitle" style={{ fontSize: '14px', marginBottom: '24px' }}>
                    {cat.slug ? `/${cat.slug}` : 'Category'}
                  </p>
                  <div className="section-underline"></div>
                </div>
              );
            }
            if (cat.variant === 'image-centered') {
               return (
                <div key={cat.id} className={`showcase-item ${cat.size} variant-image-centered`}>
                  {cat.image ? <img src={cat.image} alt={cat.title} style={{ opacity: 0.5, filter: 'none' }} /> : null}
                  <div className="showcase-content" style={{ textAlign: 'center', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                    <h3 className="showcase-title-white" style={{ color: 'var(--dark-text)' }}>{cat.title}</h3>
                    <p className="showcase-desc-white" style={{ color: 'var(--gray-text)', marginBottom: '32px' }}>{t('home.categories.detailsDesc')}</p>
                    <Link to="/products" className="btn btn-outline" style={{ letterSpacing: '3px' }}>{t('home.categories.exploreAll')}</Link>
                  </div>
                </div>
              );
            }
            return null;
          })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesShowcaseSection;
