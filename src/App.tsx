import { useState, useEffect } from 'react'
import { ChristmasScene } from './components/ChristmasScene'
import { CardModal } from './components/CardModal'
import { FortuneModal } from './components/FortuneModal'
import { MessageViewModal } from './components/MessageViewModal'
import { CountdownTimer } from './components/CountdownTimer'
import { GuestBook } from './components/GuestBook'
import { ChristmasGame } from './components/ChristmasGame'
import type { Card, GuestEntry } from './types/models'
import './App.css'

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([])
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false)
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [viewMessage, setViewMessage] = useState<{
    isOpen: boolean
    type: 'card'
    message: string
    author?: string
  }>({
    isOpen: false,
    type: 'card',
    message: '',
    author: ''
  })

  useEffect(() => {
    const savedCards = localStorage.getItem('christmas-cards')
    const savedGuestEntries = localStorage.getItem('christmas-guestbook')

    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
    if (savedGuestEntries) {
      setGuestEntries(JSON.parse(savedGuestEntries))
    }
  }, [])

  // 카드 추가
  const handleAddCard = (wish: string, author: string) => {
    const newCard: Card = {
      id: Date.now().toString(),
      wish,
      author,
    }
    setCards((prev) => {
      const updated = [...prev, newCard]
      localStorage.setItem('christmas-cards', JSON.stringify(updated))
      return updated
    })
  }

  // 방명록 추가
  const handleAddGuestEntry = (name: string, message: string) => {
    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: Date.now()
    }
    setGuestEntries((prev) => {
      const updated = [...prev, newEntry]
      localStorage.setItem('christmas-guestbook', JSON.stringify(updated))
      return updated
    })
  }

  // 카드 클릭 시 상세보기
  const handleCardClick = (card: Card) => {
    setViewMessage({
      isOpen: true,
      type: 'card',
      message: card.wish,
      author: card.author
    })
  }


  return (
    <div className="app">
      {/* 크리스마스 카운트다운 타이머 */}
      <CountdownTimer />

      {/* 3D 크리스마스 씬 */}
      <div className="scene-container">
        <ChristmasScene
          cards={cards}
          onCardClick={handleCardClick}
        />
      </div>

      {/* 오버레이 텍스트 */}
      <div className="overlay">
        <h1 className="title">
          Merry Christmas
          <span className="year">2025</span>
        </h1>
        <p className="message">
          따뜻한 크리스마스 보내세요!
        </p>
        <div className="snowflakes" aria-hidden="true">
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
        </div>
      </div>

      {/* 인터랙티브 버튼들 */}
      <div className="action-buttons">
        <button className="action-btn card-btn" onClick={() => setIsCardModalOpen(true)}>
          <span className="btn-icon">💌</span>
          <span className="btn-text">카드 작성</span>
        </button>
        <button className="action-btn fortune-btn" onClick={() => setIsFortuneModalOpen(true)}>
          <span className="btn-icon">🎴</span>
          <span className="btn-text">운세 뽑기</span>
        </button>
        <button className="action-btn guestbook-btn" onClick={() => setIsGuestBookOpen(true)}>
          <span className="btn-icon">📖</span>
          <span className="btn-text">방명록</span>
        </button>
        <button className="action-btn game-btn" onClick={() => setIsGameOpen(true)}>
          <span className="btn-icon">🎮</span>
          <span className="btn-text">미니게임</span>
        </button>
      </div>

      {/* 안내 메시지 */}
      <div className="info-message">
        <p>💌 카드를 클릭하면 메시지를 확인할 수 있어요!</p>
        <p>🎴 2026년 신년 운세도 뽑아보세요!</p>
        <p>📖 방명록에 따뜻한 메시지를 남겨주세요!</p>
        <p>🎮 미니 게임으로 재미있게 놀아보세요!</p>
      </div>

      {/* 카드 작성 모달 */}
      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSubmit={handleAddCard}
        type="card"
      />

      {/* 운세 모달 */}
      <FortuneModal
        isOpen={isFortuneModalOpen}
        onClose={() => setIsFortuneModalOpen(false)}
      />

      {/* 방명록 모달 */}
      <GuestBook
        isOpen={isGuestBookOpen}
        onClose={() => setIsGuestBookOpen(false)}
        entries={guestEntries}
        onAddEntry={handleAddGuestEntry}
      />

      {/* 메시지 보기 모달 */}
      <MessageViewModal
        isOpen={viewMessage.isOpen}
        onClose={() => setViewMessage({ isOpen: false, type: 'card', message: '', author: '' })}
        type={viewMessage.type}
        message={viewMessage.message}
        author={viewMessage.author}
      />

      {/* 미니 게임 */}
      <ChristmasGame
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
      />
    </div>
  )
}

export default App
