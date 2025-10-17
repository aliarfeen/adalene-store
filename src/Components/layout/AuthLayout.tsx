import React from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../../assets/Auth/authImage.png";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-[#5c3317] to-[#e0c2a2]">
      {/* Left Section */}
      {/* <div
        className="hidden md:flex w-full md:w-1/2 text-white flex-col justify-center px-6 md:px-16 py-10 md:py-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#4a2b0b]">
          Welcome to Our Community
        </h1>
        <p className="text-base md:text-lg text-gray-900">
          Join thousands of users who trust us with their journey.
        </p>
      </div> */}

      <div
  className="hidden md:flex w-full md:w-1/2 text-white flex-col justify-center px-6 md:px-16 py-10 md:py-0 bg-cover bg-center bg-no-repeat relative"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>
  {/* ✅ Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* ✅ Text content (فوق الـ overlay) */}
  <div className="relative z-10">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
      Welcome to Our Community
    </h1>
    <p className="text-base md:text-lg text-gray-200">
      Join thousands of users who trust us with their journey.
    </p>
  </div>
</div>



      {/* Right Section — dynamic content */}
      <div className="w-full md:w-1/2 bg-[#fdf5ef] flex flex-col justify-center px-6 md:px-16 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
