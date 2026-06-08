import { useState } from 'react'
import Icon from './Icon'
import { SAMPLES, DANGER } from '../lib/data'

const CATS_INPUT = ['연인', '친구', '가족', '직장·학교', '기타']

function tempColor(t) {
  if (t >= 80) return 'var(--status-negative)'
  if (t >= 45) return 'var(--status-cautionary)'
  return 'var(--status-positive)'
}

export default function MyDataPage({ saved, registered, onRemoveSaved, onRegister, onSelectSaved }) {
  const [form, setForm] = useState({ phrase: '', meaning: '', category: '연인' })
  const [submitted, setSubmitted] = useState(false)

  const handleRegister = () => {
    if (!form.phrase.trim() || !form.meaning.trim()) return
    onRegister({ ...form, id: 'r' + Date.now() })
    setForm({ phrase: '', meaning: '', category: '연인' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h2>내 데이터</h2>
        <p>저장한 번역과 직접 등록한 해석을 한 곳에서 관리해요.</p>
      </div>

      {/* 통계 */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">{saved.length}</div>
          <div className="stat-label">저장한 번역</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{registered.length}</div>
          <div className="stat-label">내가 등록한 해석</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{SAMPLES.length}</div>
          <div className="stat-label">기본 사례</div>
        </div>
      </div>

      {/* 저장한 번역 */}
      <section className="data-section">
        <h3 className="section-title"><Icon name="bookmark" size={15} /> 저장한 번역</h3>
        {saved.length === 0 ? (
          <div className="empty-block">
            <Icon name="bookmark" size={26} />
            <p>저장한 번역이 없어요.<br />번역 결과에서 북마크를 눌러보세요.</p>
          </div>
        ) : (
          <div className="saved-list">
            {saved.map((r) => {
              const dg = DANGER[r.danger]
              return (
                <div key={r.id || r.phrase} className="saved-card">
                  <button className="saved-card-body" onClick={() => onSelectSaved(r)}>
                    <div className="saved-card-top">
                      <span className="cat-chip">{r.category}</span>
                      <span style={{ color: dg.color, fontSize: 12, fontWeight: 600 }}>{dg.label}</span>
                    </div>
                    <div className="saved-phrase">"{r.phrase}"</div>
                    <div className="saved-meaning">{r.meaning}</div>
                  </button>
                  <button className="remove-btn" onClick={() => onRemoveSaved(r)} title="삭제">
                    <Icon name="close" size={14} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* 해석 등록 */}
      <section className="data-section">
        <h3 className="section-title"><Icon name="plus" size={15} /> 내 해석 등록하기</h3>
        <div className="card panel register-card">
          <div className="field">
            <label className="field-label">상황</label>
            <div className="seg">
              {CATS_INPUT.map((c) => (
                <button key={c} className={form.category === c ? 'on' : ''} onClick={() => setForm({ ...form, category: c })}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="reg-phrase">여자가 한 말</label>
            <input
              id="reg-phrase"
              className="gt-input"
              placeholder="예) 알아서 해"
              value={form.phrase}
              onChange={(e) => setForm({ ...form, phrase: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="reg-meaning">진짜 의미</label>
            <textarea
              id="reg-meaning"
              className="gt-input"
              rows={2}
              placeholder="예) 사실 의견을 들어주길 바라는 중."
              value={form.meaning}
              onChange={(e) => setForm({ ...form, meaning: e.target.value })}
            />
          </div>
          <button
            className="gt-submit"
            style={{ marginTop: 8 }}
            disabled={!form.phrase.trim() || !form.meaning.trim()}
            onClick={handleRegister}
          >
            {submitted
              ? <><Icon name="check" size={18} color="#fff" /> 등록됐어요!</>
              : <><Icon name="plus" size={18} color="#fff" /> 해석 등록하기</>
            }
          </button>
        </div>
      </section>

      {/* 등록한 해석 목록 */}
      {registered.length > 0 && (
        <section className="data-section">
          <h3 className="section-title"><Icon name="document" size={15} /> 등록한 해석 ({registered.length})</h3>
          <div className="saved-list">
            {registered.map((r) => (
              <div key={r.id} className="saved-card">
                <div className="saved-card-body" style={{ cursor: 'default' }}>
                  <div className="saved-card-top">
                    <span className="cat-chip">{r.category}</span>
                    <span style={{ fontSize: 11, color: 'var(--fg-assistive)' }}>내 등록</span>
                  </div>
                  <div className="saved-phrase">"{r.phrase}"</div>
                  <div className="saved-meaning">{r.meaning}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
