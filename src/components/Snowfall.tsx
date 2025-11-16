import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 육각형 눈송이 모양 생성
function createSnowflakeShape() {
  const shape = new THREE.Shape()

  // 중심 육각형
  const radius = 0.5
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (i === 0) {
      shape.moveTo(x, y)
    } else {
      shape.lineTo(x, y)
    }
  }
  shape.closePath()

  return shape
}

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
      const rotation = Math.random() * Math.PI * 2
      const rotationSpeed = (Math.random() - 0.5) * 0.02
      temp.push({ x, y, z, scale, speed, rotation, rotationSpeed })
    }
    return temp
  }, [count])

  const snowflakeGeometry = useMemo(() => {
    const shape = createSnowflakeShape()
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    })
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        // 눈송이 떨어지는 효과
        particle.y -= particle.speed

        // 좌우로 흔들리는 효과
        particle.x += Math.sin(state.clock.elapsedTime + i) * 0.001

        // 회전 효과
        particle.rotation += particle.rotationSpeed

        // 화면 아래로 떨어지면 위로 리셋
        if (particle.y < -2) {
          particle.y = 10
          particle.x = Math.random() * 10 - 5
          particle.z = Math.random() * 10 - 5
        }

        const matrix = new THREE.Matrix4()
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(new THREE.Euler(0, 0, particle.rotation))

        matrix.compose(
          new THREE.Vector3(particle.x, particle.y, particle.z),
          quaternion,
          new THREE.Vector3(particle.scale, particle.scale, particle.scale)
        )

        meshRef.current!.setMatrixAt(i, matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[snowflakeGeometry, undefined, count]}>
      <meshStandardMaterial
        color="white"
        transparent
        opacity={0.9}
        metalness={0.3}
        roughness={0.2}
      />
    </instancedMesh>
  )
}
