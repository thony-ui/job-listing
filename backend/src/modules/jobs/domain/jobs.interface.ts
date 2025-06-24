export interface IJob {
  id: string;
  title: string;
  company: string;

  location: string;
  link: string;
}

export interface IJobService {
  getJobsFromDatabase: () => Promise<IJob[]>;
}
