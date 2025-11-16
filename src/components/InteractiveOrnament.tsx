import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveOrnamentProps {
  position: [number, number, number]
  wish?: string
  onClick?: () => void
}

export function InteractiveOrnament({ position, wish, onClick }: InteractiveOrnamentProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02

      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }

      if (clicked) {
        meshRef.current.rotation.y += 0.1
      }
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setClicked(!clicked)
    onClick?.()
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        castShadow
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={wish ? '#ffd700' : '#cccccc'}
          metalness={0.9}
          roughness={0.1}
          emissive={wish ? '#ffd700' : '#666666'}
          emissiveIntensity={hovered ? 0.8 : 0.3}
        />
      </mesh>

      {wish && (
        <Text
          position={[0, 0.25, 0]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          ✨
        </Text>
      )}

      {hovered && wish && (
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.08}
          color="#000000"
          maxWidth={1}
          textAlign="center"
          anchorX="center"
          anchorY="top"
          outlineWidth={0.008}
          outlineColor="#ffffff"
        >
          {wish.length > 20 ? wish.substring(0, 20) + '...' : wish}
        </Text>
      )}
    </group>
  )
}
