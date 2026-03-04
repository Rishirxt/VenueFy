import React, { useState, useEffect } from 'react'
import { tabs } from '../utils/constants'
import BookingHistory from '../components/profile/BookingHistory'
import { useAuth } from '../context/AuthContext.jsx'
import { useSearchParams } from 'react-router-dom'

const PasswordChangeSection = () => {
    const { changePassword } = useAuth();
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [status, setStatus] = useState({ type: '', text: '' });
    const [isPending, setIsPending] = useState(false);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setStatus({ type: 'error', text: 'New passwords do not match' });
        }
        setIsPending(true);
        setStatus({ type: '', text: '' });
        const result = await changePassword(passwords.oldPassword, passwords.newPassword);
        if (result.success) {
            setStatus({ type: 'success', text: 'Password changed successfully!' });
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setStatus({ type: 'error', text: result.error });
        }
        setIsPending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {status.text && (
                <div className={`p-3 rounded text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.text}
                </div>
            )}
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Old Password</label>
                <input
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#f74565]"
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#f74565]"
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Confirm New Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#f74565]"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors disabled:opacity-50"
            >
                {isPending ? 'Updating...' : 'Update Password'}
            </button>
        </form>
    );
};

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState("Profile");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (searchParams.get('tab') === 'orders') {
            setActiveTab('Your Orders');
        }
    }, [searchParams]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                email: user.email || ""
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setMessage({ type: '', text: '' });

        const result = await updateUser({
            name: formData.name,
            phone: formData.phone
        });

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
        }
        setIsUpdating(false);
    };

    return (
        <>
            <div className="bg-[#e5e5e5]">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-6 py-2 text-sm font-medium">
                    {
                        tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-1 cursor-pointer ${activeTab === tab ? "text-[#f74565]" : "text-gray-600 hover:text-black"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className="min-h-screen py-10 px-4 bg-gray-100">
                <div className="max-w-3xl mx-auto">
                    {activeTab === "Profile" && (
                        <>
                            {/* Header with Profile Picture */}
                            <div className="bg-gradient-to-r from-gray-800 to-[#f74565] rounded-t-lg px-6 py-8 flex items-center gap-6 text-white">
                                <div className="relative w-20 h-20 border-4 border-white rounded-full flex items-center justify-center bg-white text-gray-600 text-3xl font-bold uppercase">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Hi, {user?.name}</h2>
                                    <p className="text-sm text-gray-200">VenueFy Member</p>
                                </div>
                            </div>

                            {/* Account Details Section */}
                            <div className="bg-white px-6 py-6">
                                <h3 className="text-lg font-semibold mb-6">Account Details</h3>

                                {message.text && (
                                    <div className={`mb-4 p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {message.text}
                                    </div>
                                )}

                                {/* Email */}
                                <div className="mb-6 flex items-center justify-between pb-6 border-b">
                                    <div>
                                        <p className="text-sm font-normal text-gray-500 mb-1">Email Address</p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{user?.email}</span>
                                            <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Details Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {/* Name */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#f74565]"
                                                required
                                            />
                                        </div>

                                        {/* Mobile Number */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 block mb-2">Mobile Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#f74565]"
                                                placeholder="Enter mobile number"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isUpdating}
                                            className="bg-[#f74565] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#d63a56] transition-colors disabled:opacity-50"
                                        >
                                            {isUpdating ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Change Password Section */}
                            <div className="bg-white px-6 py-6 mt-6 border-t rounded-b-lg">
                                <h3 className="text-lg font-semibold mb-6">Change Password</h3>
                                <PasswordChangeSection />
                            </div>
                        </>
                    )}
                    {/*Booking Section*/}
                    {activeTab === "Your Orders" && <BookingHistory />}
                </div>
            </div>
        </>
    );
};

export default Profile
