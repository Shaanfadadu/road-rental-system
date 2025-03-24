import React, { useState } from "react";
import { Bike, DollarSign } from "lucide-react"; 
import { useCart } from "../../context/CartContext"; 

const VehicleListing = ({ setUserVehicles, setCurrentPage }) => { 
  const { addToCart } = useCart(); 
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
    dailyRate: "",
    image: "",
    location: "",
    availability: { startDate: "", endDate: "" }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.dailyRate || !vehicleDetails.image) {
      alert("⚠ Please fill in all required fields!");
      return;
    }

    // ✅ Add the vehicle to the homepage listing
    setUserVehicles((prevVehicles) => [
      ...prevVehicles,
      {
        id: prevVehicles.length + 1,
        name: `${vehicleDetails.make} ${vehicleDetails.model}`,
        price: parseInt(vehicleDetails.dailyRate),
        image: vehicleDetails.image,
        location: vehicleDetails.location,
        availability: vehicleDetails.availability,
      },
    ]);

    alert("✅ Two-wheeler listed successfully!");
    setVehicleDetails({ make: "", model: "", year: "", category: "", dailyRate: "", image: "", location: "", availability: { startDate: "", endDate: "" } }); 
    setCurrentPage("home"); // ✅ Redirect to homepage
  };

  const handleRentNow = () => {
    if (vehicleDetails.make && vehicleDetails.model && vehicleDetails.dailyRate && vehicleDetails.image) {
      addToCart({
        id: Date.now(),
        name: `${vehicleDetails.make} ${vehicleDetails.model}`,
        price: parseInt(vehicleDetails.dailyRate),
        image: vehicleDetails.image,
      });

      alert(`✅ ${vehicleDetails.make} ${vehicleDetails.model} added to cart!`);
      setCurrentPage("home"); // ✅ Redirect to homepage after adding to cart
    } else {
      alert("⚠ Please fill in all vehicle details before renting.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl text-blue-800 text-center font-bold mb-6">
            List Your Two-Wheeler for Self-Drive Rental
          </h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Details Section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Two-Wheeler Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Bike className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    name="make"
                    value={vehicleDetails.make}
                    onChange={handleChange}
                    placeholder="Brand (e.g., Honda)"
                    className="w-full p-2 pl-10 border rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    name="model"
                    value={vehicleDetails.model}
                    onChange={handleChange}
                    placeholder="Model (e.g., Activa 6G)"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    name="year"
                    type="number"
                    value={vehicleDetails.year}
                    onChange={handleChange}
                    placeholder="Year"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <select
                    name="category"
                    value={vehicleDetails.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="scooter">Scooter</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="sportsbike">Sports Bike</option>
                  </select>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    name="dailyRate"
                    type="number"
                    value={vehicleDetails.dailyRate}
                    onChange={handleChange}
                    placeholder="Daily Rate (₹)"
                    className="w-full p-2 pl-10 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    name="image"
                    type="text"
                    value={vehicleDetails.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    name="location"
                    type="text"
                    value={vehicleDetails.location}
                    onChange={handleChange}
                    placeholder="Location (City, Area)"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <input
                    name="availability.startDate"
                    type="date"
                    value={vehicleDetails.availability.startDate}
                    onChange={(e) =>
                      setVehicleDetails((prev) => ({
                        ...prev,
                        availability: { ...prev.availability, startDate: e.target.value },
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <input
                    name="availability.endDate"
                    type="date"
                    value={vehicleDetails.availability.endDate}
                    onChange={(e) =>
                      setVehicleDetails((prev) => ({
                        ...prev,
                        availability: { ...prev.availability, endDate: e.target.value },
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Submit & Rent Now Buttons */}
            <div className="flex space-x-4">
              <button type="submit" className="w-1/2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold">
                List My Two-Wheeler
              </button>
              <button type="button" onClick={handleRentNow} className="w-1/2 p-3 bg-green-600 hover:bg-green-700 text-white rounded font-semibold">
                Rent Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
