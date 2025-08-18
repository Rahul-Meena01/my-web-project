import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Component/Breadcrums/Breadcrum';
import ProductDisplay from '../Component/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Component/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Component/RelatedProducts/RelatedProducts';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    
    // 1. FIX: Changed productID to productId to match the standard route name.
    //    (Make sure your App.js route is path='/product/:productId')
    const { productId } = useParams(); 
    
    const product = all_product.find((e) => e.id === Number(productId));

    // 2. FIX: Add a check to handle the loading state.
    //    If the product is not yet found, don't render anything (or show a "Loading..." message).
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
}

export default Product;