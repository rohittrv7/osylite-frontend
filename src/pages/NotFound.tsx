import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      {/* Illustration */}
      <div className="relative">
        <div className="text-[10rem] font-extrabold text-gray-300 select-none leading-none">
          404
        </div>
        <img
          src="https://illustrations.popsy.co/blue/404-error.svg"
          alt="Page not found"
          className="absolute inset-0 m-auto w-48 h-48 animate-bounce"
        />
      </div>

      {/* Message */}
      <h1 className="mt-6 text-3xl font-bold text-gray-800">
        Oops! Page not found
      </h1>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
