import supabase from "../../../lib/supabase-client";
import logger from "../../../logger";
import { IJobService } from "./jobs.interface";

export class JobsRepository implements IJobService {
  getJobsFromDatabase = async () => {
    logger.info("Fetching jobs from database");
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, company, location, link, jobDescription");
    if (error) {
      logger.error("Error fetching jobs:", error);
      return [];
    }
    logger.info(`JobsRepository: getJobsFromDatabase success`);
    return data;
  };
}
