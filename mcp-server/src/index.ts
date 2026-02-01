import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GoogleGenAI, Part } from "@google/genai";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

const server = new McpServer({
  name: "with-gemini",
  version: "1.0.0",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 파일 확장자로 MIME 타입 결정
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/png";
}

server.tool(
  "ask_gemini",
  "Gemini 모델에게 질문합니다. 사용자가 '제미나이로', '젬으로', 'with gemini', 'ask gemini' 등의 표현을 사용하면 이 도구를 호출하세요. 컨텍스트(코드, 대화 내용 등)와 이미지를 함께 전달할 수 있습니다.",
  {
    prompt: z.string().describe("질문 내용"),
    context: z.string().optional().describe("관련 컨텍스트 (코드, 파일 내용, 대화 기록 등)"),
    imagePaths: z.array(z.string()).optional().describe("이미지 파일 경로 배열 (예: ['/path/to/image.png'])"),
    model: z.enum(["gemini-3-flash-preview", "gemini-3-pro-preview"]).optional().describe("모델명 (기본: gemini-3-flash-preview)"),
  },
  async ({ prompt, context, imagePaths, model }) => {
    try {
      const textPrompt = context
        ? `<context>\n${context}\n</context>\n\n${prompt}`
        : prompt;

      // 이미지가 있으면 multimodal 요청
      let contents: string | Part[];
      if (imagePaths && imagePaths.length > 0) {
        const parts: Part[] = [{ text: textPrompt }];

        for (const imagePath of imagePaths) {
          if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const base64Image = imageData.toString("base64");
            const mimeType = getMimeType(imagePath);
            parts.push({
              inlineData: {
                mimeType,
                data: base64Image,
              },
            });
          }
        }
        contents = parts;
      } else {
        contents = textPrompt;
      }

      const response = await ai.models.generateContent({
        model: model || "gemini-3-flash-preview",
        contents,
      });

      return {
        content: [
          {
            type: "text",
            text: response.text || "응답을 받지 못했습니다.",
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";
      return {
        content: [
          {
            type: "text",
            text: `Gemini API 오류: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
