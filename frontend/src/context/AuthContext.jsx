import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosWrapper as axios } from '../apis/axiosWrapper';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, name, phone, password, isSignup) => {
        try {
            const response = await axios.post('/auth/unified', { email, name, phone, password, isSignup });
            const { user, tokens } = response.data;

            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const updateUser = async (updateData) => {
        try {
            const response = await axios.patch('/users/update-me', updateData);
            const { data } = response.data;
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Update failed' };
        }
    };

    const changePassword = async (oldPassword, newPassword) => {
        try {
            await axios.patch('/auth/change-password', { oldPassword, newPassword });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Password update failed' };
        }
    };

    const placeOrder = async (orderData) => {
        try {
            const response = await axios.post('/orders', orderData);
            return { success: true, order: response.data.order };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Booking failed' };
        }
    };

    const fetchMyOrders = async () => {
        try {
            const response = await axios.get('/orders/my-orders');
            return { success: true, orders: response.data.orders };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch orders' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser, changePassword, placeOrder, fetchMyOrders }}>
            {children}
        </AuthContext.Provider>
    );
};
