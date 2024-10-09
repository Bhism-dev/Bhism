import React from 'react';
import './Disclaimer.css'
const Disclaimer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 bg-opacity-65 py-2 z-50">
      <div className="overflow-hidden whitespace-nowrap">
        <p className="animate-scroll text-white text-center text-sm md:text-base inline-block">
          Disclaimer: This website is designed to function as both a web platform and a mobile application. For an experience similar to that of the mobile app, we encourage you to view the website in mobile view.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
