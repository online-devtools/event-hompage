import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface WishCardProps {
  position: [number, number, number]
  wish: string
  author: string
  color?: string
  onClick?: () => void
}

export function WishCard({ position, wish, author, color = '#ffe4e1', onClick }: WishCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const [hover, setHover] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05
      groupRef.current.rotation.y += 0.002
    }
    if (cardRef.current && hover) {
      cardRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
    } else if (cardRef.current) {
      cardRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={cardRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = 'auto'
        }}
        castShadow
      >
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.3} />
      </mesh>

      {/* 텍스트 - 앞면 */}
      <Text
        position={[0, 0.15, 0.03]}
        fontSize={0.08}
        color="#000000"
        maxWidth={0.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor="#ffffff"
      >
        {wish.length > 30 ? wish.substring(0, 30) + '...' : wish}
      </Text>

      <Text
        position={[0, -0.15, 0.03]}
        fontSize={0.06}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.002}
        outlineColor="#ffffff"
      >
        - {author}
      </Text>

      {/* 리본 장식 */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.1, 0.05, 0.06]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
    </group>
  )
}
