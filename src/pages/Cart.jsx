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
      fetchCart();
    } catch (err) {
      console.error('Failed to update cart item', err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId, token);
      fetchCart();
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  };

  if (loading) return <div className="text-center mt-10">Loading Cart...</div>;

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left section */}
      <div className="flex-1 bg-white rounded-md shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">My Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-start gap-4 border-b pb-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.productId?.name}</h3>
                  <p className="text-sm text-gray-600">{item.productId?.description}</p>
                  <p className="text-sm text-gray-800 font-medium">₹{item.productId?.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button className="bg-yellow-400 px-4 py-1 rounded text-black text-sm hover:bg-yellow-500">
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right section */}
      {cart.length > 0 && (
        <div className="w-full md:w-1/3 bg-white rounded-md shadow-md p-4 h-fit sticky top-20">
          <h2 className="text-lg font-semibold mb-3">PRICE DETAILS</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price ({cart.length} items)</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <p className="text-green-600 mt-2 text-sm font-medium">
              You will save ₹0 on this order
            </p>
          </div>
          <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
            PLACE ORDER
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
