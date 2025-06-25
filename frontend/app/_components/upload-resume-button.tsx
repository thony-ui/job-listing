"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUploadDocument } from "@/mutations/use-upload-document";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
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
    const formData = new FormData();
    formData.append("resume", file);

    try {
      await uploadDocument(formData);
      toast.success("Resume uploaded successfully");

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error("Error uploading resume");
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        ref={fileInputRef}
        id="resume"
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button
        onClick={handleUpload}
        className="cursor-pointer"
        disabled={!file}
      >
        Upload
      </Button>
    </div>
  );
}
