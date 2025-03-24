import React, { useRef } from "react";
import { Car, MapPin, Calendar, Shield, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import AboutUs from "../about/AboutUs";

const HomePage = ({ userVehicles, setUserVehicles }) => {
  const { addToCart } = useCart();
  const vehiclesRef = useRef(null);

  const featuredVehicles = [
    { id: 1, name: "TVS JUPITER", price: 350, image: "./images/jupiter.jpg" },
    { id: 2, name: "Activa 6G", price: 475, image: "./images/activa6G.jpg" },
    { id: 3, name: "ACCESS 125", price: 450, image: "./images/access125.jpg" },
  ];

  const scrollToVehicles = () => {
    vehiclesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRemoveVehicle = (id) => {
    setUserVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Road Runner Rentals</h1>
          <p className="text-xl mb-8">Your Journey, Your Way - Rent the Perfect Vehicle</p>
          <button 
            className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-2 rounded transition duration-300"
            onClick={scrollToVehicles} 
          >
            Browse Vehicles
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <MapPin className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-bold mb-2">Wide Coverage</h3>
            <p>Rent vehicles across multiple locations</p>
          </div>
          <div className="text-center">
            <Calendar className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-bold mb-2">Flexible Booking</h3>
            <p>Easy online reservations anytime</p>
          </div>
          <div className="text-center">
            <Shield className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-bold mb-2">Full Insurance</h3>
            <p>Comprehensive coverage included</p>
          </div>
          <div className="text-center">
            <Car className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-bold mb-2">Diverse Fleet</h3>
            <p>From economy to luxury vehicles</p>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section ref={vehiclesRef} className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Featured Vehicles */}
          <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{vehicle.name}</h3>
                  <p className="text-blue-600 font-semibold">₹{vehicle.price}/day</p>
                  <button
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300"
                    onClick={() => {
                      addToCart(vehicle);
                      alert(`${vehicle.name} added to cart!`);
                    }}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* User-Listed Vehicles */}
          {userVehicles.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-center my-12">Your Listed Vehicles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {userVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded" />
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{vehicle.name}</h3>
                      <p className="text-blue-600 font-semibold">₹{vehicle.price}/day</p>
                      <button
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300"
                        onClick={() => {
                          addToCart(vehicle);
                          alert(`${vehicle.name} added to cart!`);
                        }}
                      >
                        Rent Now
                      </button>
                      <button 
                        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center mt-2"
                        onClick={() => handleRemoveVehicle(vehicle.id)}
                      >
                        <Trash2 size={20} className="mr-2" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
        <p className="text-xl mb-8">Join thousands of satisfied travelers</p>
        <button className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded font-bold transition duration-300"
        onClick={scrollToVehicles}>
          Start Your Rental
        </button>
      </section>

      {/* About Us Section */}
      <AboutUs />
    </div>
  );
};

export default HomePage;
