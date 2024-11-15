import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import nitcImage from '../assets/nitc.jpg';
import nitcLogo from '../assets/logonitc.png';
import client from '../client';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const responseGoogle = (credentialResponse) => {
    try {
      // Decode the JWT token to get user details
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      const { name, sub: googleId, picture: imageUrl, email } = decoded;

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(decoded));

      // Define Sanity user document
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
        email: email,
      };

      // Create user document if it does not exist
      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-full h-full">
        <img src={nitcImage} alt="NITC Background" className="w-full h-full object-cover" />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50">
          <div className="p-5">
            <img src={nitcLogo} alt="NITC Logo" width="130px" />
          </div>
          <div className="shadow-2xl bg-white p-5 rounded-lg">
            <div className="mb-4">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => console.error('Login Failed')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
