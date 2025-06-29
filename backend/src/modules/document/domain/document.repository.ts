import supabase from "../../../lib/supabase-client";
import { IDocumentService, IUploadResume } from "./document.interface";
import { html as pdfToHtml } from "pdf2html";
import path from "path";
import fs from "fs";
import logger from "../../../logger";

export class DocumentRepository implements IDocumentService {
  uploadResume = async (data: IUploadResume): Promise<void> => {
    logger.info(
      `DocumentRepository: Uploading resume for user ${data.userId} with file type ${data.fileType}`
    );
    const { userId, fileBuffer, fileType } = data;
    const fileName = `${userId}/resume.pdf`; // always override with this path

    // Upload with upsert = true (will overwrite)
    const { error } = await supabase.storage
      .from("resumes")
      .upload(fileName, fileBuffer, {
        contentType: fileType,
        upsert: true,
      });
    logger.info(
      `DocumentRepository: Uploaded resume for user ${userId} to ${fileName}`
    );

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  convertResumeToHTML = async (userId: string): Promise<unknown> => {
    logger.info(
      `DocumentRepository: Converting resume to HTML for user ${userId}`
    );
    const filePath = path.join("/tmp", `${userId}-resume.pdf`);

    try {
      const { data, error } = await supabase.storage
        .from("resumes")
        .download(`${userId}/resume.pdf`);

      if (error) throw error;

      const buffer = Buffer.from(await data.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      logger.info(`DocumentRepository: Saved resume to ${filePath}`);

      const html = await pdfToHtml(filePath, undefined);
      return html;
    } finally {
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
    }
  };
}
