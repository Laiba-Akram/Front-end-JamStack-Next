import React from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  const clearUserSession = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Logout</h1>
        <p className="text-lg mb-8">Logging out...</p>
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          onClick={clearUserSession}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default Logout;
