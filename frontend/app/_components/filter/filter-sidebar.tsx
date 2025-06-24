"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building2, Workflow } from "lucide-react";
import { useState } from "react";
import { GeneralFilter } from "./filter-general";
import RemoveFilter from "./remove-filter";

interface FilterSidebarProps {
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedCompany: string;
  onCompanyChange: (value: string) => void;

  selectedJobRole: string;
  onJobRoleChange: (value: string) => void;
  locations: string[];
  companies: string[];
  jobRoles: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
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

          <GeneralFilter
            value={locations}
            selectedValue={selectedLocation}
            onValueChange={onLocationChange}
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
          <GeneralFilter
            value={companies}
            selectedValue={selectedCompany}
            onValueChange={onCompanyChange}
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
          <GeneralFilter
            value={jobRoles}
            selectedValue={selectedJobRole}
            onValueChange={onJobRoleChange}
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
                  <RemoveFilter
                    selectedFilter={selectedLocation}
                    onFilterChange={onLocationChange}
                  />
                )}
                {selectedCompany && (
                  <RemoveFilter
                    selectedFilter={selectedCompany}
                    onFilterChange={onCompanyChange}
                  />
                )}
                {selectedJobRole && (
                  <RemoveFilter
                    selectedFilter={selectedJobRole}
                    onFilterChange={onJobRoleChange}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
