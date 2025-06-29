export interface IUploadResume {
  userId: string;
  fileBuffer: Buffer;
  fileType: string;
}

export interface IDocumentService {
  uploadResume(data: IUploadResume): Promise<void>;

  convertResumeToHTML(userId: string): Promise<unknown>;
}
