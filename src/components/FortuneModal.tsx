import { useState } from 'react'
import './FortuneModal.css'

interface FortuneModalProps {
  isOpen: boolean
  onClose: () => void
}

const fortunes = [
  {
    title: '대길(大吉)',
    message: '2026년은 당신에게 최고의 한 해가 될 것입니다! 모든 일이 순조롭게 풀리고, 새로운 기회가 찾아올 것입니다.',
    emoji: '🌟',
    color: '#FFD700'
  },
  {
    title: '길(吉)',
    message: '행운이 가득한 한 해가 될 것입니다. 긍정적인 마음가짐으로 하루하루를 보내세요!',
    emoji: '✨',
    color: '#FFA500'
  },
  {
    title: '중길(中吉)',
    message: '안정적이고 평온한 한 해가 될 것입니다. 작은 행복들을 소중히 여기세요.',
    emoji: '🍀',
    color: '#90EE90'
  },
  {
    title: '소길(小吉)',
    message: '작지만 확실한 행복이 찾아올 것입니다. 주변 사람들과의 인연을 소중히 하세요.',
    emoji: '🌸',
    color: '#FFB6C1'
  },
  {
    title: '말길(末吉)',
    message: '늦게라도 좋은 일이 찾아올 것입니다. 인내심을 가지고 노력하세요!',
    emoji: '🌈',
    color: '#87CEEB'
  },
  {
    title: '반길(半吉)',
    message: '좋은 일과 나쁜 일이 섞여 있을 수 있습니다. 균형을 유지하는 것이 중요합니다.',
    emoji: '⚖️',
    color: '#DDA0DD'
  },
  {
    title: '희망의 해',
    message: '새로운 시작이 기다리고 있습니다. 도전을 두려워하지 마세요!',
    emoji: '🚀',
    color: '#FF69B4'
  },
  {
    title: '성장의 해',
    message: '배움과 성장의 한 해가 될 것입니다. 꾸준한 노력이 결실을 맺을 것입니다.',
    emoji: '🌱',
    color: '#98FB98'
  },
  {
    title: '행복의 해',
    message: '가족과 친구들과 함께하는 따뜻한 순간들이 많을 것입니다.',
    emoji: '💝',
    color: '#FFB6C1'
  },
  {
    title: '풍요의 해',
    message: '물질적, 정신적으로 풍요로운 한 해가 될 것입니다. 감사하는 마음을 잊지 마세요.',
    emoji: '🎁',
    color: '#FFD700'
  }
]

export function FortuneModal({ isOpen, onClose }: FortuneModalProps) {
  const [selectedFortune, setSelectedFortune] = useState<typeof fortunes[0] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  if (!isOpen) return null

  const drawFortune = () => {
    setIsDrawing(true)

    // 뽑는 애니메이션 효과
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length)
      setSelectedFortune(fortunes[randomIndex])
      setIsDrawing(false)
    }, 1500)
  }

  const reset = () => {
    setSelectedFortune(null)
  }

  return (
    <div className="fortune-overlay" onClick={onClose}>
      <div className="fortune-content" onClick={(e) => e.stopPropagation()}>
        <button className="fortune-close" onClick={onClose}>×</button>

        <h2 className="fortune-title">🎴 2026년 신년 운세</h2>

        {!selectedFortune ? (
          <div className="fortune-draw-section">
            <div className={`fortune-box ${isDrawing ? 'drawing' : ''}`}>
              <div className="fortune-box-lid"></div>
              <div className="fortune-box-body">
                {isDrawing ? (
                  <div className="fortune-loading">
                    <div className="fortune-spinner"></div>
                    <p>운세를 뽑는 중...</p>
                  </div>
                ) : (
                  <>
                    <div className="fortune-question-mark">?</div>
                    <p className="fortune-instruction">아래 버튼을 눌러 운세를 뽑아보세요!</p>
                  </>
                )}
              </div>
            </div>

            <button
              className="fortune-draw-btn"
              onClick={drawFortune}
              disabled={isDrawing}
            >
              {isDrawing ? '뽑는 중...' : '✨ 운세 뽑기 ✨'}
            </button>
          </div>
        ) : (
          <div className="fortune-result" style={{ borderColor: selectedFortune.color }}>
            <div className="fortune-emoji" style={{ color: selectedFortune.color }}>
              {selectedFortune.emoji}
            </div>
            <h3 className="fortune-result-title" style={{ color: selectedFortune.color }}>
              {selectedFortune.title}
            </h3>
            <p className="fortune-result-message">
              {selectedFortune.message}
            </p>

            <div className="fortune-actions">
              <button className="fortune-retry-btn" onClick={reset}>
                다시 뽑기
              </button>
              <button className="fortune-save-btn" onClick={onClose}>
                확인
              </button>
            </div>
          </div>
        )}

        <p className="fortune-footer">
          ⭐ 새해 복 많이 받으세요! ⭐
        </p>
      </div>
    </div>
  )
}
