import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProviderimport { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>  
      <AuthProvider>  {/* ✅ Wrap App inside AuthProvider */}
        <CartProvider>  
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
