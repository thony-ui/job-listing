"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUploadDocument } from "@/mutations/use-upload-document";
import { Upload, File, CheckCircle, X } from "lucide-react";

export default function UploadResumeCard() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: uploadDocument } = useUploadDocument();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) {
      toast("Please select a file to upload");
      return;
    }
    if (file.type !== "application/pdf") {
      toast("Only PDF files are allowed");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      await uploadDocument(formData);
      toast.success("Resume uploaded successfully");
      setFile(null);
    } catch (err) {
      toast.error("Error uploading resume");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {/* File Input Area */}
        <div className="relative">
          <div className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors bg-gray-50 hover:bg-blue-5">
            <File className="h-5 w-5 text-gray-400" />
            <div className="flex-1 min-w-0">
              <Input
                ref={fileInputRef}
                id="resume"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-sm">
                {file ? (
                  <div>
                    <p className="text-gray-700 font-medium truncate">
                      {file.name}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-gray-600">Choose a PDF file</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="w-full text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isLoading ? "Uploading..." : "Upload Resume"}
        </Button>
      </div>
    </div>
  );
}
