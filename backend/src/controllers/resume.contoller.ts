import { Request, Response } from "express";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import fs from "fs";

interface ResumeInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
}

function parseResume(text: string): ResumeInfo {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  const name = lines.length > 0 ? lines[0] : null;
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10}/);

  return {
    name,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  };
}

export const parseResumeController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      extractedText = data.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    fs.unlinkSync(filePath); // clean up temp file
    const parsed = parseResume(extractedText);
    return res.json(parsed);
  } catch (err) {
    console.error("Parse error:", err);
    return res.status(500).json({ error: "Error parsing resume" });
  }
};
