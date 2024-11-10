import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Home from './components/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';

import React from 'react'
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
      <Route path='userProfile' element={<UserProfile />} />
      

      </Routes>
    </GoogleOAuthProvider>
  )
}


// function App() {
//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </GoogleOAuthProvider>
//   );
// }

export default App;
