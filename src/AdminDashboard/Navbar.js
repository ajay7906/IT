import React from 'react';

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="h-16 bg-[#00BFB3] flex items-center px-4 shadow">
      <h1 className="text-black text-lg font-bold">Welcome, {username}</h1>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <button
        onClick={onLogout}
        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
