import { JobsController } from "../domain/jobs.controller";
import { JobsRepository } from "../domain/jobs.repository";
import { JobsService } from "../domain/jobs.service";
import type { Request, Response, NextFunction } from "express";

describe("Jobs Service Positive test case", () => {
  let jobsService: JobsService;
  beforeEach(() => {
    let jobsRepository = {
      getJobsFromDatabase: jest.fn().mockResolvedValue([
        {
          id: "1",
          title: "Software Engineer",
          company: "Tech Co",
          location: "Remote",
          link: "https://example.com/job1",
          jobDescription: "Develop and maintain software applications.",
        },
        {
          id: "2",
          title: "Data Scientist",
          company: "Data Inc",
          location: "Onsite",
          link: "https://example.com/job2",
          jobDescription: "Analyze data and build predictive models.",
        },
      ]),
    } as unknown as JobsRepository;
    jobsService = new JobsService(jobsRepository);
  });

  it("should fetch jobs from the database", async () => {
    const jobs = await jobsService.getJobsFromDatabase();
    expect(jobs).toHaveLength(2);
    expect(jobs[0]).toHaveProperty("id");
    expect(jobs[0]).toHaveProperty("title");
    expect(jobs[0]).toHaveProperty("company");
    expect(jobs[0]).toHaveProperty("location");
    expect(jobs[0]).toHaveProperty("link");
    expect(jobs[0]).toHaveProperty("jobDescription");
  });
});

describe("Jobs Service Negative test case", () => {
  let jobsService: JobsService;
  beforeEach(() => {
    let jobsRepository = {
      getJobsFromDatabase: jest
        .fn()
        .mockRejectedValue(new Error("Database error")),
    } as unknown as JobsRepository;
    jobsService = new JobsService(jobsRepository);
  });

  it("should handle errors when fetching jobs from the database", async () => {
    await expect(jobsService.getJobsFromDatabase()).rejects.toThrow(
      "Database error"
    );
  });
});

describe("Jobs Controller Positive test case", () => {
  let jobsController: JobsController;
  beforeEach(() => {
    let jobsService = {
      getJobsFromDatabase: jest.fn().mockResolvedValue([
        {
          id: "1",
          title: "Software Engineer",
          company: "Tech Co",
          location: "Remote",
          link: "https://example.com/job1",
          jobDescription: "Develop and maintain software applications.",
        },
      ]),
    } as unknown as JobsService;
    jobsController = new JobsController(jobsService);
  });

  it("should fetch jobs from the database", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await jobsController.getJobs(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        id: "1",
        title: "Software Engineer",
        company: "Tech Co",
        location: "Remote",
        link: "https://example.com/job1",
        jobDescription: "Develop and maintain software applications.",
      },
    ]);
  });
});

describe("Jobs Controller Negative test case", () => {
  let jobsController: JobsController;
  beforeEach(() => {
    let jobsService = {
      getJobsFromDatabase: jest
        .fn()
        .mockRejectedValue(new Error("Database error")),
    } as unknown as JobsService;
    jobsController = new JobsController(jobsService);
  });

  it("should handle errors when fetching jobs from the database", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await jobsController.getJobs(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error("Database error"));
  });
});
