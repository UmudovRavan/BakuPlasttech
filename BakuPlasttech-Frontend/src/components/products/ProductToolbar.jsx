import React from 'react';
import { Search } from 'lucide-react';

const ProductToolbar = ({ resultsCount, onSearchChange, onSortChange }) => {
  return (
    <div className="toolbar-wrapper">
      <div className="products-toolbar">
        <div className="toolbar-left">
          <span className="results-count">Showing {resultsCount} Products</span>
        </div>
        
        <div className="toolbar-right">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
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
