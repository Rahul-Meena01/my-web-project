import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Component/Item/Item';
import './CSS/SearchResults.css'; // We will create this CSS file next

const SearchResults = () => {
    const { all_product } = useContext(ShopContext);
    const location = useLocation();

    // Get the search query 'q' from the URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    // Filter products based on the search query
    const filteredProducts = query
        ? all_product.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    return (
        <div className='search-results-page'>
            <h1>Search Results</h1>
            <hr />
            {query && <p className='search-query-display'>Showing results for: <strong>"{query}"</strong></p>}

            {filteredProducts.length > 0 ? (
                <div className="search-items">
                    {filteredProducts.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-results-found">
                    <p>No products found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;