import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ChristmasHouse() {
  return (
    <group position={[3, -2, -2]}>
      {/* 집 본체 */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.8, 1]} />
        <meshStandardMaterial
          color="#8B4513"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* 지붕 */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.9, 0.6, 4]} />
        <meshStandardMaterial
          color="#DC143C"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* 눈 덮인 지붕 */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <coneGeometry args={[0.92, 0.15, 4]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* 문 */}
      <mesh position={[0, 0.2, 0.51]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.02]} />
        <meshStandardMaterial
          color="#654321"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* 문 손잡이 */}
      <mesh position={[0.1, 0.2, 0.53]} castShadow>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 창문 2개 */}
      <mesh position={[-0.35, 0.4, 0.51]} castShadow>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <meshStandardMaterial
          color="#87CEEB"
          metalness={0.8}
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.35, 0.4, 0.51]} castShadow>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <meshStandardMaterial
          color="#87CEEB"
          metalness={0.8}
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 창문 빛 */}
      <pointLight position={[-0.35, 0.4, 0.6]} color="#FFD700" intensity={1} distance={1.5} />
      <pointLight position={[0.35, 0.4, 0.6]} color="#FFD700" intensity={1} distance={1.5} />

      {/* 굴뚝 */}
      <mesh position={[0.4, 1.3, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial
          color="#8B0000"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* 굴뚝 위 눈 */}
      <mesh position={[0.4, 1.58, -0.2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* 연기 파티클 */}
      <Smoke />

      {/* 집 주변 장식 - 작은 울타리 */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((x, i) => (
        <group key={i} position={[x, -0.2, 0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.05, 0.3, 0.05]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Smoke() {
  const smokeParticles = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (smokeParticles.current) {
      smokeParticles.current.children.forEach((particle, i) => {
        // 연기가 위로 올라가며 퍼짐
        particle.position.y += 0.01
        particle.position.x += Math.sin(state.clock.elapsedTime + i) * 0.002
        particle.position.z += Math.cos(state.clock.elapsedTime + i) * 0.002

        // 투명도 감소
        const material = (particle as THREE.Mesh).material as THREE.MeshStandardMaterial
        material.opacity -= 0.001

        // 크기 증가
        particle.scale.x += 0.002
        particle.scale.y += 0.002
        particle.scale.z += 0.002

        // 리셋 - 굴뚝 위치로 정확히 리셋
        if (material.opacity <= 0 || particle.position.y > 2.5) {
          particle.position.set(0.4, 1.65, -0.2)
          particle.scale.set(1, 1, 1)
          material.opacity = 0.6
        }
      })
    }
  })

  return (
    <group ref={smokeParticles}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[0.4, 1.65 + i * 0.1, -0.2]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#CCCCCC"
            transparent
            opacity={0.6}
            metalness={0}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  )
}
