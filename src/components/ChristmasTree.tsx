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

  // 장식 구슬들 생성 (더 많고 랜덤하게)
  const ornaments = useMemo(() => {
    const positions: [number, number, number][] = []
    const colors = ['#ff0000', '#ffd700', '#0000ff', '#ffffff', '#ff69b4', '#00ff00', '#ff8c00']

    // 트리 레이어별로 장식 배치 (더 자연스럽게)
    for (let layer = 0; layer < 8; layer++) {
      const radius = 0.9 - layer * 0.1
      const numOrnaments = 8 - Math.floor(layer / 2)
      const height = layer * 0.35 - 1.2

      for (let i = 0; i < numOrnaments; i++) {
        const angle = (i / numOrnaments) * Math.PI * 2 + (layer * 0.3)
        const randomOffset = (Math.random() - 0.5) * 0.1
        const x = Math.cos(angle) * (radius + randomOffset)
        const z = Math.sin(angle) * (radius + randomOffset)
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
      {/* 트리 본체 - 더 현실적인 5개 레이어 */}
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.1, 1.8, 64]} />
        <meshStandardMaterial
          color="#0d4d0d"
          metalness={0.1}
          roughness={0.8}
          flatShading={false}
        />
      </mesh>
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.95, 1.5, 64]} />
        <meshStandardMaterial
          color="#0f5c0f"
          metalness={0.1}
          roughness={0.8}
          flatShading={false}
        />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.8, 1.3, 64]} />
        <meshStandardMaterial
          color="#116b11"
          metalness={0.1}
          roughness={0.8}
          flatShading={false}
        />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.65, 1.1, 64]} />
        <meshStandardMaterial
          color="#147a14"
          metalness={0.1}
          roughness={0.8}
          flatShading={false}
        />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 0.9, 64]} />
        <meshStandardMaterial
          color="#178917"
          metalness={0.1}
          roughness={0.8}
          flatShading={false}
        />
      </mesh>

      {/* 나무 줄기 (더 현실적) */}
      <mesh position={[0, -1.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.8, 32]} />
        <meshStandardMaterial
          color="#4a2f1a"
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>

      {/* 나무 뿌리 */}
      <mesh position={[0, -2.25, 0]} receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 32]} />
        <meshStandardMaterial
          color="#3d2614"
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>

      {/* 꼭대기 별 (더 크고 화려하게) */}
      <group position={[0, 1.8, 0]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#ffd700" intensity={3} distance={4} />
      </group>

      {/* 장식 구슬들 (고품질) */}
      <group ref={ornamentsRef}>
        {ornaments.map((ornament, i) => (
          <mesh key={i} position={ornament.position} castShadow>
            <sphereGeometry args={[0.08, 32, 32]} />
            <meshStandardMaterial
              color={ornament.color}
              metalness={0.9}
              roughness={0.1}
              emissive={ornament.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* 반짝이는 조명들 (더 많고 밝게) */}
      {ornaments.map((ornament, i) => (
        <pointLight
          key={i}
          position={ornament.position}
          color={ornament.color}
          intensity={1.2}
          distance={1.5}
        />
      ))}

      {/* 트리 주변 환경광 */}
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={0.5} distance={3} />
    </group>
  )
}
