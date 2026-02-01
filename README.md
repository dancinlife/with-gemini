# with-gemini

Gemini 모델을 Claude Code에서 사용할 수 있는 플러그인입니다.

## 설치

### 1. 의존성 설치 및 빌드

```bash
cd ~/dev/with-gemini/mcp-server
npm install
npm run build
```

### 2. API 키 설정 (권장 방식)

[Google AI Studio](https://aistudio.google.com/apikey)에서 API 키를 발급받고, Claude Code MCP 명령으로 등록하세요:

```bash
claude mcp add with-gemini \
  -s user \
  -- node ~/dev/with-gemini/mcp-server/dist/index.js \
  -e GEMINI_API_KEY=your-api-key-here
```

이 방식은 API 키를 Claude Code 설정에 직접 저장하므로 환경변수 로드 문제 없이 안정적으로 작동합니다.

> **참고**: 기존에 환경변수(`export GEMINI_API_KEY=...`)로 설정한 경우, MCP 서버 재시작 시 간헐적으로 키를 인식하지 못할 수 있습니다.

## 사용법

### 플러그인 로드

**방법 1: MCP 서버로 등록 (권장)**

위의 `claude mcp add` 명령으로 등록하면 자동으로 로드됩니다.

**방법 2: 플러그인 디렉토리 지정**
```bash
claude --plugin-dir ~/dev/with-gemini
```

**방법 3: 자동 로드 (설정 파일)**

`~/.claude/settings.json`에 추가:
```json
{
  "enabledPlugins": {
    "with-gemini@with-gemini-local": true
  },
  "extraKnownMarketplaces": {
    "with-gemini-local": {
      "source": {
        "source": "directory",
        "path": "/path/to/with-gemini"
      }
    }
  }
}
```

> **주의**: 방법 2, 3을 사용할 경우 API 키를 환경변수로 설정해야 합니다.

### 명령어

```
/gemini <질문>
```

## 제공 도구

| 도구명 | 설명 | 파라미터 |
|--------|------|----------|
| `ask_gemini` | Gemini 모델에게 질문 | `prompt` (필수), `context` (선택), `imagePaths` (선택), `model` (선택) |

### 지원 모델

- `gemini-3-flash-preview` (기본) - 빠른 응답
- `gemini-3-pro-preview` - 고성능

## 자연어 트리거

다음 표현을 사용하면 자동으로 Gemini가 호출됩니다:

- 한국어: "제미나이로", "젬으로", "젬한테"
- 영어: "with gemini", "ask gemini", "use gemini"

예시:
```
제미나이로 이 코드 분석해줘
젬으로 번역해줘
```

## 이미지 지원

이미지 파일을 Gemini에게 전달할 수 있습니다:
- 지원 형식: PNG, JPG, JPEG, GIF, WEBP

## 다른 사용자에게 배포

**방법 1: MCP 서버로 설치 (권장)**

```bash
# 저장소 클론
git clone https://github.com/dancinlife/with-gemini.git ~/dev/with-gemini
cd ~/dev/with-gemini/mcp-server
npm install && npm run build

# Claude Code에 등록
claude mcp add with-gemini \
  -s user \
  -- node ~/dev/with-gemini/mcp-server/dist/index.js \
  -e GEMINI_API_KEY=your-api-key-here
```

**방법 2: 플러그인으로 설치**

`~/.claude/settings.json`:
```json
{
  "enabledPlugins": {
    "with-gemini@with-gemini-github": true
  },
  "extraKnownMarketplaces": {
    "with-gemini-github": {
      "source": {
        "source": "github",
        "repo": "dancinlife/with-gemini"
      }
    }
  }
}
```

## 요구사항

- Node.js 18+
- Gemini API 키 ([Google AI Studio](https://aistudio.google.com/apikey)에서 발급)
