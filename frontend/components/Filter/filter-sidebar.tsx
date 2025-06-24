"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, MapPin, Building2, Workflow } from "lucide-react";
import { useState } from "react";
import { CompanyFilter } from "./filter-company";
import { JobFilter } from "./filter-job";
import { LocationFilter } from "./filter-location";

interface FilterSidebarProps {
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedCompany: string;
  onCompanyChange: (value: string) => void;

  selectedJobRole: string;
  onJobRoleChange: (value: string) => void;
  locations: string[];
  companies: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  jobRoles: string[];
}

export function FilterSidebar({
  selectedLocation,
  onLocationChange,
  selectedCompany,
  onCompanyChange,
  locations,
  companies,
  onClearFilters,
  hasActiveFilters,
  selectedJobRole,
  onJobRoleChange,
  jobRoles,
}: FilterSidebarProps) {
  const [openCompanyFilter, setOpenCompanyFilter] = useState(false);
  const [openLocationFilter, setOpenLocationFilter] = useState(false);
  const [openJobRoleFilter, setOpenJobRoleFilter] = useState(false);
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-sm"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
          </div>

          <LocationFilter
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={onLocationChange}
            open={openLocationFilter}
            setOpen={setOpenLocationFilter}
          />
        </div>

        <Separator />

        {/* Company Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Company</label>
          </div>
          <CompanyFilter
            companies={companies}
            selectedCompany={selectedCompany}
            onCompanyChange={onCompanyChange}
            open={openCompanyFilter}
            setOpen={setOpenCompanyFilter}
          />
        </div>
        <Separator />

        {/* Job Role Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Workflow className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Job Role
            </label>
          </div>
          <JobFilter
            jobRoles={jobRoles}
            selectedJobRole={selectedJobRole}
            onJobRoleChange={onJobRoleChange}
            open={openJobRoleFilter}
            setOpen={setOpenJobRoleFilter}
          />
        </div>
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Active Filters:
              </p>
              <div className="space-y-2">
                {selectedLocation && (
                  <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md">
                    <span className="text-sm text-blue-700">
                      {selectedLocation}
                    </span>
                    <button
                      onClick={() => onLocationChange("")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {selectedCompany && (
                  <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-md">
                    <span className="text-sm text-green-700">
                      {selectedCompany}
                    </span>
                    <button
                      onClick={() => onCompanyChange("")}
                      className="text-green-500 hover:text-green-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {selectedJobRole && (
                  <div className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded-md">
                    <span className="text-sm text-purple-700">
                      {selectedJobRole}
                    </span>
                    <button
                      onClick={() => onJobRoleChange("")}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
