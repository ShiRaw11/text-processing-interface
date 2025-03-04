import { Link } from "react-router-dom";
import React from "react";
const NotFoundPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-100 text-gray-800 text-center">
  <div className="text-6xl md:text-7xl animate-bounce">😢</div>
  <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold">
    Oops! This page is still in progress..
  </h1>
  <p className="mt-2 text-gray-600 text-base sm:text-lg">
    Looks like this page is not available yet. Check back soon! 🚀
  </p>
  <Link
    className="mt-6 px-5 py-3 bg-blue-500 text-white text-base sm:text-lg rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
    to={'/'}
  >
    Go Back Home 🏡
  </Link>
</div>

    );
  };
  
  export default NotFoundPage;
  