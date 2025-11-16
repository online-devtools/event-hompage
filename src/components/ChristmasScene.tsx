import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'
import { ChristmasTree } from './ChristmasTree'
import { Snowfall } from './Snowfall'
import { Gifts } from './Gifts'
import { WishCard } from './WishCard'
import { InteractiveOrnament } from './InteractiveOrnament'
import { SantaSleigh } from './SantaSleigh'
import { ChristmasHouse } from './ChristmasHouse'
import { Snowman } from './Snowman'

interface Card {
  id: string
  wish: string
  author: string
}

interface Wish {
  id: string
  wish: string
}

interface ChristmasSceneProps {
  cards: Card[]
  wishes: Wish[]
  onCardClick: (card: Card) => void
  onOrnamentClick: (wish: Wish | null, position: [number, number, number]) => void
}

export function ChristmasScene({ cards, wishes, onCardClick, onOrnamentClick }: ChristmasSceneProps) {
  // 장식 구슬 위치 정의
  const ornamentPositions: [number, number, number][] = [
    [-0.4, 0.8, 0.3],
    [0.4, 0.6, 0.2],
    [-0.3, 0.3, -0.2],
    [0.3, 0.1, 0.3],
    [0, -0.2, -0.3],
    [-0.35, -0.5, 0.2],
    [0.35, -0.8, -0.1],
  ]

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      shadows
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ background: 'linear-gradient(to bottom, #001a33 0%, #003366 100%)' }}
    >
      {/* 조명 개선 */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[5, 2, 5]} intensity={0.6} color="#ffaa00" />

      {/* 환경 맵 (반사 효과) */}
      <Environment preset="night" />

      {/* 별이 빛나는 배경 */}
      <Stars radius={100} depth={50} count={7000} factor={5} saturation={0} fade speed={1} />

      {/* 산타와 루돌프 썰매 */}
      <SantaSleigh />

      {/* 크리스마스 트리 */}
      <ChristmasTree />

      {/* 굴뚝 있는 집 */}
      <ChristmasHouse />

      {/* 눈사람 */}
      <Snowman />

      {/* 소원 장식 구슬들 */}
      {ornamentPositions.map((pos, index) => {
        const wishData = wishes[index]
        return (
          <InteractiveOrnament
            key={`ornament-${index}`}
            position={pos}
            wish={wishData?.wish}
            onClick={() => onOrnamentClick(wishData || null, pos)}
          />
        )
      })}

      {/* 선물 상자들 */}
      <Gifts />

      {/* 크리스마스 카드들 */}
      {cards.map((card, index) => {
        const angle = (index / Math.max(cards.length, 1)) * Math.PI * 2
        const radius = 2.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const colors = ['#ffe4e1', '#fff0f5', '#f0f8ff', '#fffacd', '#f5f5dc']

        return (
          <WishCard
            key={card.id}
            position={[x, 0.5 + index * 0.3, z]}
            wish={card.wish}
            author={card.author}
            color={colors[index % colors.length]}
            onClick={() => onCardClick(card)}
          />
        )
      })}

      {/* 눈 내리는 효과 */}
      <Snowfall count={300} />

      {/* 바닥 (눈 덮인 땅) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#f0f8ff"
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* 바닥 추가 디테일 (눈 언덕) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -1.99, 2]} receiveShadow>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -1.99, -1]} receiveShadow>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* 마우스로 화면 회전 가능 */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
