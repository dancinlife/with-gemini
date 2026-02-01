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

[Google AI Studio](https://aistudio.google.com/apikey)에서 API 키를 발급받고 환경변수를 설정하세요:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

또는 `~/.zshrc` (또는 `~/.bashrc`)에 추가:

```bash
echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.zshrc
```

## 사용법

### 플러그인 로드

**방법 1: 수동 로드**
```bash
claude --plugin-dir ~/dev/with-gemini
```

**방법 2: 자동 로드 (설정 파일)**

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

**GitHub에서 설치:**

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
- `GEMINI_API_KEY` 환경변수 ([Google AI Studio](https://aistudio.google.com/apikey)에서 발급)
