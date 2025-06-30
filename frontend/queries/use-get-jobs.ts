import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "/v1/jobs";

export interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  link: string;

  jobDescription: string;
}

export function useGetJobs() {
  return useQuery({
    queryKey: [baseUrl],
    queryFn: async () => {
      const response = await axiosInstance.get<IJob[]>(baseUrl);
      return response.data;
    },
  });
}
