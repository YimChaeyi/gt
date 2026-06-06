const MODEL = 'gemini-2.5-flash'

export function getEnvApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY ?? ''
}

const SYSTEM_PROMPT = `당신은 여성의 말 속에 숨겨진 진짜 의미를 분석해주는 전문가입니다.
상황과 말을 입력받아 감정적 맥락을 깊이 이해하고 분석합니다.

반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요:
{
  "meaning": "진짜 의미 설명 (2~3문장, 자연스러운 한국어)",
  "temp": 감정온도_숫자,
  "danger": 위험도_숫자,
  "tips": ["대처법 1", "대처법 2", "대처법 3"]
}

temp는 0~100 사이의 정수 (높을수록 감정이 격함).
danger는 0(안전), 1(주의), 2(위험) 중 하나.`

export async function analyzePhrase({ apiKey, category, context, phrase }) {
  const key = apiKey || getEnvApiKey()
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`
  const userMessage = `상황: ${category}
보충 설명: ${context || '없음'}
여자가 한 말: "${phrase}"`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\n' + userMessage }] },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `HTTP ${res.status}`)
  }

  const json = await res.json()
  // gemini-2.5-flash는 thinking 모델 — parts 배열에 thought 파트가 먼저 올 수 있음
  const parts = json.candidates?.[0]?.content?.parts ?? []
  const text = (parts.find((p) => !p.thought)?.text ?? parts[0]?.text ?? '').trim()
  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

  return JSON.parse(cleaned)
}
