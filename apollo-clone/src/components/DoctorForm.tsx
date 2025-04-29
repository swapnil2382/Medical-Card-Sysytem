'use client';

import { useState } from 'react';
import axios from 'axios';

const DoctorForm = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    experience: 0,
    consultation_fees: 0,
    location: '',
    profile_picture_url: '',
    rating: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/add-doctor`, doctorData);
      console.log('Doctor added successfully:', response.data);
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Add New Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={doctorData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter doctor's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter specialization"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={doctorData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter experience"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Consultation Fees (₹)</label>
          <input
            type="number"
            name="consultation_fees"
            value={doctorData.consultation_fees}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter consultation fees"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={doctorData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter location"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Profile Picture URL</label>
          <input
            type="text"
            name="profile_picture_url"
            value={doctorData.profile_picture_url}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter profile picture URL"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={doctorData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter rating"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
