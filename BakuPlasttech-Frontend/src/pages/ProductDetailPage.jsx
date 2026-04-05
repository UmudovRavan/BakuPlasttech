import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import publicAxios from '../api/publicAxios';
import { resolvePublicMediaUrl } from '../utils/publicMediaUrl';
import { useLanguage } from '../context/LanguageContext';
import '../styles/product-detail.css';

const readValue = (obj, key) => obj?.[key] ?? obj?.[`${key[0].toUpperCase()}${key.slice(1)}`];

const parseSpecEntries = (specText) => {
  if (!specText || typeof specText !== 'string') return [];
  return specText
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return null;
      return {
        key: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      };
    })
    .filter(Boolean);
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [productRes, productsRes, categoriesRes] = await Promise.all([
          publicAxios.get(`/products/slug/${slug}`),
          publicAxios.get('/products'),
          publicAxios.get('/categories'),
        ]);

        if (cancelled) return;

        const current = productRes?.data || null;
        const allProducts = productsRes?.data || [];
        const allCategories = categoriesRes?.data || [];

        setProduct(current);
        setCategories(allCategories);

        const currentId = readValue(current, 'id');
        const currentCategoryId = readValue(current, 'categoryId');

        const relatedProducts = allProducts
          .filter((item) => {
            const id = readValue(item, 'id');
            const categoryId = readValue(item, 'categoryId');
            const isActive = readValue(item, 'isActive');
            return id !== currentId && categoryId === currentCategoryId && isActive !== false;
          })
          .slice(0, 3);

        setRelated(relatedProducts);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load product detail:', error);
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  const productName = useMemo(() => {
    if (!product) return '';
    return language === 'az'
      ? (readValue(product, 'nameAz') || readValue(product, 'nameEn') || 'Product')
      : (readValue(product, 'nameEn') || readValue(product, 'nameAz') || 'Product');
  }, [product, language]);

  const productDesc = useMemo(() => {
    if (!product) return '';
    return language === 'az'
      ? (readValue(product, 'descriptionAz') || readValue(product, 'descriptionEn') || '')
      : (readValue(product, 'descriptionEn') || readValue(product, 'descriptionAz') || '');
  }, [product, language]);

  const categoryName = useMemo(() => {
    if (!product) return '';
    const categoryId = readValue(product, 'categoryId');
    const category = categories.find((c) => readValue(c, 'id') === categoryId);
    if (!category) return t('products.breadcrumbsProducts');

    return language === 'az'
      ? (readValue(category, 'nameAz') || readValue(category, 'nameEn') || 'Category')
      : (readValue(category, 'nameEn') || readValue(category, 'nameAz') || 'Category');
  }, [product, categories, language, t]);

  const imageUrls = useMemo(() => {
    if (!product) return [];
    const raw = readValue(product, 'imageUrls') || readValue(product, 'imageUrl') || [];
    const normalized = Array.isArray(raw) ? raw : [raw];
    return normalized.map((url) => resolvePublicMediaUrl(url)).filter(Boolean);
  }, [product]);

  const fallbackImage = 'https://via.placeholder.com/1200x1200?text=No+Image';
  const whatsappLink = 'https://wa.me/994509612813';
  const thumbImages = useMemo(() => {
    const base = imageUrls.length > 0 ? imageUrls : [fallbackImage];
    return base.slice(0, 4);
  }, [imageUrls]);

  const safeActiveImage = Math.min(activeImage, Math.max(0, thumbImages.length - 1));
  const selectedImage = thumbImages[safeActiveImage] || fallbackImage;

  const specEntries = useMemo(() => parseSpecEntries(readValue(product, 'specifications')), [product]);
  const primarySpecs = specEntries.slice(0, 4);

  const handleInquirySubmit = (event) => {
    event.preventDefault();
  };

  const getRelatedImage = (item) => {
    const relImages = readValue(item, 'imageUrls') || readValue(item, 'imageUrl') || [];
    const relList = Array.isArray(relImages) ? relImages : [relImages];
    return resolvePublicMediaUrl(relList[0]) || fallbackImage;
  };

  if (loading) {
    return (
      <div className="products-page">
        <Header />
        <main className="product-detail-main">
          <div className="container">
            <div className="product-detail-loading">{t('productDetail.loading')}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="products-page">
        <Header />
        <main className="product-detail-main">
          <div className="container">
            <div className="product-detail-loading">{t('productDetail.notFound')}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFeatured = readValue(product, 'isFeatured') === true;

  return (
    <div className="products-page">
      <Header />
      <main className="product-detail-main">
        <div className="container">
          <nav className="detail-breadcrumb">
            <Link to="/products">{t('products.breadcrumbsProducts')}</Link>
            <span>&gt;</span>
            <span>{categoryName}</span>
            <span>&gt;</span>
            <strong>{productName}</strong>
          </nav>

          <section className="detail-top-grid">
            <div className="detail-gallery">
              <div className="detail-main-image-wrap">
                <img src={selectedImage} alt={productName} className="detail-main-image" />
              </div>

              <div className="detail-thumbs">
                {thumbImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    className={`detail-thumb ${safeActiveImage === idx ? 'active' : ''}`}
                    onClick={() => setActiveImage(idx)}
                    type="button"
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-info">
              <h1 className="detail-title">{productName}</h1>

              <p className="detail-desc">{productDesc || t('productDetail.noDescription')}</p>

              {isFeatured && (
                <div className="detail-chip-row">
                  <span>FEATURED</span>
                </div>
              )}

              {primarySpecs.length > 0 && (
                <div className="detail-spec-box">
                  <h3>{t('productDetail.primarySpecs')}</h3>
                  {primarySpecs.map((spec, idx) => (
                    <div className="detail-spec-row" key={`${spec.key}-${idx}`}>
                      <span>{spec.key}</span>
                      <strong>{spec.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              <div className="detail-actions">
                <Link to="/contact" className="detail-quote-btn">{t('productDetail.requestQuote')}</Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="detail-whatsapp-btn"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </section>

          {specEntries.length > 0 && (
            <section className="detail-full-specs">
              <div className="detail-spec-grid">
                <div>
                  <h4>{t('productDetail.physical')}</h4>
                  <table>
                    <tbody>
                      {specEntries.map((spec, idx) => (
                        <tr key={`${spec.key}-${idx}`}>
                          <td>{spec.key}</td>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          <section className="detail-inquiry">
            <div className="detail-inquiry-grid">
              <div>
                <h2>{t('productDetail.bulkTitle')}</h2>
                <p>{t('productDetail.bulkDesc')}</p>
              </div>

              <form className="detail-form" onSubmit={handleInquirySubmit}>
                <input type="text" placeholder={t('contact.fullName')} />
                <input type="text" placeholder={t('productDetail.company')} />
                <input type="email" placeholder={t('contact.businessEmail')} />
                <textarea rows="4" placeholder={t('contact.message')}></textarea>
                <button type="submit">{t('contact.sendInquiry')}</button>
              </form>
            </div>
          </section>

          <section className="detail-related">
            <div className="detail-related-head">
              <h3>{t('productDetail.related')}</h3>
              <Link to="/products">{t('productDetail.viewCatalog')}</Link>
            </div>

            <div className="detail-related-grid">
              {related.length > 0 ? (
                related.map((item) => {
                  const relSlug = readValue(item, 'slug');
                  const relName = language === 'az'
                    ? (readValue(item, 'nameAz') || readValue(item, 'nameEn') || 'Product')
                    : (readValue(item, 'nameEn') || readValue(item, 'nameAz') || 'Product');
                  const relImage = getRelatedImage(item);

                  return (
                    <Link
                      key={readValue(item, 'id')}
                      to={relSlug ? `/products/${relSlug}` : '/products'}
                      className="detail-related-card"
                    >
                      <img src={relImage} alt={relName} />
                      <div>
                        <h4>{relName}</h4>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="product-detail-loading">{t('productDetail.noRelated')}</div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
