import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Snowfall({ count = 200 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 10 - 5
      const y = Math.random() * 10
      const z = Math.random() * 10 - 5
      const scale = Math.random() * 0.05 + 0.02
      const speed = Math.random() * 0.01 + 0.005
      temp.push({ x, y, z, scale, speed })
    }
    return temp
  }, [count])

  useFrame((state, delta) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        // 눈송이 떨어지는 효과
        particle.y -= particle.speed

        // 좌우로 흔들리는 효과
        particle.x += Math.sin(state.clock.elapsedTime + i) * 0.001

        // 화면 아래로 떨어지면 위로 리셋
        if (particle.y < -2) {
          particle.y = 10
          particle.x = Math.random() * 10 - 5
          particle.z = Math.random() * 10 - 5
        }

        const matrix = new THREE.Matrix4()
        matrix.setPosition(particle.x, particle.y, particle.z)
        matrix.scale(new THREE.Vector3(particle.scale, particle.scale, particle.scale))
        meshRef.current!.setMatrixAt(i, matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="white" transparent opacity={0.8} />
    </instancedMesh>
  )
}
