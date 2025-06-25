import { Application, Router } from "express";
import { authenticateUser } from "../../../../middleware/authorization";
import multer from "multer";
import { DocumentController } from "../../domain/document.controller";
import { DocumentRepository } from "../../domain/document.repository";
import { DocumentService } from "../../domain/document.service";

const upload = multer();
export function defineDocumentRoutes(expressApp: Application) {
  const documentRouter = Router();
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentController = new DocumentController(documentService);
  documentRouter.post(
    "/upload-resume",
    upload.single("resume"),
    documentController.uploadResume
  );

  expressApp.use("/v1/documents", authenticateUser, documentRouter);
}
