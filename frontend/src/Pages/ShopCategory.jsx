import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
// dropdown_icon is no longer needed if sort dropdown is removed, but keeping import for now if it's used elsewhere.
// import dropdown_icon from '../Component/Asset/dropdown_icon.png';
import Item from '../Component/Item/Item';

const ShopCategory = (props) => {
const { all_product } = useContext(ShopContext);
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [selectedPriceRange, setSelectedPriceRange] = useState('');
const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

// Predefined price ranges
const priceRanges = [
  { label: '$0 - $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
];

// Get unique categories/brands for filter options
// Ensure 'category' property exists on your product items for this to work
const uniqueCategories = [...new Set(all_product.map(item => item.category))];

// Handle custom price input changes
const handleMinPriceChange = (e) => {
  setMinPrice(e.target.value);
  setSelectedPriceRange(''); // Clear predefined selection if custom is used
};

const handleMaxPriceChange = (e) => {
  setMaxPrice(e.target.value);
  setSelectedPriceRange(''); // Clear predefined selection if custom is used
};

// Handle predefined price range selection
const handlePriceRangeSelect = (range) => {
  setSelectedPriceRange(range.label);
  setMinPrice(range.min.toString());
  setMaxPrice(range.max.toString());
};

// Handle category/brand filter selection
const handleCategoryFilterSelect = (category) => {
  setSelectedCategoryFilter(category);
};

// Reset all filters
const resetFilters = () => {
  setMinPrice('');
  setMaxPrice('');
  setSelectedPriceRange('');
  setSelectedCategoryFilter('');
};

// Combined filtering logic
const filteredProducts = all_product.filter(item => {
  // 1. Category/Brand Filter (from sidebar)
  const matchesSelectedCategoryFilter = selectedCategoryFilter === '' || item.category === selectedCategoryFilter;

  // 2. Price Filter
  const itemPrice = item.new_price;
  let matchesPriceRange = true;

  if (selectedPriceRange) {
    const range = priceRanges.find(r => r.label === selectedPriceRange);
    if (range) {
      matchesPriceRange = itemPrice >= range.min && itemPrice <= range.max;
    }
  } else {
    const min = minPrice === '' ? -Infinity : parseFloat(minPrice);
    const max = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    matchesPriceRange = itemPrice >= min && itemPrice <= max;
  }

  // Ensure the item also matches the main category prop (e.g., 'men', 'women', 'kid')
  const matchesMainCategoryProp = props.category === item.category;

  return matchesMainCategoryProp && matchesSelectedCategoryFilter && matchesPriceRange;
});

// Close filter sidebar when clicking outside
useEffect(() => {
  const handleOutsideClick = (event) => {
    if (isFilterOpen && !event.target.closest('.filter-sidebar') && !event.target.closest('.filter-button')) {
      setIsFilterOpen(false);
    }
  };
  document.addEventListener('mousedown', handleOutsideClick);
  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, [isFilterOpen]);


return (
  <div className='shop-category'>
    <img className='shopcategory-banner' src={props.banner || "/placeholder.svg"} alt="" />

    <div className="shopcategory-header">
      <h1 className="products-count">Products ({filteredProducts.length})</h1>
      <div className="shopcategory-controls">
        {/* Removed Layout Toggle */}
        {/* Removed Sort Dropdown */}

        {/* Filters Button */}
        <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filters
        </button>
      </div>
    </div>

    {/* Filter Sidebar */}
    <div className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="close-filter-btn" onClick={() => setIsFilterOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Category/Brand Filter */}
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="filter-options">
          {uniqueCategories.map(cat => (
            <label key={cat} className="filter-option">
              <input
                type="radio"
                name="categoryFilter"
                value={cat}
                checked={selectedCategoryFilter === cat}
                onChange={() => handleCategoryFilterSelect(cat)}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
          <label className="filter-option">
            <input
              type="radio"
              name="categoryFilter"
              value=""
              checked={selectedCategoryFilter === ''}
              onChange={() => handleCategoryFilterSelect('')}
            />
            All Categories
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs-filter">
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="price-input-filter"
          />
          <span className="price-separator-filter">-</span>
          <input
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="price-input-filter"
          />
        </div>
        <div className="filter-options">
          {priceRanges.map(range => (
            <label key={range.label} className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                checked={selectedPriceRange === range.label}
                onChange={() => handlePriceRangeSelect(range)}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <button onClick={resetFilters} className="reset-all-filters-btn">Clear All Filters</button>
    </div>

    {/* Overlay for when filter is open */}
    {isFilterOpen && <div className="filter-overlay" onClick={() => setIsFilterOpen(false)}></div>}

    <div className="shopcategory-products">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, i) => {
          // The category check (props.category === item.category) is already handled by the initial filter
          // but keeping it here for clarity if you have other top-level category filtering
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          } else {
            return null;
          }
        })
      ) : (
        <p className="no-products-found">No products found matching your criteria.</p>
      )}
    </div>
    <div className="shopcategory-loadmore">
      Explore More
    </div>
  </div>
)
}

export default ShopCategory
