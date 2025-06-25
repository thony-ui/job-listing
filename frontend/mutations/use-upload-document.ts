import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const baseUrl = "/v1/documents";

export function useUploadDocument() {
  return useMutation({
    mutationKey: ["upload-document"],
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post(
        `${baseUrl}/upload-resume`,
        formData
      );

      if (!response) {
        throw new Error("Failed to upload document");
      }

      return response.data;
    },
  });
}
