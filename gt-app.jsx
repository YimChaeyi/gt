/* GT — Girl Translator · main translation screen */
const { useState, useRef } = React;

/* ---------------- Inline icons (Wanted icon set, currentColor) ---------------- */
const ICONS = {
  sparkle:  { vb: "0 0 20.43 20.25", d: "M7.081 4.945C7.483 4.734 7.983 4.731 8.384 4.945C8.674 5.1 8.87 5.369 9.01 5.66C9.11 5.868 9.213 6.143 9.323 6.433L9.805 7.71C10.15 8.624 10.274 8.929 10.451 9.179C10.621 9.419 10.83 9.63 11.071 9.8C11.32 9.976 11.627 10.099 12.54 10.444L13.818 10.927C14.108 11.036 14.382 11.139 14.59 11.239C14.763 11.322 15.111 11.499 15.304 11.866C15.518 12.274 15.518 12.761 15.304 13.169C15.111 13.535 14.763 13.712 14.59 13.795C14.382 13.895 14.108 13.998 13.818 14.107L12.54 14.59C11.626 14.935 11.32 15.059 11.071 15.235C10.831 15.405 10.621 15.615 10.451 15.855C10.274 16.105 10.15 16.412 9.805 17.325L9.323 18.603C9.213 18.893 9.11 19.167 9.01 19.375C8.927 19.548 8.75 19.896 8.384 20.089C8.18 20.196 7.956 20.249 7.733 20.249C7.509 20.249 7.285 20.196 7.081 20.089C6.715 19.896 6.537 19.548 6.454 19.375C6.355 19.167 6.252 18.893 6.142 18.603L5.66 17.325C5.314 16.411 5.191 16.105 5.015 15.855C4.845 15.615 4.634 15.406 4.394 15.235C4.144 15.059 3.839 14.935 2.925 14.59L1.648 14.107C1.358 13.998 1.083 13.895 0.875 13.795C0.703 13.712 0.353 13.536 0.161 13.169C-0.054 12.761 -0.053 12.274 0.161 11.866C0.353 11.499 0.703 11.322 0.875 11.239C1.083 11.139 1.358 11.036 1.648 10.927L2.925 10.444C3.838 10.099 4.145 9.976 4.394 9.8C4.634 9.63 4.845 9.419 5.015 9.179C5.191 8.929 5.314 8.623 5.66 7.71L6.142 6.433C6.251 6.143 6.355 5.868 6.454 5.66C6.537 5.488 6.715 5.138 7.081 4.945ZM15.703 0C15.833 0 15.963 0.023 16.086 0.071L16.315 0.197C16.547 0.371 16.646 0.614 16.678 0.689C16.734 0.821 16.79 0.99 16.843 1.15L17.069 1.835C17.268 2.439 17.326 2.59 17.407 2.708C17.491 2.831 17.598 2.939 17.721 3.023C17.839 3.104 17.991 3.161 18.595 3.36L19.279 3.587C19.439 3.64 19.609 3.695 19.741 3.751C19.816 3.783 20.059 3.882 20.233 4.114L20.358 4.343C20.47 4.63 20.452 4.956 20.302 5.23C20.133 5.539 19.827 5.664 19.741 5.701C19.609 5.757 19.439 5.813 19.279 5.866L18.595 6.092C17.991 6.291 17.839 6.35 17.721 6.43C17.598 6.514 17.491 6.621 17.407 6.744C17.326 6.862 17.268 7.014 17.069 7.618L16.843 8.302C16.79 8.462 16.734 8.632 16.678 8.764C16.641 8.85 16.517 9.156 16.207 9.325C16.051 9.411 15.877 9.454 15.703 9.454C15.53 9.454 15.357 9.411 15.2 9.325C14.889 9.155 14.765 8.85 14.728 8.764C14.672 8.632 14.617 8.462 14.564 8.302L14.337 7.618C14.138 7.014 14.081 6.862 14 6.744C13.916 6.621 13.808 6.514 13.685 6.43C13.567 6.349 13.416 6.291 12.812 6.092L12.127 5.866C11.967 5.813 11.798 5.757 11.666 5.701C11.581 5.665 11.275 5.541 11.105 5.23C10.933 4.917 10.933 4.537 11.105 4.223L11.242 4.033C11.405 3.859 11.6 3.779 11.666 3.751C11.798 3.695 11.967 3.64 12.127 3.587L12.812 3.36C13.415 3.161 13.567 3.103 13.685 3.023C13.808 2.939 13.916 2.831 14 2.708C14.08 2.59 14.138 2.438 14.337 1.835L14.564 1.15C14.617 0.99 14.672 0.821 14.728 0.689C14.765 0.603 14.89 0.297 15.2 0.128L15.412 0.04C15.475 0.022 15.54 0.01 15.605 0.004C15.637 0.001 15.67 0 15.703 0Z" },
  check:    { vb: "0 0 19.8 19.8", d: "M0 9.9C0 4.432 4.432 0 9.9 0C15.367 0 19.8 4.432 19.8 9.9C19.8 15.368 15.367 19.8 9.9 19.8C4.432 19.8 0 15.368 0 9.9ZM14.547 7.776C14.892 7.419 14.883 6.849 14.526 6.503C14.169 6.158 13.599 6.167 13.253 6.524L8.577 11.355L6.547 9.252C6.202 8.894 5.633 8.884 5.275 9.23C4.917 9.575 4.907 10.145 5.252 10.502L7.929 13.275C8.098 13.451 8.332 13.55 8.576 13.55C8.82 13.55 9.053 13.451 9.223 13.276L14.547 7.776Z" },
  warn:     { vb: "0 0 20.081 18.175", d: "M8.861 0.251C9.612 -0.084 10.469 -0.084 11.22 0.251C11.743 0.484 12.121 0.911 12.449 1.376C12.775 1.836 13.133 2.457 13.569 3.211L18.68 12.064C19.115 12.818 19.473 13.439 19.71 13.951C19.948 14.468 20.129 15.008 20.069 15.578C19.983 16.396 19.555 17.138 18.89 17.621C18.426 17.958 17.867 18.072 17.301 18.123C16.739 18.175 16.023 18.175 15.151 18.175L4.929 18.175C4.058 18.175 3.342 18.175 2.78 18.123C2.213 18.072 1.655 17.958 1.191 17.621C0.526 17.138 0.097 16.396 0.012 15.578C-0.048 15.008 0.133 14.468 0.371 13.951C0.607 13.439 0.965 12.818 1.401 12.064L6.512 3.211C6.948 2.457 7.306 1.836 7.631 1.376C7.96 0.911 8.337 0.484 8.861 0.251ZM10.04 5.25C10.538 5.25 10.94 5.653 10.94 6.15L10.94 10.15C10.94 10.647 10.538 11.05 10.04 11.05C9.543 11.05 9.14 10.647 9.14 10.15L9.14 6.15C9.14 5.653 9.543 5.25 10.04 5.25ZM11.04 13.65C11.04 14.202 10.593 14.65 10.04 14.65C9.488 14.65 9.04 14.202 9.04 13.65C9.04 13.098 9.488 12.65 10.04 12.65C10.593 12.65 11.04 13.098 11.04 13.65Z" },
  fire:     { vb: "0 0 18.3 20.869", d: "M8.759 0.88C9.384 -0.104 10.76 -0.31 11.634 0.503C15.73 4.317 18.3 7.977 18.3 12.069C18.3 16.985 14.479 20.869 9.15 20.869C6.517 20.869 4.224 19.971 2.583 18.393C0.939 16.813 0 14.599 0 12.069C0 9.344 1.111 6.732 3.01 4.731C3.638 4.069 4.638 4.098 5.261 4.658L5.961 5.288L8.759 0.88ZM5.65 14.069C5.65 15.969 7.2 17.469 9.15 17.469C11.1 17.469 12.65 15.969 12.65 14.069C12.65 12.169 11.1 10.669 9.15 8.969C7.2 10.669 5.65 12.169 5.65 14.069Z" },
  share:    { vb: "0 0 18.3 19.299", d: "M14.9 0C13.022 0 11.5 1.522 11.5 3.4C11.5 3.667 11.531 3.926 11.589 4.175L5.852 7.293C5.233 6.65 4.363 6.249 3.4 6.249C1.522 6.249 0 7.771 0 9.649C0 11.527 1.522 13.049 3.4 13.049C4.363 13.049 5.232 12.649 5.85 12.006L11.589 15.125C11.531 15.373 11.5 15.633 11.5 15.899C11.5 17.777 13.022 19.299 14.9 19.299C16.778 19.299 18.3 17.777 18.3 15.899C18.3 14.021 16.778 12.499 14.9 12.499C13.937 12.499 13.067 12.9 12.448 13.543L6.711 10.425C6.769 10.176 6.8 9.916 6.8 9.649C6.8 9.383 6.769 9.123 6.711 8.875L12.449 5.756C13.068 6.4 13.937 6.8 14.9 6.8C16.778 6.8 18.3 5.278 18.3 3.4C18.3 1.522 16.778 0 14.9 0Z" },
  clock:    { vb: "0 0 19.8 19.8", d: "M9.4 4.5C9.897 4.5 10.3 4.903 10.3 5.4L10.3 10.027L12.511 12.238C12.862 12.59 12.862 13.159 12.511 13.511C12.159 13.862 11.59 13.862 11.238 13.511L8.763 11.036C8.584 10.856 8.496 10.62 8.5 10.385L8.5 5.4C8.5 4.903 8.903 4.5 9.4 4.5ZM9.9 0C4.432 0 0 4.432 0 9.9C0 15.368 4.432 19.8 9.9 19.8C15.368 19.8 19.8 15.368 19.8 9.9C19.8 4.432 15.368 0 9.9 0ZM1.8 9.9C1.8 5.426 5.426 1.8 9.9 1.8C14.373 1.8 18 5.426 18 9.9C18 14.374 14.373 18 9.9 18C5.426 18 1.8 14.374 1.8 9.9Z" },
};
function Icon({ name, size = 16, color, style }) {
  const ic = ICONS[name]; if (!ic) return null;
  return (
    <svg className="ic" width={size} height={size} viewBox={ic.vb} fill="none"
      style={{ color, flexShrink: 0, ...style }}>
      <path d={ic.d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/* ---------------- Data (PRD §6.1 built-ins + emotion temp + tips) ---------------- */
const CATS = ["연인", "친구", "가족", "직장·학교", "기타"];
const DANGER = [
  { label: "안전", color: "var(--status-positive)", icon: "check", note: "긴장도 낮음. 평소 톤으로 가볍게 받아도 괜찮아요." },
  { label: "주의", color: "var(--status-cautionary)", icon: "warn", note: "신호를 놓치면 서운함이 쌓일 수 있어요. 한 번 더 살펴보세요." },
  { label: "위험", color: "var(--status-negative)", icon: "warn", note: "지금 대응이 중요해요. 그냥 넘어가면 갈등으로 번질 수 있어요." },
];
const SAMPLES = {
  "괜찮아~": { category: "연인", temp: 88, danger: 2,
    meaning: "지금 전혀 안 괜찮아요. \u201C뭐가 문제인지 네가 먼저 알아차리고 물어봐 주길\u201D 바라는 신호예요. 여기서 \u201C응 알겠어\u201D 하고 넘어가면 서운함이 두 배가 됩니다.",
    tips: ["\u201C무슨 일 있어? 내가 뭐 신경 쓰이게 했어?\u201D 먼저 다가가기", "\u201C괜찮아\u201D를 글자 그대로 믿지 않기", "해결책보다 공감 먼저 — 마음부터 풀어주기"] },
  "아니야 됐어": { category: "연인", temp: 94, danger: 2,
    meaning: "절대 그냥 넘어가면 안 되는 신호예요. 서운함이 임계점까지 차올라서 한 발 물러선 상태. \u201C됐어\u201D는 끝이 아니라 \u201C지금 당장 붙잡아 달라\u201D는 뜻입니다.",
    tips: ["\u201C미안해, 내가 더 신경 쓸게\u201D 진심으로 붙잡기", "자리를 뜨거나 대화를 미루지 않기", "이유를 캐묻기보다 먼저 마음을 인정해 주기"] },
  "알아서 해": { category: "연인", temp: 66, danger: 1,
    meaning: "정말 알아서 하라는 게 아니에요. \u201C내 마음을 헤아려서, 내가 좋아할 만한 걸 골라줘\u201D라는 뜻. 여기서 진짜 알아서 정하면 다음 약속이 위험해집니다.",
    tips: ["\u201C그럼 OO 어때? 네가 좋아할 것 같아서\u201D 의견 제안하기", "상대가 전에 좋아했던 걸 떠올려 맞추기", "\u201C아무거나\u201D라는 답에 진짜 아무거나 고르지 않기"] },
  "나 집에 갈게": { category: "친구", temp: 58, danger: 1,
    meaning: "기분이 상했다는 표현이에요. 진짜 집에 가고 싶다기보다 \u201C지금 이 분위기가 불편하다, 나를 붙잡아 줬으면\u201D 하는 마음일 때가 많아요.",
    tips: ["\u201C왜? 무슨 일 있었어?\u201D 이유를 먼저 물어보기", "바로 보내지 말고 한 번 붙잡아 보기", "분위기를 바꿀 작은 화제를 꺼내 보기"] },
  "뭐 먹고 싶어?": { category: "친구", temp: 32, danger: 0,
    meaning: "이미 먹고 싶은 게 정해져 있을 확률이 높아요. 내 의견을 묻는다기보다 \u201C눈치껏 맞춰줘\u201D 또는 \u201C같이 정하자\u201D는 가벼운 신호입니다.",
    tips: ["\u201C너 요즘 먹고 싶던 거 있었잖아, 그거 어때?\u201D 떠보기", "두세 개 선택지를 제시해 고르게 하기", "정말 모르겠으면 솔직하게 \u201C네가 골라\u201D 하기"] },
  "됐어, 엄마가 할게": { category: "가족", temp: 54, danger: 1,
    meaning: "\u201C이번엔 내가 하지만, 다음엔 먼저 나서 줬으면\u201D 하는 마음을 강조하는 중이에요. 정말 괜찮아서가 아니라 서운함이 살짝 묻어 있는 표현입니다.",
    tips: ["\u201C아니야, 내가 할게\u201D 하고 바로 일어나기", "다음엔 묻기 전에 먼저 챙기기", "\u201C고마워, 다음엔 내가 미리 할게\u201D 마음 표현하기"] },
};
const EXAMPLES = ["괜찮아~", "아니야 됐어", "알아서 해", "뭐 먹고 싶어?"];

function lookup(phrase, category) {
  const key = phrase.trim();
  if (SAMPLES[key]) return { ...SAMPLES[key], phrase: key, matched: true };
  return {
    phrase: key, matched: false, category, temp: 50, danger: 1,
    meaning: "아직 정확히 매칭되는 사례가 없어요. 하지만 이런 말 뒤에는 보통 \u201C표현한 것보다 더 큰 마음\u201D이 숨어 있어요. 말 자체보다 표정과 맥락을 함께 살펴보세요.",
    tips: ["지금의 상황과 표정을 함께 떠올려 보기", "\u201C혹시 내가 놓친 거 있어?\u201D 부드럽게 물어보기", "이 표현을 \u2018내 데이터\u2019에 등록해 다음 번역에 반영하기"],
  };
}
function tempColor(t) {
  if (t >= 80) return "var(--status-negative)";
  if (t >= 45) return "var(--status-cautionary)";
  return "var(--status-positive)";
}
function nowLabel() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

/* ---------------- Result card ---------------- */
function ResultCard({ r, layout, onShare }) {
  const dg = DANGER[r.danger];
  const meaningBlock = (
    <div className="meaning">
      <span className="tag"><Icon name="sparkle" size={14} /> 진짜 의미</span>
      <p>{r.meaning}</p>
    </div>
  );
  const tipsBlock = (
    <div className="tips">
      <h4><Icon name="check" size={15} color="var(--gt-primary)" /> 이렇게 해보세요</h4>
      <ul>
        {r.tips.map((t, i) => (
          <li key={i}><span className="ic"><Icon name="check" size={17} /></span>{t}</li>
        ))}
      </ul>
    </div>
  );
  const tempBlock = (
    <div className="metric-card">
      <div className="metric-top">
        <span className="metric-label"><Icon name="fire" size={15} color={tempColor(r.temp)} /> 감정 온도</span>
        <span className="temp-num" style={{ color: tempColor(r.temp) }}>{r.temp}<span style={{ fontSize: 14, fontWeight: 600 }}>%</span></span>
      </div>
      <div className="temp-track"><div className="temp-fill" style={{ width: r.temp + "%", background: tempColor(r.temp) }} /></div>
      <div className="temp-scale"><span>차분함</span><span>폭발 직전</span></div>
    </div>
  );
  const dangerBlock = (
    <div className="metric-card">
      <div className="metric-top"><span className="metric-label">위험도 신호</span></div>
      <div className="danger-seg">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ background: i <= r.danger ? dg.color : "var(--fill-strong-a)" }} />
        ))}
      </div>
      <span className="danger-chip" style={{ color: dg.color }}>
        <Icon name={dg.icon} size={17} color={dg.color} /> {dg.label}
      </span>
      <p className="danger-note">{dg.note}</p>
    </div>
  );

  return (
    <div className="result-wrap">
      <div className="card panel">
        <div className="result-head">
          <span className="cat-chip">{r.category}</span>
          <span className="said"><span className="q">“</span>{r.phrase}<span className="q">”</span></span>
        </div>

        {layout === "split" ? (
          <div className="result-grid split">
            <div className="subpanel">{meaningBlock}{tipsBlock}</div>
            <div className="subpanel">{tempBlock}{dangerBlock}</div>
          </div>
        ) : (
          <div className="result-grid">
            {meaningBlock}
            <div className="result-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>{tempBlock}{dangerBlock}</div>
            {tipsBlock}
          </div>
        )}

        <div className="result-foot">
          <button className="ghost-btn" onClick={onShare}><Icon name="share" size={15} /> 공유하기</button>
          <span className="ts"><Icon name="clock" size={14} /> 방금 번역 · {r.ts}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#0066FF",
  "resultLayout": "stacked"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [category, setCategory] = useState("연인");
  const [context, setContext] = useState("");
  const [phrase, setPhrase] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const resultRef = useRef(null);

  const translate = (text, cat) => {
    const p = (text ?? phrase), c = (cat ?? category);
    if (!p.trim()) return;
    const r = lookup(p, c);
    r.ts = nowLabel();
    setResult(r);
    setHistory((h) => [r, ...h.filter((x) => x.phrase !== r.phrase)].slice(0, 3));
  };

  const onExample = (ex) => {
    const cat = SAMPLES[ex] ? SAMPLES[ex].category : category;
    setPhrase(ex); setCategory(cat); translate(ex, cat);
  };

  return (
    <div style={{ "--gt-primary": t.primaryColor,
      "--gt-primary-bg": `color-mix(in srgb, ${t.primaryColor} 8%, white)`,
      "--gt-primary-line": `color-mix(in srgb, ${t.primaryColor} 24%, white)` }}>

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
            <a href="#" onClick={(e) => e.preventDefault()}>사례 둘러보기</a>
            <a href="#" onClick={(e) => e.preventDefault()}>내 데이터</a>
          </nav>
          <div className="gt-header-right">
            <span className="gt-offline"><span className="dot" /> 오프라인 작동</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="gt-main">
        <div className="gt-hero">
          <span className="gt-eyebrow"><Icon name="sparkle" size={13} /> 상황 + 말을 입력하면 번역해 드려요</span>
          <h1>그 말, <span className="accent">진짜 뜻</span>이 뭘까?</h1>
          <p>표현과 속마음이 다를 때. 상황과 말을 넣으면 숨은 의미와 대처법을 알려드립니다.</p>
        </div>

        {/* Input panel */}
        <section className="card panel" aria-label="번역 입력">
          <div className="field">
            <label className="field-label">상황 <span className="req">*</span></label>
            <div className="seg">
              {CATS.map((c) => (
                <button key={c} className={c === category ? "on" : ""} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="ctx">상황 보충 설명 <span className="opt">선택 · 최대 200자</span></label>
            <textarea id="ctx" className="gt-input" rows={2} maxLength={200}
              placeholder="예) 데이트 약속을 깜빡한 다음 날, 평소보다 답장이 짧아졌어요."
              value={context} onChange={(e) => setContext(e.target.value)} />
            <div className="char-count">{context.length} / 200</div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="phrase">여자가 한 말 <span className="req">*</span></label>
            <input id="phrase" className="gt-input big" maxLength={100}
              placeholder="예) 괜찮아~"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") translate(); }} />
            <div className="examples">
              <span className="lbl">예시</span>
              {EXAMPLES.map((ex) => (
                <button key={ex} className="chip" onClick={() => onExample(ex)}>{ex}</button>
              ))}
            </div>
          </div>

          <button className="gt-submit" disabled={!phrase.trim()} onClick={() => translate()}>
            <Icon name="sparkle" size={18} color="#fff" /> 번역하기
          </button>
        </section>

        {/* Result */}
        <div ref={resultRef}>
          {result && <ResultCard r={result} layout={t.resultLayout} onShare={() => {}} />}
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
                <button key={i} className="hist-card" onClick={() => { setResult({ ...h, ts: nowLabel() }); setPhrase(h.phrase); setCategory(h.category); }}>
                  <div className="hist-top">
                    <span className="hist-cat">{h.category}</span>
                    <span className="hist-dot" style={{ background: DANGER[h.danger].color }} />
                  </div>
                  <div className="hist-said">“{h.phrase}”</div>
                  <div className="hist-mean">{h.meaning}</div>
                </button>
              ))}
            </div>
          )}
        </section>

        <p className="gt-disclaimer">
          GT는 재미와 공감을 위한 콘텐츠 서비스입니다. 모든 데이터는 내 브라우저에만 저장돼요.<br />
          사람의 마음은 사람마다 다릅니다 — 번역 결과는 참고용으로만 활용해 주세요.
        </p>
      </main>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="브랜드" />
        <TweakColor label="포인트 컬러" value={t.primaryColor}
          options={["#0066FF", "#6541F2", "#E84B8A", "#00B8D4"]}
          onChange={(v) => setTweak("primaryColor", v)} />
        <TweakSection label="결과 카드" />
        <TweakRadio label="레이아웃" value={t.resultLayout}
          options={["stacked", "split"]}
          onChange={(v) => setTweak("resultLayout", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
