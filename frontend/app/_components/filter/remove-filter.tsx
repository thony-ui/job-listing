import { X } from "lucide-react";
import React from "react";

interface IRemoveFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

function RemoveFilter({ selectedFilter, onFilterChange }: IRemoveFilterProps) {
  return (
    <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md">
      <span className="text-sm text-blue-700">{selectedFilter}</span>
      <button
        onClick={() => onFilterChange("")}
        className="text-blue-500 hover:text-blue-700"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export default RemoveFilter;
