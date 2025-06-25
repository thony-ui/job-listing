import supabase from "../../../lib/supabase-client";
import { IDocumentService, IUploadResume } from "./document.interface";

export class DocumentRepository implements IDocumentService {
  uploadResume = async (data: IUploadResume): Promise<void> => {
    const { userId, fileBuffer, fileType } = data;
    const fileName = `${userId}/resume.pdf`; // always override with this path

    // Upload with upsert = true (will overwrite)
    const { error } = await supabase.storage
      .from("resumes")
      .upload(fileName, fileBuffer, {
        contentType: fileType,
        upsert: true,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  };
}
