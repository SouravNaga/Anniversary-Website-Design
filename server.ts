import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route to export entire project files as ZIP
  app.get("/api/export-zip", async (req, res) => {
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      const addFileToZip = (filePath: string, zipPath: string) => {
        const fullPath = path.join(process.cwd(), filePath);
        if (fs.existsSync(fullPath)) {
          zip.file(zipPath, fs.readFileSync(fullPath));
        }
      };

      const addFolderToZip = (folderPath: string, zipFolder: any) => {
        const fullPath = path.join(process.cwd(), folderPath);
        if (!fs.existsSync(fullPath)) return;
        const items = fs.readdirSync(fullPath);
        for (const item of items) {
          const itemPath = path.join(folderPath, item);
          const fullItemPath = path.join(process.cwd(), itemPath);
          const stat = fs.statSync(fullItemPath);
          if (stat.isDirectory()) {
            if (item !== 'node_modules' && item !== 'dist' && item !== '.git') {
              const subFolder = zipFolder.folder(item);
              addFolderToZip(itemPath, subFolder);
            }
          } else {
            zipFolder.file(item, fs.readFileSync(fullItemPath));
          }
        }
      };

      // Add core workspace configuration files
      addFileToZip("package.json", "package.json");
      addFileToZip("tsconfig.json", "tsconfig.json");
      addFileToZip("vite.config.ts", "vite.config.ts");
      addFileToZip("index.html", "index.html");
      addFileToZip("server.ts", "server.ts");
      addFileToZip(".env.example", ".env.example");
      addFileToZip("metadata.json", "metadata.json");

      // Add src folder
      const srcFolder = zip.folder("src");
      addFolderToZip("src", srcFolder);

      const content = await zip.generateAsync({ type: "nodebuffer" });
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=love-memories-hub.zip");
      res.send(content);
    } catch (error: any) {
      console.error("ZIP export error:", error);
      res.status(500).json({ error: error.message || "Failed to create ZIP package" });
    }
  });

  // API Route for love letter generation
  app.post("/api/love-letter", async (req, res) => {
    try {
      const { partnerName, senderName, sharedMemories, tone, format } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured on the server. Please add your key in Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Write a beautiful, personalized ${format || 'love letter'} to ${partnerName} from ${senderName}.
Here are some details and shared memories to include: ${sharedMemories || "our sweet moments together, the laughter, and everything we have been through"}.
The desired tone is: ${tone || "romantic, warm, and heartfelt"}.

Please output only the letter/poem body. Format it nicely with paragraph breaks and natural phrasing. Do not include subject lines, placeholders, metadata, tags, or markdown headers (like # or **). Make it sound deeply genuine, tender, and touching.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate love letter" });
    }
  });

  // API Route for love poem generation (Bengali / English)
  app.post("/api/love-poem", async (req, res) => {
    try {
      const { senderName, recipientName, language } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured on the server. Please add your key in Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const langName = language === "BENGALI" ? "Bengali (বাংলা script)" : "English (UK)";
      
      const prompt = `Write an exquisite, deeply touching, and highly romantic love poem and anniversary wish from ${senderName || 'Amit'} to ${recipientName || 'Ekta'} in ${langName}. 
      
      Requirements:
      1. If the language is Bengali, write the entire poem in beautiful, poetic, authentic Bengali script (using Bengali alphabet) with warm emotional depth, romantic terms of endearment, and heartfelt wishes.
      2. If the language is English, write it in elegant, tender, poetic English with gorgeous metaphors and genuine warmth.
      3. Structure it into 3-4 stanzas with empty lines in between.
      4. Output ONLY the poem/wish text. Do not include titles, markdown headers, introductory text, translation notes, or greeting cards headers. Let it speak directly from the heart.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Poem generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate love poem" });
    }
  });

  // API Route for zodiac compatibility and harmony evaluation
  app.post("/api/zodiac-harmony", async (req, res) => {
    try {
      const { name1, name2, zodiac1, zodiac2 } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured on the server. Please add your key in Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are Cosmic Cupid, an expert celestial relationship astrologer. Evaluate the cosmic love alignment, relationship compatibility, and name harmony between:
      - Person 1: ${name1 || 'Partner A'} with Zodiac Sign / birth details: ${zodiac1 || 'Aries'}
      - Person 2: ${name2 || 'Partner B'} with Zodiac Sign / birth details: ${zodiac2 || 'Leo'}

      Your response MUST be a single raw JSON object matching this schema exactly:
      {
        "score": number, // an integer score between 75 and 100 representing celestial harmony
        "summary": "string" // a 2-paragraph poetic, insightful astrological evaluation of their match, cosmic strengths, and romantic advice
      }

      Do NOT wrap your response in markdown code blocks like \`\`\`json. Output ONLY the raw JSON object.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      // Parse JSON safely
      let text = response.text || "";
      text = text.trim();
      // Strip markdown codeblock if generated
      if (text.startsWith("```json")) {
        text = text.slice(7);
      }
      if (text.startsWith("```")) {
        text = text.slice(3);
      }
      if (text.endsWith("```")) {
        text = text.slice(0, -3);
      }
      text = text.trim();

      try {
        const parsed = JSON.parse(text);
        res.json(parsed);
      } catch (parseError) {
        console.warn("Gemini didn't return valid JSON, sending fallback:", text);
        // Fallback parsing or generation
        const score = Math.floor(Math.random() * 16) + 84; // 84 to 99
        res.json({
          score: score,
          summary: `The alignment between ${name1} and ${name2} radiates positive energy, indicating a beautiful bond of trust, romance, and shared dreams. Your planetary signs harmoniously support one another, creating an unbreakable celestial link.`
        });
      }
    } catch (error: any) {
      console.error("Zodiac compatibility error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze cosmic compatibility" });
    }
  });

  // Vite middleware for development or serving built files for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
