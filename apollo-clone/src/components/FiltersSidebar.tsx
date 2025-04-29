'use client';

import React, { useState } from 'react';

interface FiltersSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FiltersSidebar({ onFilterChange }: FiltersSidebarProps) {
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [fees, setFees] = useState('');

  const handleApplyFilters = () => {
    const filters: any = {};
    if (location) filters.location = location;
    if (specialization) filters.specialization = specialization;
    if (fees) filters.consultation_fees = fees;

    onFilterChange(filters);
  };

  return (
    <aside className="w-64 bg-gray-800 p-6  rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Filter Doctors</h2>

      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-lg font-medium text-white mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Specialization</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter specialization"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Max Consultation Fee (₹)</label>
          <input
            type="number"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter fee limit"
          />
        </div>

        <button
          onClick={handleApplyFilters}
          className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
