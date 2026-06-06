import Icon from './Icon'

const DANGER = [
  { label: '안전', color: 'var(--status-positive)', icon: 'check', note: '긴장도 낮음. 평소 톤으로 가볍게 받아도 괜찮아요.' },
  { label: '주의', color: 'var(--status-cautionary)', icon: 'warn', note: '신호를 놓치면 서운함이 쌓일 수 있어요. 한 번 더 살펴보세요.' },
  { label: '위험', color: 'var(--status-negative)', icon: 'warn', note: '지금 대응이 중요해요. 그냥 넘어가면 갈등으로 번질 수 있어요.' },
]

function tempColor(t) {
  if (t >= 80) return 'var(--status-negative)'
  if (t >= 45) return 'var(--status-cautionary)'
  return 'var(--status-positive)'
}

export default function ResultCard({ r }) {
  const dg = DANGER[r.danger]

  const meaningBlock = (
    <div className="meaning">
      <span className="tag"><Icon name="sparkle" size={14} /> 진짜 의미</span>
      <p>{r.meaning}</p>
    </div>
  )

  const tipsBlock = (
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
  )

  const tempBlock = (
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
  )

  const dangerBlock = (
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
  )

  return (
    <div className="result-wrap">
      <div className="card panel">
        <div className="result-head">
          <span className="cat-chip">{r.category}</span>
          <span className="said"><span className="q">"</span>{r.phrase}<span className="q">"</span></span>
        </div>

        <div className="result-grid">
          {meaningBlock}
          <div className="result-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {tempBlock}
            {dangerBlock}
          </div>
          {tipsBlock}
        </div>

        <div className="result-foot">
          <button className="ghost-btn"><Icon name="share" size={15} /> 공유하기</button>
          <span className="ts"><Icon name="clock" size={14} /> 방금 번역 · {r.ts}</span>
        </div>
      </div>
    </div>
  )
}
