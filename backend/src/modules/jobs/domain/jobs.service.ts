import logger from "../../../logger";
import { IJobService } from "./jobs.interface";
import { JobsRepository } from "./jobs.repository";

export class JobsService implements IJobService {
  private jobRepository: JobsRepository;
  constructor(jobRepository: JobsRepository) {
    this.jobRepository = jobRepository;
  }

  getJobsFromDatabase = async () => {
    logger.info("JobsService: Fetching jobs from database");
    const jobs = await this.jobRepository.getJobsFromDatabase();
    logger.info(`JobsService: Fetched ${jobs.length} jobs from database`);
    return jobs;
  };
}
