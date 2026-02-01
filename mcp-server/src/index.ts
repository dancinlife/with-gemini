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
  "Gemini 모델에게 질문합니다. 컨텍스트(코드, 대화 내용 등)를 함께 전달할 수 있습니다.",
  {
    prompt: z.string().describe("질문 내용"),
    context: z.string().optional().describe("관련 컨텍스트 (코드, 파일 내용, 대화 기록 등)"),
    model: z.string().optional().describe("모델명 (기본: gemini-2.5-pro)"),
  },
  async ({ prompt, context, model }) => {
    try {
      const fullPrompt = context
        ? `<context>\n${context}\n</context>\n\n${prompt}`
        : prompt;

      const response = await ai.models.generateContent({
        model: model || "gemini-2.5-pro",
        contents: fullPrompt,
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
