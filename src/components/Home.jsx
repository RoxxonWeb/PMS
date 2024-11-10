// src/components/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';


import UserProfile from './UserProfile';
import { client } from '../client'
import logo from '../assets/logonitc.png'


import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [jobUpdates, setJobUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleViewAll = (section) => {
    navigate(`/${section}`);
  };

  // Fetch job updates from the API
  useEffect(() => {
    const fetchJobUpdates = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://jsearch.p.rapidapi.com/search',
          params: { query: 'software developer', num_pages: '1' },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        setJobUpdates(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job updates:", error);
        setLoading(false);
      }
    };
    fetchJobUpdates();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen relative">
      {/* Content Wrapper */}
      <div className="flex flex-row items-start justify-between w-full max-w-3xl space-x-6">
        {/* News Update Section */}
        <div className="w-1/2 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">News Update about New Job Offers</h2>
          <p className="text-gray-600 mb-4">Get the latest updates on job opportunities.</p>

          {/* Display job updates */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="list-disc list-inside text-gray-800">
              {jobUpdates.slice(0, 3).map((job, index) => (
                <li key={index} className="mb-2">
                  <strong>{job.job_title}</strong> at {job.employer_name}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => handleViewAll('new-jobs')}
            className="text-blue-500 font-semibold hover:underline mt-4"
          >
            View All
          </button>
        </div>

        {/* Jobs Already Applied Section */}
        <div className="w-1/2 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Jobs Already Applied</h2>
          <p className="text-gray-600 mb-4">Check the jobs you have already applied for.</p>
          <button
            onClick={() => handleViewAll('applied-jobs')}
            className="text-blue-500 font-semibold hover:underline"
          >
            View All
          </button>
        </div>
      </div>

      {/* Edit Profile Icon */}
      <div
        className="absolute bottom-6 right-6 flex items-center cursor-pointer text-blue-500"
        onClick={() => navigate('/userProfile')}
      >
        <FaUserCircle className="text-3xl mr-2" />
        <span className="font-semibold">My Profile</span>
      </div>
    </div>
  );
};

export default Home;







// const Home = () => {
//   const navigate = useNavigate();

//   const handleViewAll = (section) => {
//     navigate(`/${section}`);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen relative">
//       {/* News Update Section */}
//       <div className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg mb-6">
//         <h2 className="text-xl font-semibold mb-4">News Update about New Job Offers</h2>
//         <p className="text-gray-600 mb-4">Get the latest updates on job opportunities.</p>
//         <button
//           onClick={() => handleViewAll('new-jobs')}
//           className="text-blue-500 font-semibold hover:underline"
//         >
//           View All
//         </button>
//       </div>

//       {/* Jobs Already Applied Section */}
//       <div className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Jobs Already Applied</h2>
//         <p className="text-gray-600 mb-4">Check the jobs you have already applied for.</p>
//         <button
//           onClick={() => handleViewAll('applied-jobs')}
//           className="text-blue-500 font-semibold hover:underline"
//         >
//           View All
//         </button>
//       </div>

//       {/* Edit Profile Icon */}
//       <div
//         className="absolute bottom-6 right-6 flex items-center cursor-pointer text-blue-500"
//         onClick={() => navigate('/edit-profile')}
//       >
//         <FaUserCircle className="text-3xl mr-2" />
//         <span className="font-semibold">Edit Profile</span>
//       </div>
//     </div>
//   );
// };

// export default Home;
