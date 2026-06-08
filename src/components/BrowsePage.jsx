import { useState } from 'react'
import Icon from './Icon'
import { SAMPLES, DANGER, CATS } from '../lib/data'

function tempColor(t) {
  if (t >= 80) return 'var(--status-negative)'
  if (t >= 45) return 'var(--status-cautionary)'
  return 'var(--status-positive)'
}

export default function BrowsePage({ onSelect }) {
  const [filter, setFilter] = useState('전체')
  const [query, setQuery] = useState('')

  const filtered = SAMPLES.filter((s) => {
    const matchCat = filter === '전체' || s.category === filter
    const matchQ = !query || s.phrase.includes(query) || s.meaning.includes(query)
    return matchCat && matchQ
  })

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h2>사례 둘러보기</h2>
        <p>실제 상황에서 자주 나오는 말들을 모았어요. 클릭하면 상세 해석을 볼 수 있어요.</p>
      </div>

      <div className="filter-row">
        <div className="search-box">
          <Icon name="search" size={15} />
          <input
            type="text"
            placeholder="말 또는 의미 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="cat-filter">
          {CATS.map((c) => (
            <button
              key={c}
              className={filter === c ? 'on' : ''}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-block">
          <Icon name="search" size={28} />
          <p>검색 결과가 없어요</p>
        </div>
      ) : (
        <div className="browse-grid">
          {filtered.map((s) => {
            const dg = DANGER[s.danger]
            return (
              <button key={s.id} className="case-card" onClick={() => onSelect(s)}>
                <div className="case-card-top">
                  <span className="cat-chip">{s.category}</span>
                  <span className="danger-badge" style={{ color: dg.color }}>
                    <Icon name={dg.icon} size={13} color={dg.color} /> {dg.label}
                  </span>
                </div>
                <div className="case-phrase">"{s.phrase}"</div>
                <div className="case-meaning">{s.meaning}</div>
                <div className="case-temp">
                  <div className="case-temp-bar">
                    <div style={{ width: s.temp + '%', background: tempColor(s.temp) }} />
                  </div>
                  <span style={{ color: tempColor(s.temp) }}>{s.temp}%</span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
