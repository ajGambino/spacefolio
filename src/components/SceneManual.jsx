import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function SceneManual({ shipRef }) {
  const { camera } = useThree()

  useFrame((_state, delta) => {
    if (!shipRef?.current) return

    // Camera follows behind the ship
    const shipPosition = shipRef.current.position
    const shipRotation = shipRef.current.rotation

    // Calculate camera offset behind the ship
    const offset = new THREE.Vector3(0, 3, 8)
    offset.applyEuler(shipRotation)

    const targetCameraPosition = new THREE.Vector3()
    targetCameraPosition.addVectors(shipPosition, offset)

    // Smooth camera follow
    camera.position.lerp(targetCameraPosition, delta * 5)

    // Look at the ship with slight forward bias
    const lookAtTarget = shipPosition.clone()
    const forward = new THREE.Vector3(0, 0, -3)
    forward.applyEuler(shipRotation)
    lookAtTarget.add(forward)

    camera.lookAt(lookAtTarget)
  })

  return (
    <>
      {/* Ambient particles/asteroids */}
      {Array.from({ length: 100 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 200
        const y = (Math.random() - 0.5) * 200
        const z = (Math.random() - 0.5) * 200
        const size = Math.random() * 0.5 + 0.1

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial color="#444466" roughness={0.8} />
          </mesh>
        )
      })}

      {/* Grid floor for reference */}
      <gridHelper args={[200, 100, '#222244', '#111122']} position={[0, -10, 0]} />
    </>
  )
}

export default SceneManual
