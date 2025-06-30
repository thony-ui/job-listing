import puppeteer from "puppeteer";
import logger from "../../../logger";
import { IDocumentService, IUploadResume } from "./document.interface";
import { DocumentRepository } from "./document.repository";
import TurndownService from "turndown";
import { marked } from "marked";
import { formatLLMResumePrompt } from "../../../prompts/llm-resume-prompt";
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
              line-height: 1.4;
              max-width: 800px;
              margin: 0 auto;
              padding: 0 10px 10px 10px;
              font-size: 12px;
            }
            body > *:first-child {
              margin-top: 0 !important;
            }
            p {
              font-size: 12px;
              margin: 5px 0;
              padding: 2px 0;
            }
            h1 {
              color: #333;
              font-size: 24px;
              margin: 0 0 5px 0;
              padding: 0;
              text-align: center;
            }
            h2 {
              color: #333;
              font-size: 16px;
              margin: 10px 0 5px 0;
              padding: 0;
              border-bottom: 1px solid #ddd;
              padding-bottom: 3px;
            }
            h2:first-child {
              margin-top: 0;
            }
            h3 {
              color: #333;
              font-size: 14px;
              margin: 10px 0 3px 0;
              padding: 0;
            }
            h4, h5, h6 {
              color: #333;
              font-size: 12px;
              margin: 8px 0 3px 0;
              padding: 0;
            }
            ul, ol {
              margin: 5px 0;
              padding-left: 20px;
            }
            li {
              font-size: 12px;
              margin: 2px 0;
              padding: 1px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }
            th, td {
              padding: 8px;
              border: 1px solid #ddd;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            .summary {
              margin: 10px 0;
              font-weight: bold;
              font-size: 12px;
            }
            strong, b {
              font-size: 12px;
            }
            em, i {
              font-size: 12px;
            }
            * {
              box-sizing: border-box;
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

  generateUpdatedResumeMarkdown = async (
    currentResume: string,
    jobDescription: string
  ): Promise<string> => {
    logger.info(`DocumentService: Generating updated resume markdown`);
    // Call the LLM here to update the resume based on the job description

    const formattedResumePrompt = formatLLMResumePrompt(
      currentResume,
      jobDescription
    );
    const response = await fetch(process.env.OPENROUTER_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [{ role: "user", content: formattedResumePrompt }],
      }),
    });
    logger.info(
      `DocumentService: LLM response status ${response.status} for user`
    );
    const responseData = await response.json();
    const markdownContent = responseData.choices[0].message.content;
    return markdownContent;
  };
}
