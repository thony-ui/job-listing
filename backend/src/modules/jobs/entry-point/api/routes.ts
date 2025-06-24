import { Application, Router } from "express";
import { authenticateUser } from "../../../../middleware/authorization";
import { JobsRepository } from "../../domain/jobs.repository";
import { JobsService } from "../../domain/jobs.service";
import { JobsController } from "../../domain/jobs.controller";

export function defineJobRoutes(expressApp: Application) {
  const jobsRouter = Router();
  const jobsRepository = new JobsRepository();
  const jobsService = new JobsService(jobsRepository);
  const jobsController = new JobsController(jobsService);
  jobsRouter.get("/", jobsController.getJobs);

  expressApp.use("/v1/jobs", authenticateUser, jobsRouter);
}
