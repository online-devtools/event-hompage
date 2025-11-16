import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SantaSleigh() {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta

    if (groupRef.current) {
      // 원형 경로로 이동
      const radius = 6
      const speed = 0.3
      const x = Math.cos(timeRef.current * speed) * radius
      const z = Math.sin(timeRef.current * speed) * radius
      const y = 2 + Math.sin(timeRef.current * speed * 2) * 0.5

      groupRef.current.position.set(x, y, z)

      // 이동 방향을 바라보도록 회전
      const angle = Math.atan2(
        Math.sin(timeRef.current * speed),
        Math.cos(timeRef.current * speed)
      )
      groupRef.current.rotation.y = angle + Math.PI / 2

      // 위아래로 살짝 흔들림
      groupRef.current.rotation.z = Math.sin(timeRef.current * 2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* 루돌프 (빨간 코) */}
      <group position={[0.8, 0.1, 0]}>
        {/* 몸통 */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.2, 0.35]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* 머리 */}
        <mesh position={[0.15, 0.15, 0]} castShadow>
          <boxGeometry args={[0.2, 0.15, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* 빨간 코 */}
        <mesh position={[0.28, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
        </mesh>
        {/* 뿔 */}
        <mesh position={[0.15, 0.28, -0.08]} castShadow>
          <coneGeometry args={[0.02, 0.15, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.15, 0.28, 0.08]} castShadow>
          <coneGeometry args={[0.02, 0.15, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* 다리 */}
        <mesh position={[0.08, -0.2, 0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.08, -0.2, -0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.08, -0.2, 0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.08, -0.2, -0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>

      {/* 산타 썰매 */}
      <group position={[-0.5, 0, 0]}>
        {/* 썰매 바닥 */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.5]} />
          <meshStandardMaterial color="#8B0000" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* 썰매 앞부분 (곡선) */}
        <mesh position={[0.45, 0, 0]} rotation={[0, 0, -0.5]} castShadow>
          <boxGeometry args={[0.3, 0.08, 0.5]} />
          <meshStandardMaterial color="#8B0000" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* 썰매 날 */}
        <mesh position={[0, -0.2, 0.22]} castShadow>
          <boxGeometry args={[1, 0.05, 0.05]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, -0.22]} castShadow>
          <boxGeometry args={[1, 0.05, 0.05]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* 산타 */}
        <group position={[0, 0.3, 0]}>
          {/* 몸통 */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 0.35, 16]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          {/* 머리 */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          {/* 모자 */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <coneGeometry args={[0.13, 0.2, 16]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <mesh position={[0, 0.52, 0]} castShadow>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* 수염 */}
          <mesh position={[0, 0.25, 0.1]} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* 팔 */}
          <mesh position={[0.18, 0.05, 0]} rotation={[0, 0, 0.5]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.25]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <mesh position={[-0.18, 0.05, 0]} rotation={[0, 0, -0.5]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.25]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          {/* 벨트 */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.21, 0.21, 0.08, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0, 0.16]} castShadow>
            <boxGeometry args={[0.08, 0.08, 0.05]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* 선물 자루 */}
        <mesh position={[-0.2, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* 반짝이는 효과 */}
      <pointLight position={[0, 0.5, 0]} color="#ffd700" intensity={2} distance={3} />
    </group>
  )
}
