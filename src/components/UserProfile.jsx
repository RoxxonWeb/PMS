// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { googleLogout } from '@react-oauth/google';
import { userCreatedPinsQuery, usetQuery, userSavedPinsQuery } from '..utils/data'
import { client } from '../client'

const UserProfile = () => {
  const navigate = useNavigate();
  
  // State to hold user data
  const [user, setUser] = useState({
    userName: '',
    email: '',
    profilePicture: '',
    bio: '',
  });

  // Fetch user data from Sanity
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const query = `*[_type == "user" && _id == $userId][0]{
          userName,
          email,
          profilePicture,
          bio
        }`;
        const params = { userId: 'YOUR_USER_ID' }; // Replace 'YOUR_USER_ID' with the actual user ID or a dynamic value
        const data = await client.fetch(query, params);
        setUser({
          userName: data.userName || 'User Name',
          email: data.email || 'user@example.com',
          profilePicture: data.profilePicture || 'https://via.placeholder.com/150',
          bio: data.bio || 'Bio not available',
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    // Redirect to edit profile page or open a form/modal to edit profile
    navigate('/edit-profile');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      {/* Display User Info */}
      <h2 className="text-2xl font-semibold text-center mb-2">{user.userName}</h2>
      <p className="text-gray-600 text-center mb-4">{user.email}</p>
      <p className="text-gray-800 text-center">{user.bio}</p>
      <button
        onClick={handleEditProfile}
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
