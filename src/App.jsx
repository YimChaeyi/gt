import { useState, useRef } from 'react'
import Icon from './components/Icon'
import ResultCard from './components/ResultCard'
import { analyzePhrase, getEnvApiKey } from './lib/gemini'

const CATS = ['연인', '친구', '가족', '직장·학교', '기타']
const EXAMPLES = ['괜찮아~', '아니야 됐어', '알아서 해', '뭐 먹고 싶어?']
const DANGER_COLORS = ['var(--status-positive)', 'var(--status-cautionary)', 'var(--status-negative)']

const API_KEY = getEnvApiKey()

function nowLabel() {
  const d = new Date()
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function App() {
  const [toast, setToast] = useState(false)
  const [category, setCategory] = useState('연인')
  const [context, setContext] = useState('')
  const [phrase, setPhrase] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const resultRef = useRef(null)

  const translate = async (text, cat) => {
    const p = text ?? phrase
    const c = cat ?? category
    if (!p.trim()) return

    setLoading(true)
    setError(null)
    try {
      const data = await analyzePhrase({ apiKey: API_KEY, category: c, context, phrase: p })
      const r = {
        ...data,
        phrase: p,
        category: c,
        ts: nowLabel(),
        temp: Math.min(100, Math.max(0, Number(data.temp))),
        danger: Math.min(2, Math.max(0, Number(data.danger))),
      }
      setResult(r)
      setHistory((h) => [r, ...h.filter((x) => x.phrase !== r.phrase)].slice(0, 3))
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (e) {
      console.error('[GT] Gemini error:', e)
      setError(`번역 중 오류가 발생했어요. (${e.message})`)
    } finally {
      setLoading(false)
    }
  }

  const showWip = (e) => {
    e.preventDefault()
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  const onExample = (ex) => {
    setPhrase(ex)
    setCategory('연인')
    translate(ex, '연인')
  }

  return (
    <>
      {/* WIP Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--fg-normal)', color: '#fff',
          padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 600,
          zIndex: 9999, boxShadow: 'var(--shadow-xl)',
          animation: 'rise .25s cubic-bezier(.2,.7,.2,1)',
          whiteSpace: 'nowrap',
        }}>
          🚧 개발 중입니다
        </div>
      )}

      {/* Header */}
      <header className="gt-header">
        <div className="gt-header-inner">
          <div className="gt-brand">
            <div className="gt-badge">GT</div>
            <div className="gt-brand-text">
              <span className="gt-brand-name">Girl Translator</span>
              <span className="gt-brand-sub">그 말의 진짜 뜻</span>
            </div>
          </div>
          <nav className="gt-nav">
            <a href="#" className="active">번역</a>
            <a href="#" onClick={showWip}>사례 둘러보기</a>
            <a href="#" onClick={showWip}>내 데이터</a>
          </nav>
          <div className="gt-header-right">
            <span className="gt-offline"><span className="dot" /> 오프라인 작동</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="gt-main">
        <div className="gt-hero">
          <span className="gt-eyebrow"><Icon name="sparkle" size={13} /> 상황 + 말을 입력하면 AI가 번역해 드려요</span>
          <h1>그 말, <span className="accent">진짜 뜻</span>이 뭘까?</h1>
          <p>표현과 속마음이 다를 때. 상황과 말을 넣으면 숨은 의미와 대처법을 알려드립니다.</p>
        </div>

        {/* Input panel */}
        <section className="card panel" aria-label="번역 입력">
          <div className="field">
            <label className="field-label">상황 <span className="req">*</span></label>
            <div className="seg">
              {CATS.map((c) => (
                <button key={c} className={c === category ? 'on' : ''} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="ctx">
              상황 보충 설명 <span className="opt">선택 · 최대 200자</span>
            </label>
            <textarea
              id="ctx"
              className="gt-input"
              rows={2}
              maxLength={200}
              placeholder="예) 데이트 약속을 깜빡한 다음 날, 평소보다 답장이 짧아졌어요."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <div className="char-count">{context.length} / 200</div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="phrase">
              여자가 한 말 <span className="req">*</span>
            </label>
            <input
              id="phrase"
              className="gt-input big"
              maxLength={100}
              placeholder="예) 괜찮아~"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') translate() }}
            />
            <div className="examples">
              <span className="lbl">예시</span>
              {EXAMPLES.map((ex) => (
                <button key={ex} className="chip" onClick={() => onExample(ex)}>{ex}</button>
              ))}
            </div>
          </div>

          {error && (
            <p style={{ color: 'var(--status-negative)', fontSize: 14, margin: '8px 0 0', textAlign: 'center' }}>
              {error}
            </p>
          )}

          <button
            className="gt-submit"
            disabled={!phrase.trim() || loading}
            onClick={() => translate()}
          >
            {loading ? (
              <><div className="gt-spinner" /> AI 번역 중...</>
            ) : (
              <><Icon name="sparkle" size={18} color="#fff" /> 번역하기</>
            )}
          </button>
        </section>

        {/* Result */}
        <div ref={resultRef}>
          {result && <ResultCard r={result} />}
        </div>

        {/* History */}
        <section className="history">
          <div className="history-head">
            <span className="ic"><Icon name="clock" size={16} /></span>
            <h3>최근 번역</h3>
          </div>
          {history.length === 0 ? (
            <div className="history-empty">아직 번역 기록이 없어요. 위에서 말을 입력해 보세요.</div>
          ) : (
            <div className="history-list">
              {history.map((h, i) => (
                <button
                  key={i}
                  className="hist-card"
                  onClick={() => {
                    setResult({ ...h, ts: nowLabel() })
                    setPhrase(h.phrase)
                    setCategory(h.category)
                  }}
                >
                  <div className="hist-top">
                    <span className="hist-cat">{h.category}</span>
                    <span className="hist-dot" style={{ background: DANGER_COLORS[h.danger] }} />
                  </div>
                  <div className="hist-said">"{h.phrase}"</div>
                  <div className="hist-mean">{h.meaning}</div>
                </button>
              ))}
            </div>
          )}
        </section>

        <p className="gt-disclaimer">
          GT는 재미와 공감을 위한 AI 콘텐츠 서비스입니다. 모든 데이터는 내 브라우저에만 저장돼요.<br />
          사람의 마음은 사람마다 다릅니다 — 번역 결과는 참고용으로만 활용해 주세요.
        </p>
      </main>
    </>
  )
}
