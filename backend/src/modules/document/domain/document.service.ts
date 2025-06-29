import puppeteer from "puppeteer";
import logger from "../../../logger";
import { IDocumentService, IUploadResume } from "./document.interface";
import { DocumentRepository } from "./document.repository";
import TurndownService from "turndown";
import { marked } from "marked";
export class DocumentService implements IDocumentService {
  private documentRepository: DocumentRepository;
  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  uploadResume = async (data: IUploadResume): Promise<void> => {
    logger.info(
      `DocumentService: Uploading resume for user ${data.userId} with file type ${data.fileType}`
    );
    return this.documentRepository.uploadResume(data);
  };

  convertResumeToHTML = async (userId: string): Promise<unknown> => {
    logger.info(
      `DocumentService: Converting resume to HTML for user ${userId}`
    );
    return this.documentRepository.convertResumeToHTML(userId);
  };

  convertResumeHTMLToMarkdown = async (html: string): Promise<string> => {
    logger.info(`DocumentService: Converting resume HTML to Markdown`);
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const content = await page.evaluate(() => {
      return document.body.innerHTML;
    });
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(content);
    await browser.close();
    logger.info(`DocumentService: Converted HTML to Markdown`);
    return markdown;
  };

  convertResumeMarkdownToHTML = async (markdown: string): Promise<string> => {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Updated Resume</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1, h2, h3 {
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 12px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .summary {
              margin-top: 30px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          ${marked.parse(markdown)}
        </body>
        </html>
      `;

      logger.info(`DocumentService: Converted Markdown to HTML`);
      return html;
    } catch (error) {
      logger.error(`Error converting markdown to HTML: ${error}`);
      throw new Error(`Error converting markdown to HTML: ${error}`);
    }
  };

  generateUpdatedResumePDF = async (
    html: string,
    userId: string
  ): Promise<Uint8Array<ArrayBufferLike>> => {
    try {
      // Launch puppeteer and create PDF
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      // Generate PDF as buffer instead of saving to file
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "20mm",
          bottom: "20mm",
          left: "20mm",
        },
      });

      await browser.close();
      logger.info(`PDF generated successfully for user: ${userId}`);
      return pdfBuffer;
    } catch (error) {
      logger.error(`Error generating PDF: ${error}`);
      throw new Error(`Error generating PDF: ${error}`);
    }
  };
}
