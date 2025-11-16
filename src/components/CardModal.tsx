import { useState } from 'react'
import './CardModal.css'

interface CardModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (wish: string, author: string) => void
  type: 'card' | 'ornament'
}

export function CardModal({ isOpen, onClose, onSubmit, type }: CardModalProps) {
  const [wish, setWish] = useState('')
  const [author, setAuthor] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (wish.trim() && author.trim()) {
      onSubmit(wish, author)
      setWish('')
      setAuthor('')
      onClose()
    }
  }

  const title = type === 'card' ? '크리스마스 카드 작성' : '새해 소원 적기'
  const placeholder = type === 'card'
    ? '따뜻한 크리스마스 메시지를 남겨주세요...'
    : '2025년 새해 소원을 적어주세요...'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title">{title}</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="wish">
              {type === 'card' ? '메시지' : '소원'}
            </label>
            <textarea
              id="wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder={placeholder}
              maxLength={100}
              rows={4}
              required
            />
            <span className="char-count">{wish.length}/100</span>
          </div>

          <div className="form-group">
            <label htmlFor="author">이름</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자 이름"
              maxLength={20}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {type === 'card' ? '카드 추가하기' : '소원 걸기'}
          </button>
        </form>
      </div>
    </div>
  )
}
