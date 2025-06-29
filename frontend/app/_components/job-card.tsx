"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDownloadResumeForSpecificJob } from "@/mutations/use-download-resume-for-specific-job";
import { MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  link: string;
}

export function JobCard({ title, company, location, link }: JobCardProps) {
  const handleApplyClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: handleDownloadClick } =
    useDownloadResumeForSpecificJob();
  const handleDownloadResume = async () => {
    try {
      await handleDownloadClick(setIsLoading);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="px-6 py-1">
        <div className="flex items-center justify-between">
          {/* Left side - Title and Location */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
              {title}
            </h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm truncate">{location}</span>
            </div>
            <Button
              onClick={handleDownloadResume}
              className="bg-primary hover:bg-primary/90 cursor-pointer mt-3"
              disabled={isLoading}
            >
              {isLoading ? "Downloading..." : "Get Updated Resume"}
            </Button>
          </div>

          {/* Right side - Company and Apply Button */}
          <div className="flex flex-col items-end ml-4 space-y-3">
            <div className="flex items-center text-gray-700">
              <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {company}
              </span>
            </div>
            <Button
              onClick={handleApplyClick}
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
