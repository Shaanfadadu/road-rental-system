import React from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Cart = ({ setShowCart, setCurrentPage }) => { // ✅ Accept setCurrentPage as a prop
  const { cartItems, removeFromCart, updateRentalDays, calculateTotal} = useCart();

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={() => setShowCart(false)} className="p-1 hover:bg-gray-100 rounded">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Your cart is empty</div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="border rounded p-3 flex flex-col">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" /> 
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}/day</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex items-center mt-2">
                  <span className="mr-2">Days:</span>
                  <div className="flex items-center border rounded">
                    <button onClick={() => updateRentalDays(item.id, Math.max(1, item.rentalDays - 1))} className="px-2 py-1 hover:bg-gray-100">
                      <ChevronDown size={16} />
                    </button>
                    <span className="px-3">{item.rentalDays}</span>
                    <button onClick={() => updateRentalDays(item.id, item.rentalDays + 1)} className="px-2 py-1 hover:bg-gray-100">
                      <ChevronUp size={16} />
                    </button>
                  </div>
                  <span className="ml-auto font-semibold">₹{item.price * item.rentalDays}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-xl">₹{calculateTotal()}</span>
          </div>
          <button 
            onClick={() => {
              setShowCart(false); // ✅ Close the sidebar
              setCurrentPage("payment"); // ✅ Redirect to Payment Page
            }}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
