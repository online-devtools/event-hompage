import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ChristmasTree() {
  const treeRef = useRef<THREE.Group>(null)
  const ornamentsRef = useRef<THREE.Group>(null)

  // 크리스마스 트리 회전 애니메이션
  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (ornamentsRef.current) {
      ornamentsRef.current.children.forEach((ornament, i) => {
        ornament.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001
      })
    }
  })

  // 장식 구슬들 생성
  const ornaments = useMemo(() => {
    const positions: [number, number, number][] = []
    const colors = ['#ff0000', '#ffd700', '#0000ff', '#ffffff', '#ff69b4']

    // 트리 레이어별로 장식 배치
    for (let layer = 0; layer < 5; layer++) {
      const radius = 0.5 - layer * 0.08
      const numOrnaments = 6 - layer
      const height = layer * 0.4 - 1

      for (let i = 0; i < numOrnaments; i++) {
        const angle = (i / numOrnaments) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        positions.push([x, height, z])
      }
    }

    return positions.map((pos, i) => ({
      position: pos,
      color: colors[i % colors.length]
    }))
  }, [])

  return (
    <group ref={treeRef}>
      {/* 트리 본체 - 원뿔 3개 레이어 */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#0d5c0d" />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[0.8, 1.6, 8]} />
        <meshStandardMaterial color="#0f6b0f" />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial color="#118a11" />
      </mesh>

      {/* 나무 줄기 */}
      <mesh position={[0, -1.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* 꼭대기 별 */}
      <mesh position={[0, 1.8, 0]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>

      {/* 장식 구슬들 */}
      <group ref={ornamentsRef}>
        {ornaments.map((ornament, i) => (
          <mesh key={i} position={ornament.position} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={ornament.color}
              metalness={0.8}
              roughness={0.2}
              emissive={ornament.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* 반짝이는 조명들 */}
      {ornaments.slice(0, 10).map((ornament, i) => (
        <pointLight
          key={i}
          position={ornament.position}
          color={ornament.color}
          intensity={0.5}
          distance={1}
        />
      ))}
    </group>
  )
}
