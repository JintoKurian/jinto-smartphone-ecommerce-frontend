import React, { useEffect, useState } from 'react';
import { getCartItems, updateCartItem, removeCartItem } from '../services/allAPI';
import { useSelector } from 'react-redux';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const fetchCart = async () => {
    try {
      const res = await getCartItems(user._id, token);
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchCart();
    }
  }, [user, token]);

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;

    try {
      await updateCartItem(itemId, { quantity: newQty }, token);
      fetchCart(); // refresh cart after update
    } catch (err) {
      console.error('Failed to update cart item', err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId, token);
      fetchCart(); // refresh cart after delete
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading Cart...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item._id} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold">Product: {item.productId?.name || 'N/A'}</p>
                <p>Price: ₹{item.productId?.price || 0}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 bg-gray-300 rounded"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 bg-gray-300 rounded"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
