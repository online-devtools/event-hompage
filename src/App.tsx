import { useState, useEffect } from 'react'
import { ChristmasScene } from './components/ChristmasScene'
import { CardModal } from './components/CardModal'
import { FortuneModal } from './components/FortuneModal'
import { MessageViewModal } from './components/MessageViewModal'
import { CountdownTimer } from './components/CountdownTimer'
import { GuestBook } from './components/GuestBook'
import './App.css'

interface Card {
  id: string
  wish: string
  author: string
}

interface Wish {
  id: string
  wish: string
}

interface GuestEntry {
  id: string
  name: string
  message: string
  timestamp: number
}

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [wishes, setWishes] = useState<Wish[]>([])
  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([])
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isWishModalOpen, setIsWishModalOpen] = useState(false)
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false)
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false)
  const [viewMessage, setViewMessage] = useState<{
    isOpen: boolean
    type: 'card' | 'wish'
    message: string
    author?: string
  }>({
    isOpen: false,
    type: 'card',
    message: '',
    author: ''
  })

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedCards = localStorage.getItem('christmas-cards')
    const savedWishes = localStorage.getItem('christmas-wishes')
    const savedGuestEntries = localStorage.getItem('christmas-guestbook')

    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes))
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
    const updatedCards = [...cards, newCard]
    setCards(updatedCards)
    localStorage.setItem('christmas-cards', JSON.stringify(updatedCards))
  }

  // 소원 추가
  const handleAddWish = (wish: string) => {
    const newWish: Wish = {
      id: Date.now().toString(),
      wish,
    }
    const updatedWishes = [...wishes, newWish]
    setWishes(updatedWishes)
    localStorage.setItem('christmas-wishes', JSON.stringify(updatedWishes))
  }

  // 방명록 추가
  const handleAddGuestEntry = (name: string, message: string) => {
    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: Date.now()
    }
    const updatedEntries = [...guestEntries, newEntry]
    setGuestEntries(updatedEntries)
    localStorage.setItem('christmas-guestbook', JSON.stringify(updatedEntries))
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

  // 장식 구슬 클릭 시
  const handleOrnamentClick = (wish: Wish | null) => {
    if (wish) {
      setViewMessage({
        isOpen: true,
        type: 'wish',
        message: wish.wish
      })
    } else {
      setIsWishModalOpen(true)
    }
  }

  return (
    <div className="app">
      {/* 크리스마스 카운트다운 타이머 */}
      <CountdownTimer />

      {/* 3D 크리스마스 씬 */}
      <div className="scene-container">
        <ChristmasScene
          cards={cards}
          wishes={wishes}
          onCardClick={handleCardClick}
          onOrnamentClick={handleOrnamentClick}
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
        <button className="action-btn wish-btn" onClick={() => setIsWishModalOpen(true)}>
          <span className="btn-icon">⭐</span>
          <span className="btn-text">소원 빌기</span>
        </button>
        <button className="action-btn fortune-btn" onClick={() => setIsFortuneModalOpen(true)}>
          <span className="btn-icon">🎴</span>
          <span className="btn-text">운세 뽑기</span>
        </button>
        <button className="action-btn guestbook-btn" onClick={() => setIsGuestBookOpen(true)}>
          <span className="btn-icon">📖</span>
          <span className="btn-text">방명록</span>
        </button>
      </div>

      {/* 안내 메시지 */}
      <div className="info-message">
        <p>🎄 트리의 구슬을 클릭하여 소원을 확인하거나 새 소원을 적어보세요!</p>
        <p>💌 카드를 클릭하면 메시지를 확인할 수 있어요!</p>
        <p>🎴 2026년 신년 운세도 뽑아보세요!</p>
        <p>📖 방명록에 따뜻한 메시지를 남겨주세요!</p>
      </div>

      {/* 카드 작성 모달 */}
      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSubmit={handleAddCard}
        type="card"
      />

      {/* 소원 작성 모달 */}
      <CardModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onSubmit={(wish) => handleAddWish(wish)}
        type="ornament"
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
    </div>
  )
}

export default App
