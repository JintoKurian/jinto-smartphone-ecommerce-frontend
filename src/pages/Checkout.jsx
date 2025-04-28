import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createRazorpayOrder, placeOrder, verifyPayment } from '../services/allAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items = [] } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(()=>{
    console.log(user);
  },[])

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOnlinePayment = async () => {
    try {
      const { data: orderData } = await createRazorpayOrder(totalAmount * 100);

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: 'INR',
        name: 'SmartPhones Shopee',
        description: 'Online Order Payment',
        order_id: orderData.id,
        handler: async (response) => {
          console.log(response);
          try {
            const verifyResponse = await verifyPayment( {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              orderItems: items.map(item => ({
                product: item._id,
                quantity: item.quantity,
              })),
              totalPrice: totalAmount,
              shippingAddress: {
                address,
                city,
                pincode,
                country,
              },
              paymentMethod: 'online',
              isPaid: true,
              paidAt: new Date(),
              paymentResult: {
                id: response.razorpay_payment_id,
                status: "completed",
                update_time: new Date(),
              },
            }, token);
            if (verifyResponse.data.success) {
              toast.success("Order placed successfully!");
              navigate(`/order-success/${verifyResponse.data.order._id}`);
            }

          } catch (error) {
            console.error("Payment handling failed", error);
            toast.error("Something went wrong during order placement.");
          }
        },
        prefill: {
          name: 'Jinto Kurian',
          email: 'kuttumadan362@gmail.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Failed to create Razorpay order", error);
      toast.error("Could not initiate payment.");
    }
  };

  const handleCOD = async () => {
    try {
      const newOrder = {
        userId: user._id,
        orderItems: items.map(item => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: totalAmount,
        shippingAddress: {
          address,
          city,
          pincode,
          country,
        },
        paymentMethod: 'cod',
        isPaid: false,
      };

      const placedOrder = await placeOrder(newOrder, token);
      toast.success("COD order placed successfully!");
      navigate(`/order-success/${placedOrder.data._id}`);
    } catch (error) {
      console.error("COD Order Failed", error);
      toast.error("Failed to place COD order.");
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return alert("Cart is empty");
    if (!address || !city || !pincode || !country) return alert("Please fill all shipping fields");

    if (paymentMethod === 'cod') {
      handleCOD();
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Summary */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border p-4 rounded shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="text-right font-medium">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <div className="border p-4 rounded shadow-md bg-gray-50 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
          <input
            type="text"
            placeholder="Address"
            className="w-full border p-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="w-full border p-2 rounded"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full border p-2 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
          <select
            className="w-full border p-2 rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          <div className="text-right font-bold text-lg mt-6">
            Total: ₹{totalAmount}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

































// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { createRazorpayOrder, placeOrder, verifyPayment } from '../services/allAPI';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { items = [] } = location.state || {};
//   const user = useSelector((state) => state.auth.user);
//   const token = useSelector((state) => state.auth.token);

//   useEffect(()=>{
//     console.log(user);
//   },[])

//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [country, setCountry] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('cod');

//   const totalAmount = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleOnlinePayment = async () => {
//     try {
//       const { data: orderData } = await createRazorpayOrder(totalAmount * 100);

//       const options = {
//         key: razorpayKey,
//         amount: orderData.amount,
//         currency: 'INR',
//         name: 'SmartPhones Shopee',
//         description: 'Online Order Payment',
//         order_id: orderData.id,
//         handler: async (response) => {
//           console.log(response);
//           try {
//             const paymentData = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             const verifyResponse = await verifyPayment(paymentData, token);
//             if (verifyResponse.data.success) {
//               const newOrder = {
//                 orderItems: items.map(item => ({
//                   product: item._id,
//                   quantity: item.quantity,
//                 })),
//                 totalPrice: totalAmount,
//                 shippingAddress: {
//                   address,
//                   city,
//                   pincode,
//                   country,
//                 },
//                 paymentMethod: 'online',
//                 isPaid: true,
//                 paidAt: new Date(),
//                 paymentResult: {
//                   id: response.razorpay_payment_id,
//                   status: "completed",
//                   update_time: new Date(),
//                 },
//               };

//               const placedOrder = await placeOrder(newOrder, token);
//               toast.success("Order placed successfully!");
//               navigate(`/order-success/${placedOrder.data._id}`);
//             } else {
//               toast.error("Payment verification failed!");
//             }
//           } catch (error) {
//             console.error("Payment handling failed", error);
//             toast.error("Something went wrong during order placement.");
//           }
//         },
//         prefill: {
//           name: 'Jinto Kurian',
//           email: 'kuttumadan362@gmail.com',
//           contact: '9999999999',
//         },
//         theme: {
//           color: '#F37254',
//         },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Failed to create Razorpay order", error);
//       toast.error("Could not initiate payment.");
//     }
//   };

//   const handleCOD = async () => {
//     try {
//       const newOrder = {
//         userId: user._id,
//         orderItems: items.map(item => ({
//           product: item._id,
//           quantity: item.quantity,
//         })),
//         totalPrice: totalAmount,
//         shippingAddress: {
//           address,
//           city,
//           pincode,
//           country,
//         },
//         paymentMethod: 'cod',
//         isPaid: false,
//       };

//       const placedOrder = await placeOrder(newOrder, token);
//       toast.success("COD order placed successfully!");
//       navigate(`/order-success/${placedOrder.data._id}`);
//     } catch (error) {
//       console.error("COD Order Failed", error);
//       toast.error("Failed to place COD order.");
//     }
//   };

//   const handlePlaceOrder = () => {
//     if (items.length === 0) return alert("Cart is empty");
//     if (!address || !city || !pincode || !country) return alert("Please fill all shipping fields");

//     if (paymentMethod === 'cod') {
//       handleCOD();
//     } else {
//       handleOnlinePayment();
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Cart Summary */}
//         <div className="md:col-span-2 space-y-4">
//           {items.map((item, index) => (
//             <div key={index} className="flex items-center gap-4 border p-4 rounded shadow-sm">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-20 h-20 object-cover rounded"
//               />
//               <div className="flex-1">
//                 <p className="font-semibold">{item.name}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//               <div className="text-right font-medium">
//                 ₹{item.price * item.quantity}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Checkout Form */}
//         <div className="border p-4 rounded shadow-md bg-gray-50 space-y-4">
//           <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
//           <input
//             type="text"
//             placeholder="Address"
//             className="w-full border p-2 rounded"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="City"
//             className="w-full border p-2 rounded"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Pincode"
//             className="w-full border p-2 rounded"
//             value={pincode}
//             onChange={(e) => setPincode(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Country"
//             className="w-full border p-2 rounded"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//           />

//           <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
//           <select
//             className="w-full border p-2 rounded"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <option value="cod">Cash on Delivery</option>
//             <option value="upi">UPI</option>
//             <option value="card">Credit/Debit Card</option>
//           </select>

//           <div className="text-right font-bold text-lg mt-6">
//             Total: ₹{totalAmount}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;