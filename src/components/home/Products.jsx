import React from 'react';
import products from '@/data/toys.json';
import ProductCard from '../cards/ProductCard';

const Products = () => {
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10 text-black">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
