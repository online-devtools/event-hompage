import { ChristmasScene } from './components/ChristmasScene'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* 3D 크리스마스 씬 */}
      <div className="scene-container">
        <ChristmasScene />
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
    </div>
  )
}

export default App
