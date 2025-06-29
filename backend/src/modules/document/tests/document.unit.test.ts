import { DocumentService } from "../domain/document.service";

describe("Document Service", () => {
  let documentService: DocumentService;
  beforeEach(() => {
    const documentRepository = {
      uploadResume: jest.fn().mockResolvedValue(undefined),
      convertResumeToHTML: jest.fn().mockResolvedValue("<html></html>"),
    };
    documentService = new DocumentService(documentRepository);
  });
  it("should upload a resume", async () => {
    const mockData = {
      userId: "test-user",
      fileBuffer: Buffer.from("test resume content"),
      fileType: "application/pdf",
    };

    await expect(
      documentService.uploadResume(mockData)
    ).resolves.toBeUndefined();
  });
  it("should throw an error if upload fails", async () => {
    const documentRepository = {
      uploadResume: jest.fn().mockRejectedValue(new Error("Upload failed")),
      convertResumeToHTML: jest.fn().mockResolvedValue("<html></html>"),
    };
    documentService = new DocumentService(documentRepository);

    const mockData = {
      userId: "test-user",
      fileBuffer: Buffer.from("test resume content"),
      fileType: "application/pdf",
    };

    await expect(documentService.uploadResume(mockData)).rejects.toThrow(
      "Upload failed"
    );
  });
});
