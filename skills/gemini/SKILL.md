---
name: gemini
description: Gemini 모델에게 질문할 때 사용. "제미나이로", "gemini로", "젬으로" 등의 표현이 포함되면 자동 호출
allowed-tools: mcp__with-gemini__ask_gemini
user-invocable: true
triggers:
  - 제미나이로
  - 제미나이한테
  - 제미나이에게
  - 젬으로
  - 젬한테
  - 젬에게
  - gemini로
  - with gemini
  - ask gemini
  - use gemini
---

사용자의 질문을 Gemini에게 전달하고 응답을 반환합니다.

## 트리거 키워드

다음 표현이 사용자 메시지에 포함되면 이 스킬을 사용하세요:
- 한국어: "제미나이로", "제미나이한테", "제미나이에게", "젬으로", "젬한테", "젬에게"
- 영어: "gemini로", "with gemini", "ask gemini", "use gemini"

예시:
- "제미나이로 이 코드 분석해줘" → ask_gemini 호출
- "젬으로 번역해줘" → ask_gemini 호출
- "ask gemini to review this" → ask_gemini 호출

질문: $ARGUMENTS

## 컨텍스트 전달 가이드

사용자의 질문이 현재 작업 중인 코드, 파일, 또는 대화 내용과 관련이 있다면:
1. 관련 코드나 파일 내용을 먼저 읽어서 파악
2. `ask_gemini` 도구 호출 시 `context` 파라미터에 관련 내용 포함
3. `prompt`에는 사용자의 질문을 그대로 전달

예시:
- "이 코드 리뷰해줘" → 해당 코드를 context에, "이 코드를 리뷰해주세요"를 prompt에
- "이 에러 해결해줘" → 에러 메시지와 관련 코드를 context에 포함
