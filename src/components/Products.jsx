import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/allAPI';
import ProductCard from './ProductCard';

const Products = () => {
  const [homeProducts, setHomeProducts] = useState([]);

  const getHomeProducts = async () => {
    const result = await getAllProducts();

    if (result.status === 200) {
      setHomeProducts(result.data);
    } else {
      console.log(result);
      console.log(result.response);
    }
  };

  useEffect(() => {
    getHomeProducts();
  }, []);

  return (
    <div className="px-4 py-8 bg-gradient-to-b from-fuchsia-100 via-white to-amber-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homeProducts?.length > 0 ? (
          homeProducts.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))
        ) : (
          <h2 className="text-center col-span-full text-red-500 font-semibold">
            Failed to fetch products
          </h2>
        )}
      </div>
    </div>
  );
};

export default Products;
