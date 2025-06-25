import { IUploadResume } from "./document.interface";
import { DocumentService } from "./document.service";

import type { NextFunction, Request, Response } from "express";
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
}
