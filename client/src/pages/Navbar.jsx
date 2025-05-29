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
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white py-8 px-4 md:px-8 shadow-md">
      
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 relative">
        
        
        <div className="sm:order-3 w-full sm:w-auto text-center sm:text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">To-Do App</h1>
        </div>

        
        <div className="sm:order-2 w-full sm:w-auto text-center">
          
          
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
            Hello,<span className="text-cyan-400">{username}</span>
          </h2>
        </div>

        
        <div className="sm:order-1 w-full sm:w-auto text-center sm:text-left">
           <button
            onClick={handleLogout}
             
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-medium uppercase shadow-md transform transition hover:scale-105 hover:shadow-lg hover:brightness-110 duration-300 cursor-pointer"
          >
            
            <CiLogout size={16} />
            Logout
          
          </button>
         
         
           </div>
      </div>
    
    
    </nav>
  );
}

export default Navbar;
