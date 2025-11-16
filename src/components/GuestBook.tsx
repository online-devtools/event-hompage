import { useState } from 'react'
import './GuestBook.css'

interface GuestEntry {
  id: string
  name: string
  message: string
  timestamp: number
}

interface GuestBookProps {
  isOpen: boolean
  onClose: () => void
  entries: GuestEntry[]
  onAddEntry: (name: string, message: string) => void
}

export function GuestBook({ isOpen, onClose, entries, onAddEntry }: GuestBookProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && message.trim()) {
      onAddEntry(name, message)
      setName('')
      setMessage('')
    }
  }

  return (
    <div className="guestbook-overlay" onClick={onClose}>
      <div className="guestbook-content" onClick={(e) => e.stopPropagation()}>
        <button className="guestbook-close" onClick={onClose}>×</button>

        <h2 className="guestbook-title">📖 방명록</h2>
        <p className="guestbook-subtitle">따뜻한 크리스마스 메시지를 남겨주세요!</p>

        <form onSubmit={handleSubmit} className="guestbook-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            maxLength={20}
            className="guestbook-input"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 남겨주세요..."
            maxLength={200}
            rows={3}
            className="guestbook-textarea"
            required
          />
          <span className="guestbook-char-count">{message.length}/200</span>
          <button type="submit" className="guestbook-submit-btn">
            ✍️ 방명록 남기기
          </button>
        </form>

        <div className="guestbook-entries">
          <h3 className="guestbook-entries-title">
            💌 방문자 메시지 ({entries.length})
          </h3>
          <div className="guestbook-list">
            {entries.length === 0 ? (
              <p className="guestbook-empty">첫 번째 방명록을 남겨보세요!</p>
            ) : (
              entries.slice().reverse().map((entry) => (
                <div key={entry.id} className="guestbook-entry">
                  <div className="guestbook-entry-header">
                    <span className="guestbook-entry-name">👤 {entry.name}</span>
                    <span className="guestbook-entry-date">
                      {new Date(entry.timestamp).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="guestbook-entry-message">{entry.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
