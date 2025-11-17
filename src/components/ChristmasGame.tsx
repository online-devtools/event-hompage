import { useState, useEffect } from 'react'
import './ChristmasGame.css'

interface ChristmasGameProps {
  isOpen: boolean
  onClose: () => void
}

export function ChristmasGame({ isOpen, onClose }: ChristmasGameProps) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)
  const [presents, setPresents] = useState<{ id: number; x: number; y: number; collected: boolean }[]>([])
  const [highScore, setHighScore] = useState(0)

  // 하이스코어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('christmas-game-highscore')
    if (saved) {
      setHighScore(parseInt(saved))
    }
  }, [])

  // 게임 시작
  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameStarted(true)
    generatePresents()
  }

  // 선물 생성
  const generatePresents = () => {
    const newPresents = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 85,
      y: Math.random() * 75,
      collected: false
    }))
    setPresents(newPresents)
  }

  // 타이머
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      endGame()
    }
  }, [gameStarted, timeLeft])

  // 게임 종료
  const endGame = () => {
    setGameStarted(false)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('christmas-game-highscore', score.toString())
    }
  }

  // 선물 클릭
  const handlePresentClick = (id: number) => {
    setPresents(prev =>
      prev.map(p => (p.id === id ? { ...p, collected: true } : p))
    )
    setScore(score + 10)
  }

  if (!isOpen) return null

  return (
    <div className="game-overlay" onClick={onClose}>
      <div className="game-content" onClick={(e) => e.stopPropagation()}>
        <button className="game-close" onClick={onClose}>×</button>

        <h2 className="game-title">🎁 선물 찾기 게임</h2>

        <div className="game-info">
          <div className="game-stat">
            <span>점수:</span>
            <span className="game-value">{score}</span>
          </div>
          <div className="game-stat">
            <span>시간:</span>
            <span className="game-value">{timeLeft}초</span>
          </div>
          <div className="game-stat">
            <span>최고점수:</span>
            <span className="game-value">{highScore}</span>
          </div>
        </div>

        {!gameStarted ? (
          <div className="game-start">
            <p className="game-instruction">
              30초 안에 화면에 나타나는 선물을 최대한 많이 클릭하세요!
              <br />
              선물 하나당 10점!
            </p>
            <button className="game-start-btn" onClick={startGame}>
              🎮 게임 시작
            </button>
            {score > 0 && (
              <div className="game-result">
                <h3>최종 점수: {score}점</h3>
                {score > highScore && <p className="new-record">🎉 신기록!</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="game-area">
            {presents.map(present =>
              !present.collected ? (
                <div
                  key={present.id}
                  className="present"
                  style={{
                    left: `${present.x}%`,
                    top: `${present.y}%`
                  }}
                  onClick={() => handlePresentClick(present.id)}
                >
                  🎁
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  )
}
