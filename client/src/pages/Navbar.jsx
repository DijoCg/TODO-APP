import React, { useEffect, useState } from 'react';
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUsername(storedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div className="bg-gray-900 text-white py-6 px-8 shadow-md flex justify-between items-center">
      {/* Left side: Welcome and logout */}
      <div>
        <h1 className="text-xl font-semibold text-white">Welcome, {username}</h1>
        <button
          onClick={handleLogout}
          className="mt-2 flex items-center gap-1 bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
        >
          <CiLogout size={18} />
          Logout
        </button>
      </div>

      {/* Centered title */}
      <h1 className="text-2xl font-bold text-center w-full absolute left-1/2 transform -translate-x-1/2">
        To-Do App
      </h1>
    </div>
  );
}

export default Navbar;
