import React from 'react';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  consultation_fees: number;
  location: string;
  profile_picture_url: string;
  rating: number;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gray-600">
      <div className="flex gap-6 items-center">
        {/* Profile Image */}
        <img
          src={doctor.profile_picture_url}
          alt={doctor.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />

        <div className="flex flex-col justify-between flex-1">
          {/* Doctor's Name and Specialization */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400">{doctor.name}</h2>
            <p className="text-lg text-gray-300">{doctor.specialization}</p>
          </div>

          {/* Experience, Fees, and Location */}
          <div className="mt-3 space-y-2">
            <p className="text-gray-500"><strong>Experience:</strong> {doctor.experience} years</p>
            <p className="text-gray-500"><strong>Fees:</strong> ₹{doctor.consultation_fees}</p>
            <p className="text-gray-500"><strong>Location:</strong> {doctor.location}</p>
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center text-yellow-500">
            <span className="text-lg">⭐</span>
            <span className="ml-1 font-semibold">{doctor.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
