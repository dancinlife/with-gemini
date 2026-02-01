import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const server = new McpServer({
  name: "with-gemini",
  version: "1.0.0",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

server.tool(
  "ask_gemini",
  "Gemini 모델에게 질문합니다",
  {
    prompt: z.string().describe("질문 내용"),
    model: z.string().optional().describe("모델명 (기본: gemini-2.5-pro)"),
  },
  async ({ prompt, model }) => {
    try {
      const response = await ai.models.generateContent({
        model: model || "gemini-2.5-pro",
        contents: prompt,
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
