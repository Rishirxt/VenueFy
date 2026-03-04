import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        const { email, name, phone, password } = formData;

        // Pass only needed data based on mode, though backend handles unified
        const result = await login(
            email,
            isSignup ? name : undefined,
            isSignup ? phone : undefined,
            password,
            isSignup
        );

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Inter',_sans-serif]">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="mt-3 text-sm text-gray-500 font-medium">
                        {isSignup ? 'Join VenueFy to start booking' : 'Signin to your account'}
                    </p>
                </div>

                {/* Tab Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => setIsSignup(false)}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isSignup ? 'bg-white text-[#f84464] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsSignup(true)}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isSignup ? 'bg-white text-[#f84464] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Sign up
                    </button>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {isSignup && (
                            <div className="transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required={isSignup}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f84464]/20 focus:border-[#f84464] transition-all bg-gray-50/50"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f84464]/20 focus:border-[#f84464] transition-all bg-gray-50/50"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {isSignup && (
                            <div className="transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number (Optional)</label>
                                <input
                                    name="phone"
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f84464]/20 focus:border-[#f84464] transition-all bg-gray-50/50"
                                    placeholder="e.g. +91 9876543210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f84464]/20 focus:border-[#f84464] transition-all bg-gray-50/50"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 text-base font-bold text-white bg-[#f84464] rounded-xl shadow-lg shadow-[#f84464]/25 hover:bg-[#e63251] hover:shadow-[#f84464]/35 transition-all transform active:scale-[0.98] mt-4"
                    >
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{' '}
                        <button
                            type="button"
                            onClick={() => setIsSignup(!isSignup)}
                            className="text-[#f84464] font-bold hover:underline"
                        >
                            {isSignup ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
