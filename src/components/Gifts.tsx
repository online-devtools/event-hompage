import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Gifts() {
  const giftsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (giftsRef.current) {
      giftsRef.current.children.forEach((gift, i) => {
        gift.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002
        gift.rotation.y += 0.005
      })
    }
  })

  const giftConfigs = [
    { position: [-1, -1.5, 0.5], color: '#ff0000', ribbonColor: '#ffd700', size: 0.3 },
    { position: [1, -1.5, 0.3], color: '#0000ff', ribbonColor: '#ffffff', size: 0.25 },
    { position: [0.3, -1.5, 1], color: '#00ff00', ribbonColor: '#ff0000', size: 0.28 },
    { position: [-0.8, -1.5, -0.5], color: '#ff69b4', ribbonColor: '#ffd700', size: 0.22 },
  ]

  return (
    <group ref={giftsRef}>
      {giftConfigs.map((config, i) => (
        <group key={i} position={config.position}>
          {/* 선물 상자 (고품질) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[config.size, config.size, config.size]} />
            <meshStandardMaterial
              color={config.color}
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>

          {/* 리본 - 가로 */}
          <mesh position={[0, config.size * 0.51, 0]} castShadow>
            <boxGeometry args={[config.size * 1.1, config.size * 0.1, config.size * 0.15]} />
            <meshStandardMaterial
              color={config.ribbonColor}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* 리본 - 세로 */}
          <mesh position={[0, config.size * 0.51, 0]} castShadow>
            <boxGeometry args={[config.size * 0.15, config.size * 0.1, config.size * 1.1]} />
            <meshStandardMaterial
              color={config.ribbonColor}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* 리본 매듭 */}
          <mesh position={[0, config.size * 0.65, 0]} castShadow>
            <sphereGeometry args={[config.size * 0.15, 16, 16]} />
            <meshStandardMaterial
              color={config.ribbonColor}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* 선물 빛 효과 */}
          <pointLight
            position={[0, config.size * 0.7, 0]}
            color={config.ribbonColor}
            intensity={0.5}
            distance={0.8}
          />
        </group>
      ))}
    </group>
  )
}
