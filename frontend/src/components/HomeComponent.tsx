import React from 'react';
import { IonIcon } from '@ionic/react'; // For Ionic icons
import { personCircleOutline, shieldOutline } from 'ionicons/icons'; // Admin/User Icons
import { Link } from 'react-router-dom'; // For navigation

const HomeComponent = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 via-white to-green-100">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-600 tracking-wide drop-shadow-md">
          Welcome to <span className="text-green-500">BHISM</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl font-light italic">
          Choose Your role to continue
        </p>
      </div>

      {/* Options Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-6">
        {/* Admin Option */}
        <div className="flex justify-center">
          <Link to="/admindash" className="w-full">
            <button className="w-full md:w-80 py-12 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2">
                <IonIcon icon={shieldOutline} className="text-3xl" />
                <span className="text-2xl">Admin</span>
              </div>
            </button>
          </Link>
        </div>
        {/* User Option */}
        <div className="flex justify-center">
          <Link to="/login" className="w-full">
            <button className="w-full md:w-80 py-12 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2">
                <IonIcon icon={personCircleOutline} className="text-3xl" />
                <span className="text-2xl">User</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
