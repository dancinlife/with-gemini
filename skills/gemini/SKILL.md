---
name: gemini
description: Gemini 모델에게 질문할 때 사용
allowed-tools: mcp__with-gemini__ask_gemini
---

사용자의 질문을 Gemini에게 전달하고 응답을 반환합니다.

질문: $ARGUMENTS

## 컨텍스트 전달 가이드

사용자의 질문이 현재 작업 중인 코드, 파일, 또는 대화 내용과 관련이 있다면:
1. 관련 코드나 파일 내용을 먼저 읽어서 파악
2. `ask_gemini` 도구 호출 시 `context` 파라미터에 관련 내용 포함
3. `prompt`에는 사용자의 질문을 그대로 전달

예시:
- "이 코드 리뷰해줘" → 해당 코드를 context에, "이 코드를 리뷰해주세요"를 prompt에
- "이 에러 해결해줘" → 에러 메시지와 관련 코드를 context에 포함
