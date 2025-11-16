import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Snowman() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // 살짝 흔들리는 애니메이션
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[-3, -1.7, -1]}>
      {/* 아래 몸통 (큰 눈덩이) */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* 중간 몸통 */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* 머리 */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* 눈 2개 */}
      <mesh position={[-0.08, 0.65, 0.17]} castShadow>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 0.65, 0.17]} castShadow>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 당근 코 */}
      <mesh position={[0, 0.6, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.03, 0.15, 16]} />
        <meshStandardMaterial color="#ff6347" />
      </mesh>

      {/* 미소 (석탄) */}
      {[-0.06, -0.03, 0, 0.03, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 0.52, 0.18]} castShadow>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}

      {/* 모자 (실린더) */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.15, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 목도리 */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <torusGeometry args={[0.22, 0.04, 16, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      {/* 단추 (석탄) */}
      {[0.15, 0, -0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0.28]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}

      {/* 팔 (나뭇가지) */}
      <group position={[-0.3, 0.2, 0]} rotation={[0, 0, -0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[0, 0, -0.5]} castShadow>
          <cylinderGeometry args={[0.01, 0.008, 0.1, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>

      <group position={[0.3, 0.2, 0]} rotation={[0, 0, 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.01, 0.008, 0.1, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    </group>
  )
}
