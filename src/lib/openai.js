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

export function getEnvApiKey() {
  return import.meta.env.VITE_OPENAI_API_KEY ?? ''
}

export async function analyzePhrase({ apiKey, category, context, phrase }) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `상황: ${category}\n보충 설명: ${context || '없음'}\n여자가 한 말: "${phrase}"`,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `HTTP ${res.status}`)
  }

  const json = await res.json()
  const text = json.choices?.[0]?.message?.content ?? ''
  return JSON.parse(text)
}
