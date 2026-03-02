import React from 'react';
import mainLogo from "../../assets/main-icon.png";
import { useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext.jsx';

const Header = ({ showData, type }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const formatDate = (dateStr) => {
        if (!dateStr) return dayjs(null);
        let d = dayjs(dateStr, "DD-MM-YYYY", true);
        if (!d.isValid()) d = dayjs(dateStr, "DD-MM-YY", true);
        return d;
    };

    const displayDate = formatDate(showData?.date);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo Placeholder */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <img src={mainLogo} alt="Logo" className="h-8 object-contain transition-transform group-hover:scale-105" />
                </div>

                {/* Dynamic Metadata Section */}
                {type === "checkout" ? (
                    <div className="text-center flex-grow">
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Review your booking</h1>
                    </div>
                ) : (
                    <div className="text-center flex-grow px-10">
                        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase">
                            {showData?.movie.title || "Movie Title"}
                        </h1>
                        <p className="text-[13px] font-medium text-gray-400 mt-0.5">
                            {displayDate.isValid() ? displayDate.format("D MMMM YYYY") : "Date"} • {showData?.startTime || "Time"} at {showData?.theater.name}, {showData?.theater.city}
                        </p>
                    </div>
                )}

                {/* Dynamic Auth Section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="text-sm font-bold text-gray-700 capitalize border-b-2 border-transparent hover:border-[#f84464] cursor-pointer">
                                {user.name}
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors shadow-sm"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-[#f84464] text-white font-bold px-6 py-2 rounded-lg text-sm hover:bg-[#d63a56] transition-all active:scale-95 shadow-md"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
