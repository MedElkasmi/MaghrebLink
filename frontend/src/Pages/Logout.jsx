import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Logout = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Error logging out:', err);
            setError('Failed to logout. Please try again.');
        }
    };

    return (
        <div>
            <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Logout;
