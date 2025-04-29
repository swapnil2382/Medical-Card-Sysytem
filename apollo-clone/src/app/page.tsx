'use client';

import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import Header from '@/components/Header';
import DoctorCard from '@/components/DoctorCard';
import FiltersSidebar from '@/components/FiltersSidebar';
import Head from 'next/head';
import DoctorForm from '@/components/DoctorForm'; // Import DoctorForm
import Image from 'next/image'; // For image optimization

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

export default function GeneralPhysiciansPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isAddingDoctor, setIsAddingDoctor] = useState<boolean>(false); // State to toggle form visibility

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/list-doctor-with-filter`, {
        params: { ...filters, page, limit: 10 },
      });
      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]); // Removed fetchDoctors from dependency array to avoid warning

  const handleFilterChange = (newFilters: Record<string, string | number>) => {
    setFilters(newFilters);
    setPage(1); // Reset page when filters change
  };

  const toggleAddDoctorForm = () => {
    setIsAddingDoctor((prev) => !prev); // Toggle visibility of the form
  };

  return (
    <>
      <NextSeo
        title="Best General Physicians | Apollo Clone"
        description="Find top general physicians and internal medicine specialists."
        canonical="https://yoursite.com/specialties/general-physician-internal-medicine"
      />

      {/* Structured Data for SEO */}
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": doctors.map((doctor, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": doctor.name,
              "url": `https://yoursite.com/doctor/${doctor._id}`,
            })),
          })}
        </script>
      </Head>

      <Header />

      <div className="container mx-auto flex px-4 py-6 gap-8">
        {/* Filters Sidebar */}
        <FiltersSidebar onFilterChange={handleFilterChange} />

        {/* Doctors List */}
        <div className="flex flex-col gap-6 flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Button to Toggle Doctor Form */}
          <button
            onClick={toggleAddDoctorForm}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out mb-6"
          >
            {isAddingDoctor ? 'Cancel' : 'Add New Doctor'}
          </button>

          {/* Conditionally Render the DoctorForm */}
          {isAddingDoctor && <DoctorForm />}

          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">No doctors found for the selected filters.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 transition duration-300 ease-in-out"
            >
              Previous
            </button>
            <span className="self-center font-semibold text-lg text-gray-100">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 transition duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
