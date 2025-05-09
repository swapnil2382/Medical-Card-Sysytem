'use client';

import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import Header from '@/components/Header';
import DoctorCard from '@/components/DoctorCard';
import FiltersSidebar from '@/components/FiltersSidebar';
import Head from 'next/head';

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
  }, [filters, page]);

  const handleFilterChange = (newFilters: Record<string, string | number>) => {
    setFilters(newFilters);
    setPage(1); // Reset page when filters change
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
        <div className="flex flex-col gap-6 flex-1">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <p>No doctors found for selected filters.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
