import logger from "../../../logger";
import { IUploadResume } from "./document.interface";
import { DocumentService } from "./document.service";

import type { NextFunction, Request, Response } from "express";
import { jobDescriptionValidator } from "./document.validator";
export class DocumentController {
  private documentService: DocumentService;

  constructor(documentService: DocumentService) {
    this.documentService = documentService;
  }

  uploadResume = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(
        `DocumentController: Uploading resume for user ${req.user.id}`
      );
      const file = req.file;

      if (!file) {
        res.status(400).send("No file uploaded.");
        return;
      }

      const data: IUploadResume = {
        userId: req.user.id,
        fileBuffer: file.buffer,
        fileType: file.mimetype,
      };

      await this.documentService.uploadResume(data);
      res.status(200).send("Resume uploaded successfully.");
    } catch (error) {
      next(error);
    }
  };

  downloadResumeForSpecificJob = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(
        `DocumentController: Downloading new resume for user ${req.user.id}`
      );
      const { jobDescription } = jobDescriptionValidator(req.body);
      const userId = req.user.id;
      const htmlResume = await this.documentService.convertResumeToHTML(userId);
      const markdownResume =
        await this.documentService.convertResumeHTMLToMarkdown(
          htmlResume as string
        );
      const updatedMarkdown =
        await this.documentService.generateUpdatedResumeMarkdown(
          markdownResume,
          jobDescription
        );
      const updatedHtml =
        await this.documentService.convertResumeMarkdownToHTML(updatedMarkdown);
      const updatedReportPdfBuffer =
        await this.documentService.generateUpdatedResumePDF(
          updatedHtml,
          userId
        );
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="updated_resume_${userId}.pdf"`
      );

      res.send(updatedReportPdfBuffer);
    } catch (error) {
      next(error);
    }
  };
}
