import { useState, useEffect } from 'react'
import './CountdownTimer.css'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      const christmas = new Date(currentYear, 11, 25) // 12월 25일

      // 크리스마스가 지났으면 다음 해 크리스마스로
      if (now > christmas) {
        christmas.setFullYear(currentYear + 1)
      }

      const difference = christmas.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">🎄 크리스마스까지 🎄</h3>
      <div className="countdown-boxes">
        <div className="countdown-box">
          <div className="countdown-number">{timeLeft.days}</div>
          <div className="countdown-label">일</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-box">
          <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-label">시간</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-box">
          <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">분</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-box">
          <div className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">초</div>
        </div>
      </div>
    </div>
  )
}
