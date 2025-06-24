"use client";

import { useState, useMemo } from "react";
import { JobCard } from "@/components/job-card";
import { SearchBar } from "@/components/search-bar";
import Header from "@/components/Header/header";
import { FilterSidebar } from "@/components/Filter/filter-sidebar";

// Sample job data - replace with your actual data source
const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    link: "https://example.com/job1",
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    link: "https://example.com/job2",
  },
  {
    title: "React Developer",
    company: "Digital Solutions",
    location: "Remote",
    link: "https://example.com/job3",
  },
  {
    title: "Software Engineer",
    company: "Innovation Labs",
    location: "Austin, TX",
    link: "https://example.com/job4",
  },
  {
    title: "Frontend Developer",
    company: "WebTech Solutions",
    location: "Seattle, WA",
    link: "https://example.com/job5",
  },
  {
    title: "UI/UX Developer",
    company: "Design Studio",
    location: "Los Angeles, CA",
    link: "https://example.com/job6",
  },
  {
    title: "Backend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    link: "https://example.com/job7",
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    link: "https://example.com/job8",
  },
  {
    title: "Mobile Developer",
    company: "AppStudio",
    location: "Miami, FL",
    link: "https://example.com/job9",
  },
  {
    title: "Data Scientist",
    company: "DataCorp",
    location: "Boston, MA",
    link: "https://example.com/job10",
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");

  // Get unique locations and companies for filter options
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
    return uniqueLocations.sort();
  }, []);

  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(jobs.map((job) => job.company))];
    return uniqueCompanies.sort();
  }, []);

  const jobRoles = useMemo(() => {
    const uniqueJobRoles = [...new Set(jobs.map((job) => job.title))];
    return uniqueJobRoles.sort();
  }, []);

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
  }, [searchTerm, selectedLocation, selectedCompany, selectedJobRole]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedCompany("");
    setSelectedJobRole("");
  };

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
                {filteredJobs.map((job, index) => (
                  <JobCard
                    key={`${job.company}-${job.title}-${index}`}
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
