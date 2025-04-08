import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/allAPI';
import { Spinner } from 'flowbite-react';




const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const result = await getProductById(id);

    if (result.status === 200) {
      setProduct(result.data);
      console.log(result.data);
      
    } else {
      console.log("Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return    <div className='flex justify-center gap-3 mt-60'> <Spinner color="failure" size='xl' aria-label="spinner" /> <h2 className='mt-2 text-gray-500'>Loading ....</h2> </div>  

      return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Image Section */}
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-80 h-80 object-contain rounded-xl border"
              />
            </div>
      
            {/* Details Section */}
            <div className="flex-grow">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
      
              <div className="mt-4">
                <p className="text-lg">
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p className="text-lg">
                  <strong>Model:</strong> {product.model}
                </p>
                <p className="text-lg">
                  <strong>Price:</strong> ₹{product.price}
                </p>
              </div>
      
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                  <li><strong>Processor:</strong> {product.specifications?.processor}</li>
                  <li><strong>RAM:</strong> {product.specifications?.ram}</li>
                  <li><strong>Storage:</strong> {product.specifications?.storage}</li>
                  <li><strong>Battery:</strong> {product.specifications?.battery}</li>
                  <li><strong>Display:</strong> {product.specifications?.display}</li>
                  <li><strong>Camera:</strong> {product.specifications?.camera}</li>
                </ul>
              </div>
      
              <div className="mt-6 flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default ProductDetails