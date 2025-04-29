import React from 'react';

export default function Header() {
  return (
    <header className="w-full p-4 shadow-lg bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white hover:text-blue-600 cursor-pointer transition-colors duration-300">
          Apollo Clone
        </h1>
        <nav>
        <ul className="flex gap-6 text-lg font-semibold text-gray-300">
  <li className="px-4 py-2 rounded-md hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-all duration-300">
    Home
  </li>
  <li className="px-4 py-2 rounded-md hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-all duration-300">
    Doctors
  </li>
  <li className="px-4 py-2 rounded-md hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-all duration-300">
    Specialties
  </li>
  <li className="px-4 py-2 rounded-md hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-all duration-300">
    Login
  </li>
</ul>
        </nav>
      </div>
    </header>
  );
}
