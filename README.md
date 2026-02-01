# with-gemini

Gemini 모델을 Claude Code에서 사용할 수 있는 플러그인입니다.

## 설치

### 1. 의존성 설치 및 빌드

```bash
cd ~/dev/with-gemini/mcp-server
npm install
npm run build
```

### 2. API 키 설정

`GEMINI_API_KEY` 환경변수를 설정하세요:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

또는 `~/.zshrc` (또는 `~/.bashrc`)에 추가:

```bash
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
```

## 사용법

### 플러그인 로드

```bash
claude --plugin-dir ~/dev/with-gemini
```

### 명령어

- `/gemini <질문>` - Gemini에게 질문합니다

### 예시

```
/gemini 한국어로 인사해줘
```

## 제공 도구

| 도구명 | 설명 | 파라미터 |
|--------|------|----------|
| `ask_gemini` | Gemini 모델에게 질문 | `prompt` (필수), `context` (선택), `model` (선택) |

### 지원 모델

- `gemini-3-flash-preview` (기본) - 빠른 응답
- `gemini-3-pro-preview` - 고성능

## 요구사항

- Node.js 18+
- `GEMINI_API_KEY` 환경변수
