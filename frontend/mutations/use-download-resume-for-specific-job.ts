import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const baseUrl = "/v1/documents";
export function useDownloadResumeForSpecificJob() {
  return useMutation({
    mutationFn: async (setIsLoading: (loading: boolean) => void) => {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${baseUrl}/download-resume-for-specific-job`,
        {},
        {
          responseType: "blob",
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to generate expense report");
      }

      // Create a blob URL from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsLoading(false);
    },
  });
}
