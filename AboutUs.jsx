import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">About Road Runner Rentals</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300">
          Welcome to <span className="text-blue-500 font-semibold">Road Runner Rentals</span>, your one-stop destination for renting two-wheelers with ease. 
          Whether you're a traveler exploring new places or a local needing a quick ride, we provide 
          affordable, well-maintained scooters and bikes for every journey.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-400">🚀 Easy Booking</h3>
            <p className="text-gray-300 mt-2">
              Simple and fast online reservations with flexible options to suit your schedule.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-400">🏍️ Wide Variety</h3>
            <p className="text-gray-300 mt-2">
              Choose from a diverse fleet of well-maintained scooters and bikes for every occasion.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-400">🔒 Safe & Secure</h3>
            <p className="text-gray-300 mt-2">
              Your safety is our priority. Every ride is insured and well-maintained for a hassle-free experience.
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          &copy; {new Date().getFullYear()} Road Runner Rentals | All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
