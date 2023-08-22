import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const initialUser = {
  email: "",
  password: "",
  username: "",
  phoneNumber: "",
  homeAddress: "",
};

const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:1337/api/auth/local/register";

      // Email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        setErrorMessage("Invalid email address");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }

      // Password validation using regex
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(user.password)) {
        setErrorMessage(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
        );
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }

      // Check if all fields are filled
      if (
        !user.username ||
        !user.email ||
        !user.password ||
        !user.phoneNumber ||
        !user.homeAddress
      ) {
        setErrorMessage("All fields are required");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }

      const res = await axios.post(url, user, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
      });

      if (!!res) {
        localStorage.setItem("token", res.data.token);

        setErrorMessage("Registered And Email Send Successfully!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          router.push("login");
        }, 5000);

        // Send email using API
        // const emailRes = await fetch("/api/sendgridesed", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email: user.email,
        //   }),
        // });

        // if (!emailRes.ok) {
        //   throw new Error("Failed to send email");
        // }

// Send message using API twillio message
// const smsRes = await fetch("/api/sendMessage", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     phone: user.phoneNumber,
//     message: "Welcome to JamStack Ecommerce! Thank you for Registering. This Phone Number is Use For sending Mail to your Purchase Product ",
//   }),
// });
// if (!smsRes.ok) {
//   throw new Error("Failed to send SMS");
// }

      }
    } catch (error) {
      setErrorMessage("User Already Register");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };
  return (
   <div className="container mt-5 mx-auto">
  <h1 className="text-center mt-11">Registration Form</h1>
  {showAlert && (
    <div
      className={`p-4 my-4 ${
        errorMessage === "Registered And Email Send Successfully!" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {errorMessage}
    </div>
  )}
  <form onSubmit={signUp}>
    <div className="mb-4">
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleUserChange}
        placeholder="Enter your full name"
        className="w-full px-3 py-2 rounded border-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleUserChange}
        placeholder="Enter your email"
        className="w-full px-3 py-2 rounded border-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleUserChange}
        placeholder="Enter password"
        className="w-full px-3 py-2 rounded border-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
  <input
    type="text"
    name="phoneNumber"
    value={user.phoneNumber}
    onChange={handleUserChange}
    placeholder="Enter your phone number"
    className="w-full px-3 py-2 rounded border-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
  />
</div>
<div className="mb-4">
  <input
    type="text"
    name="homeAddress"
    value={user.homeAddress}
    onChange={handleUserChange}
    placeholder="Enter your home address"
    className="w-full px-3 py-2 rounded border-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
  />
</div>

    <button
      className="w-full px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
     
    >
      Sign up
    </button>
    <div className="text-center mt-4 mb-11">
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  </form>
 
</div>

  );
};
export default  Register;
