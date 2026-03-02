import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "../../context/locationcontext";
import mainLogo from "../../assets/main-icon.png";
import map from "../../assets/pin.gif";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {
  const { location, loading, error } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3 px-4 md:px-8">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={mainLogo}
                alt="BookMyScreen"
                className="h-10 object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#f84464] transition-colors" />
              <input
                type="text"
                placeholder="Search for movies, events, plays, sports and activities"
                className="w-full bg-gray-50 border border-transparent rounded-lg py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#f84464] transition-all text-sm shadow-inner"
              />
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer hover:text-[#f84464] transition-colors">
              {loading ? (
                <img src={map} alt="locating..." className="w-5 h-5 animate-pulse" />
              ) : error ? (
                <span className="text-red-500 text-xs">Location Error</span>
              ) : (
                <div className="flex items-center gap-1">
                  <span>{location || "Select City"}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-sm font-bold text-gray-700 capitalize border-b-2 border-transparent hover:border-[#f84464] cursor-pointer">
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#f84464] text-white px-5 py-2 rounded-md text-sm font-bold shadow-md hover:bg-[#d63a56] hover:shadow-lg transition-all active:scale-95"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Header / Navigation */}
      <div className="bg-[#f5f5f5] hidden md:block">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2.5 px-4 md:px-8 text-xs font-semibold text-gray-600">
          <div className="flex items-center space-x-8">
            {["Movies", "Events", "Plays", "Sports", "Activities"].map((item) => (
              <span
                key={item}
                onClick={() => item === "Movies" && navigate("/movies")}
                className="cursor-pointer hover:text-[#f84464] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f84464] transition-all group-hover:w-full"></span>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            {["Corporates", "Offers", "Gift Cards"].map((item) => (
              <span key={item} className="cursor-pointer hover:text-[#f84464] transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
