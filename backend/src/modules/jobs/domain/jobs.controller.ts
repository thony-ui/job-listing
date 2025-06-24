import { JobsService } from "./jobs.service";
import type { NextFunction, Request, Response } from "express";

export class JobsController {
  private jobService: JobsService;
  constructor(jobService: JobsService) {
    this.jobService = jobService;
  }

  getJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const jobs = await this.jobService.getJobsFromDatabase();
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
}
