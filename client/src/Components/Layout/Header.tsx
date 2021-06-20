import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const getClassName = useCallback(
    (pathname) => {
      // Hardcoding /store/:id route
      if (
        pathname === location.pathname ||
        (pathname === "/" && location.pathname.includes("/stores"))
      )
        return "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";

      return "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    },
    [location]
  );

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className={getClassName("/")} aria-current="page">
                  Stores
                </Link>

                <Link to="/events" className={getClassName("/events")}>
                  Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
