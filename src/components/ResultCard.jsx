import Icon from './Icon'
import { DANGER } from '../lib/data'

function tempColor(t) {
  if (t >= 80) return 'var(--status-negative)'
  if (t >= 45) return 'var(--status-cautionary)'
  return 'var(--status-positive)'
}

export default function ResultCard({ r, isSaved, onToggleSave, onShare }) {
  const dg = DANGER[r.danger]

  return (
    <div className="result-wrap">
      <div className="card panel">
        <div className="result-head">
          <span className="cat-chip">{r.category}</span>
          <span className="said"><span className="q">"</span>{r.phrase}<span className="q">"</span></span>
        </div>

        <div className="result-grid">
          <div className="meaning">
            <span className="tag"><Icon name="sparkle" size={14} /> 진짜 의미</span>
            <p>{r.meaning}</p>
          </div>

          <div className="result-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* 감정 온도 */}
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">
                  <Icon name="fire" size={15} color={tempColor(r.temp)} /> 감정 온도
                </span>
                <span className="temp-num" style={{ color: tempColor(r.temp) }}>
                  {r.temp}<span style={{ fontSize: 14, fontWeight: 600 }}>%</span>
                </span>
              </div>
              <div className="temp-track">
                <div className="temp-fill" style={{ width: r.temp + '%', background: tempColor(r.temp) }} />
              </div>
              <div className="temp-scale"><span>차분함</span><span>폭발 직전</span></div>
            </div>

            {/* 위험도 */}
            <div className="metric-card">
              <div className="metric-top"><span className="metric-label">위험도 신호</span></div>
              <div className="danger-seg">
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ background: i <= r.danger ? dg.color : 'var(--fill-strong-a)' }} />
                ))}
              </div>
              <span className="danger-chip" style={{ color: dg.color }}>
                <Icon name={dg.icon} size={17} color={dg.color} /> {dg.label}
              </span>
              <p className="danger-note">{dg.note}</p>
            </div>
          </div>

          {/* 대처법 */}
          <div className="tips">
            <h4><Icon name="check" size={15} color="var(--gt-primary)" /> 이렇게 해보세요</h4>
            <ul>
              {r.tips.map((tip, i) => (
                <li key={i}>
                  <span className="ic"><Icon name="check" size={17} /></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="result-foot">
          {onShare && (
            <button className="ghost-btn" onClick={() => onShare(r)}>
              <Icon name="share" size={15} /> 공유하기
            </button>
          )}
          {onToggleSave && (
            <button
              className={`ghost-btn${isSaved ? ' saved-active' : ''}`}
              onClick={() => onToggleSave(r)}
              title={isSaved ? '저장 취소' : '저장'}
            >
              <Icon name="bookmark" size={15} color={isSaved ? 'var(--gt-primary)' : undefined} />
              {isSaved ? '저장됨' : '저장'}
            </button>
          )}
          <span className="ts"><Icon name="clock" size={14} /> 방금 번역 · {r.ts}</span>
        </div>
      </div>
    </div>
  )
}
