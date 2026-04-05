import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ProductToolbar = ({ resultsCount, onSearchChange, onSortChange }) => {
  const { t } = useLanguage();

  return (
    <div className="toolbar-wrapper">
      <div className="products-toolbar">
        <div className="toolbar-left">
          <span className="results-count">{t('products.toolbar.showing')} {resultsCount} {t('products.toolbar.products')}</span>
        </div>
        
        <div className="toolbar-right">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={t('products.toolbar.searchPlaceholder')}
              onChange={onSearchChange}
            />
          </div>
          
          <select className="sort-select" onChange={onSortChange}>
            <option value="featured">Featured First</option>
            <option value="newest">Newest Arrival</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
