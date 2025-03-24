import React, { useState } from "react";
import LoginSignup from "./components/auth/LoginSignup";
import HomePage from "./components/home/HomePage";
import VehicleListing from "./components/listing/VehicleListing";
import Cart from "./components/cart/CartPage";
import PaymentPage from "./components/payment/PaymentPage";
import { useCart } from "./context/CartContext";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCart();
  const [userVehicles, setUserVehicles] = useState([]); // Store user-listed vehicles

  return (
    <div className="App">
      {/* Navigation Bar */}
      {currentPage !== "auth" && (
        <nav className="bg-blue-700 text-white p-3">
          <div className="container mx-auto flex justify-between items-center">
            <div className="font-bold text-xl cursor-pointer" onClick={() => setCurrentPage("home")}>
              Road Runner Rentals
            </div>
            <div className="space-x-4">
              <button onClick={() => setCurrentPage("home")} className="hover:text-blue-200">Home</button>
              <button onClick={() => setCurrentPage("listing")} className="hover:text-blue-200">List Vehicle</button>
              <button onClick={() => setShowCart(true)} className="hover:text-blue-200">
                Cart ({cartItems.length})
              </button>
              {!isLoggedIn ? (
                <button onClick={() => setCurrentPage("auth")} className="bg-white text-blue-700 px-4 py-1 rounded">
                  Login/Signup
                </button>
              ) : (
                <button onClick={() => setIsLoggedIn(false)} className="bg-white text-blue-700 px-4 py-1 rounded">
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Page Content */}
      {currentPage === "home" && <HomePage setShowCart={setShowCart} userVehicles={userVehicles} setUserVehicles={setUserVehicles} />}
      {currentPage === "auth" && <LoginSignup onLogin={() => setIsLoggedIn(true)} />}
      {currentPage === "listing" && <VehicleListing setUserVehicles={setUserVehicles} setCurrentPage={setCurrentPage} />}
      {currentPage === "payment" && <PaymentPage />}

      {/* Sidebar Cart */}
      {showCart && <Cart setShowCart={setShowCart} setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginSignup from "./components/auth/LoginSignup";
// import HomePage from "./components/home/HomePage";
// import VehicleListing from "./components/listing/VehicleListing";
// import Cart from "./components/cart/CartPage";
// import PaymentPage from "./components/payment/PaymentPage";
// import { useCart } from "./context/CartContext";
// import "./App.css";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { cartItems } = useCart();
//   const [userVehicles, setUserVehicles] = useState([]); // Store user-listed vehicles
//   const [showCart, setShowCart] = useState(false); // To control cart display

//   return (
//     <Router>
//       <div className="App">
//         {/* Navigation Bar */}
//         <nav className="bg-blue-700 text-white p-3">
//           <div className="container mx-auto flex justify-between items-center">
//             <div
//               className="font-bold text-xl cursor-pointer"
//               onClick={() => setShowCart(false)} // Disable cart view when clicking on logo
//             >
//               Road Runner Rentals
//             </div>
//             <div className="space-x-4">
//               <button onClick={() => setShowCart(false)} className="hover:text-blue-200">
//                 Home
//               </button>
//               <button onClick={() => setShowCart(false)} className="hover:text-blue-200">
//                 List Vehicle
//               </button>
//               <button onClick={() => setShowCart(true)} className="hover:text-blue-200">
//                 Cart ({cartItems.length})
//               </button>
//               {!isLoggedIn ? (
//                 <button
//                   onClick={() => setShowCart(false)} // Hide cart when logging in/signup
//                   className="bg-white text-blue-700 px-4 py-1 rounded"
//                 >
//                   Login/Signup
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsLoggedIn(false)}
//                   className="bg-white text-blue-700 px-4 py-1 rounded"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </nav>

//         {/* Page Content */}
//         <Routes>
//           <Route
//             path="/home"
//             element={<HomePage setShowCart={setShowCart} userVehicles={userVehicles} setUserVehicles={setUserVehicles} />}
//           />
//           <Route path="/login" element={<LoginSignup onLogin={() => setIsLoggedIn(true)} />} />
//           <Route
//             path="/signup"
//             element={<LoginSignup onLogin={() => setIsLoggedIn(true)} />}
//           />
//           <Route
//             path="/listing"
//             element={<VehicleListing setUserVehicles={setUserVehicles} />}
//           />
//           <Route path="/payment" element={<PaymentPage />} />
//         </Routes>

//         {/* Sidebar Cart */}
//         {showCart && <Cart setShowCart={setShowCart} />}
//       </div>
//     </Router>
//   );
// }

// export default App;
