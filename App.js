import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginSignup from "./components/auth/LoginSignup";
import HomePage from "./components/home/HomePage";
import VehicleListing from "./components/listing/VehicleListing";
import Cart from "./components/cart/CartPage";
import PaymentPage from "./components/payment/PaymentPage";
import { useCart } from "./context/CartContext";
import "./App.css";

function App() {
  return <MainApp />;
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState("");
  const [, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCart();
  const [userVehicles, setUserVehicles] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    if (!isLoggedIn && (page === "listing" || page === "cart")) {
      setPopupMessage("You need to be logged in to access this page.");
    } else {
      if (page === "home") {
        setCurrentPage("");
        navigate("/"); // home route is '/'
      } else {
        setCurrentPage(page);
        navigate(`/${page}`);
      }
    }
  };

  const handlePopupClose = () => {
    setPopupMessage("");
    setCurrentPage("home");
    navigate("/"); // Always redirect to home
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("");
    navigate("/"); // go to home after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("");
    navigate("/");
  };

  return (
    <div className="App">
      {/* Popup Message */}
      {popupMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{popupMessage}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handlePopupClose}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      {currentPage !== "auth" && (
        <nav className="bg-blue-700 text-white p-3">
          <div className="container mx-auto flex justify-between items-center">
            <div
              className="font-bold text-xl cursor-pointer"
              onClick={() => handleNavigation("home")}
            >
              Road Runner Rentals
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleNavigation("home")}
                className="hover:text-blue-200"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("listing")}
                className="hover:text-blue-200"
              >
                List Vehicle
              </button>
              <button
                onClick={() => handleNavigation("cart")}
                className="hover:text-blue-200"
              >
                Cart ({cartItems.length})
              </button>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-700 px-4 py-1 rounded"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation("auth")}
                  className="bg-white text-blue-700 px-4 py-1 rounded"
                >
                  Login/Signup
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Page Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              setPopupMessage={setPopupMessage}
              userVehicles={userVehicles}
              setUserVehicles={setUserVehicles}
            />
          }
        />
        <Route path="/auth" element={<LoginSignup onLogin={handleLogin} />} />
        <Route
          path="/listing"
          element={
            isLoggedIn ? (
              <VehicleListing
                setUserVehicles={setUserVehicles}
                setCurrentPage={setCurrentPage}
              />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isLoggedIn ? (
              <Cart
                setShowCart={setShowCart}
                setCurrentPage={setCurrentPage}
              />
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default App;
