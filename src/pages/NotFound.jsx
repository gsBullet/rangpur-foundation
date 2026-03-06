import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center">
        {/* 404 Text Graphic */}
        <h1 className="text-9xl md:text-[200px] font-black text-green-600/20 tracking-widest">
          404
        </h1>

        {/* Overlay Icon/Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="text-6xl md:text-8xl mb-4 animate-bounce">
            🥀
          </div>
        </div>

        {/* Content Card */}
        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-green-100 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-[Tiro_Bangla]">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-gray-500 mb-2 text-lg">
            Oops! Page not found
          </p>
          <p className="text-gray-400 text-sm mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Go Back Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-transparent border border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;