

import { Userdata } from "./helpers";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const { username, email, phoneNumber, homeAddress } = Userdata();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem("user");
    // Redirect to the login page
    router.push("/login");
  };

  useEffect(() => {
    // Check if the user is logged in based on localStorage
    const userIsLoggedIn = localStorage.getItem("user") !== null;
    setIsLoggedIn(userIsLoggedIn);

    // If user is not logged in, redirect to the login page
    if (!userIsLoggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>

      {/* Display user profile information if logged in */}
      {isLoggedIn && (
        <>
          <p className="mb-2">
            <span className="font-bold">UserName:</span> {username}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {email}
          </p>
          <p className="mb-2">
            <span className="font-bold">phoneNumber:</span> {phoneNumber}
          </p>
          <p className="mb-2">
            <span className="font-bold">homeAddress:</span> {homeAddress}
          </p>
      

      {/* Logout button */}
      <button
        className="mb-5 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>  </>
      )}
    </div>
  );
};

export default Profile;
