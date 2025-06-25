"use client";

import { useState, useMemo } from "react";
import Header from "@/app/_components/header/header";
import { FilterSidebar } from "@/app/_components/filter/filter-sidebar";
import { useGetJobs } from "@/queries/use-get-jobs";
import { JobCard } from "./_components/job-card";
import { SearchBar } from "./_components/search-bar";
import UploadResumeCard from "./_components/upload-resume-card";

export default function HomePage() {
  const { data: jobs = [], isLoading } = useGetJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");

  // Get unique locations and companies for filter options
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
    return uniqueLocations.sort();
  }, [jobs]);

  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(jobs.map((job) => job.company))];
    return uniqueCompanies.sort();
  }, [jobs]);

  const jobRoles = useMemo(() => {
    const uniqueJobRoles = [...new Set(jobs.map((job) => job.title))];
    return uniqueJobRoles.sort();
  }, [jobs]);

  // Filter jobs based on search and filter criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === "" ||
        job.location === selectedLocation ||
        selectedLocation === "all";
      const matchesCompany =
        selectedCompany === "" ||
        job.company === selectedCompany ||
        selectedCompany === "all";
      const matchesJobRole =
        selectedJobRole === "" ||
        job.title === selectedJobRole ||
        selectedJobRole === "all";

      return (
        matchesSearch && matchesLocation && matchesCompany && matchesJobRole
      );
    });
  }, [searchTerm, selectedLocation, selectedCompany, selectedJobRole, jobs]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedCompany("");
    setSelectedJobRole("");
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters (Desktop) */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              selectedCompany={selectedCompany}
              onCompanyChange={setSelectedCompany}
              selectedJobRole={selectedJobRole}
              onJobRoleChange={setSelectedJobRole}
              locations={locations}
              companies={companies}
              jobRoles={jobRoles}
              onClearFilters={handleClearFilters}
              hasActiveFilters={
                !!(selectedLocation || selectedCompany || selectedJobRole)
              }
            />
          </aside>

          {/* Main Job Listings */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            {/* Upload Resume Section */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Noticed by Employers
                </h2>
                <p className="text-gray-600 mb-4">
                  Upload your resume to stand out and get matched with relevant
                  opportunities
                </p>
                <div className="flex justify-center">
                  <UploadResumeCard />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>

            {/* Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No jobs found matching your criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    link={job.link}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
