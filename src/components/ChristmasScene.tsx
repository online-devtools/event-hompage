import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { ChristmasTree } from './ChristmasTree'
import { Snowfall } from './Snowfall'
import { Gifts } from './Gifts'

export function ChristmasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      shadows
      style={{ background: 'linear-gradient(to bottom, #000033 0%, #000066 100%)' }}
    >
      {/* 조명 */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />

      {/* 별이 빛나는 배경 */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* 크리스마스 트리 */}
      <ChristmasTree />

      {/* 선물 상자들 */}
      <Gifts />

      {/* 눈 내리는 효과 */}
      <Snowfall count={300} />

      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.8} />
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
