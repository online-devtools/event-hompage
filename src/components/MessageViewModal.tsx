import './MessageViewModal.css'

interface MessageViewModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'card' | 'wish'
  message: string
  author?: string
}

export function MessageViewModal({ isOpen, onClose, type, message, author }: MessageViewModalProps) {
  if (!isOpen) return null

  return (
    <div className="message-view-overlay" onClick={onClose}>
      <div className="message-view-content" onClick={(e) => e.stopPropagation()}>
        <button className="message-view-close" onClick={onClose}>×</button>

        <div className="message-view-header">
          <span className="message-view-icon">
            {type === 'card' ? '💌' : '⭐'}
          </span>
          <h2 className="message-view-title">
            {type === 'card' ? '크리스마스 카드' : '새해 소원'}
          </h2>
        </div>

        <div className="message-view-body">
          <div className="message-view-decoration"></div>
          <p className="message-view-text">
            {message}
          </p>
          <div className="message-view-decoration"></div>
        </div>

        {author && (
          <div className="message-view-footer">
            <p className="message-view-author">- {author}</p>
          </div>
        )}

        <div className="message-view-snowflakes">
          <span>❄</span>
          <span>❅</span>
          <span>❄</span>
        </div>
      </div>
    </div>
  )
}
