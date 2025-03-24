import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const PaymentPage = () => {
  const { calculateTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "card" && (!paymentDetails.cardName || !paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv)) {
      alert("Please fill in all card details.");
      return;
    }
    if (paymentMethod === "upi" && !paymentDetails.upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    // Simulate Payment Processing
    setTimeout(() => {
      setPaymentSuccess(true);
      clearCart(); // ✅ Clear cart after successful payment
      alert("🎉 Congratulations on your booking! 🚀"); // ✅ Success Alert
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {paymentSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h2>
            <p className="text-gray-700">Thank you for renting with Road Runner Rentals.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Complete Your Payment</h2>
            
            {/* Payment Method Selection */}
            <div className="flex justify-center space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${paymentMethod === "card" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setPaymentMethod("card")}
              >
                Pay with Card
              </button>
              <button
                className={`px-4 py-2 rounded ${paymentMethod === "upi" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setPaymentMethod("upi")}
              >
                Pay with UPI
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              {paymentMethod === "card" ? (
                <>
                  <div>
                    <label className="block text-gray-700">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentDetails.cardName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleChange}
                      maxLength="16"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleChange}
                        maxLength="3"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-gray-700">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={paymentDetails.upiId}
                    onChange={handleChange}
                    placeholder="example@upi"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-gray-800">Total: ₹{calculateTotal()}</span>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Pay Now
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
