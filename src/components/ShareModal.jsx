import { useState } from 'react'
import Icon from './Icon'

export default function ShareModal({ r, onClose, onCopied }) {
  const [copied, setCopied] = useState(false)
  const shareId = btoa(encodeURIComponent(r.phrase)).slice(0, 8)
  const shareUrl = `${location.origin}/?s=${shareId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      const el = document.createElement('textarea')
      el.value = shareUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    onCopied()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-scrim" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="share-modal">
        <div className="share-modal-head">
          <h3>공유하기</h3>
          <button className="icon-btn" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>

        <div className="share-preview">
          <div className="share-preview-cat">{r.category}</div>
          <div className="share-preview-phrase">"{r.phrase}"</div>
          <div className="share-preview-meaning">{r.meaning}</div>
        </div>

        <div className="share-link-row">
          <span className="share-link-url">{shareUrl}</span>
          <button className={`share-copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
            {copied ? <><Icon name="check" size={14} color="#fff" /> 복사됨</> : <><Icon name="link" size={14} color="#fff" /> 링크 복사</>}
          </button>
        </div>

        <div className="share-actions">
          <button className="share-social-btn" onClick={() => {
            const url = `https://open.kakao.com/`
            window.open(url, '_blank', 'noopener')
          }}>
            <Icon name="message" size={16} /> 카카오톡
          </button>
          <button className="share-social-btn" onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'GT — Girl Translator', text: `"${r.phrase}" → ${r.meaning}`, url: shareUrl })
            }
          }}>
            <Icon name="share" size={16} /> 더보기
          </button>
        </div>
      </div>
    </div>
  )
}
