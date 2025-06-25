import { IDocumentService, IUploadResume } from "./document.interface";
import { DocumentRepository } from "./document.repository";

export class DocumentService implements IDocumentService {
  private documentRepository: DocumentRepository;
  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  uploadResume = async (data: IUploadResume): Promise<void> => {
    return this.documentRepository.uploadResume(data);
  };
}
