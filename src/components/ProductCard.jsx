import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../services/allAPI";

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleAddToCart = async (productId) => {
    try {
      const response = await addToCart({ userId: user._id, productId }, token);
      console.log("Added to cart:", response.data);
      // Optionally show a toast here
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  return (
    <div className="w-[270px] dark:bg-white dark:bg-gray-800 dark:text-black rounded-2xl shadow-lg p-4 m-3 flex flex-col items-center">
      <Link to={`/product/${product._id}`} className="w-full text-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-contain mb-3"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-sm">
          <strong>Model:</strong> {product.model}
        </p>
        <p className="text-xs mt-2 text-gray-600 dark:text-gray-900 line-clamp-2">
          {product.description}
        </p>
      </Link>

      <div className="mt-3 w-full flex justify-between items-center">
        <p className="text-lg font-bold">₹{product.price}</p>
        <div className="space-x-2">
          <button
            onClick={() => handleAddToCart(product._id)}
            className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
          >
            Add to cart
          </button>
          <button className="px-3 py-1 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 text-sm">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;









// import { Card } from "flowbite-react";
{/* <Card
className="w-full max-w-sm shadow-md hover:shadow-lg transition-shadow duration-300"
imgAlt={product.name}
imgSrc={product.image}
>
<div>
  <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
    {product.name}
  </h5>
  <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
    <strong>Brand:</strong> {product.brand}
  </p>
  <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
    <strong>Model:</strong> {product.model}
  </p>
  <p className="text-sm text-gray-700 dark:text-gray-400 mb-2 line-clamp-2">
    {product.description}
  </p>
</div>

<div className="flex items-center justify-between mt-4">
  <span className="text-2xl font-bold text-gray-900 dark:text-white">
    ₹{product.price}
  </span>
  <a
    href="#"
    className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
  >
    Add to cart
  </a>
</div>
</Card> */}
