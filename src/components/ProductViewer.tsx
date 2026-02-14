import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function ProductMesh({ color = '#6366f1', shape = 'box' }: { color?: string; shape?: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    const getGeometry = () => {
        switch (shape) {
            case 'sphere':
                return <sphereGeometry args={[1, 64, 64]} />
            case 'torus':
                return <torusGeometry args={[1, 0.4, 32, 64]} />
            case 'cylinder':
                return <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />
            case 'dodecahedron':
                return <dodecahedronGeometry args={[1, 0]} />
            default:
                return <boxGeometry args={[1.4, 1.4, 1.4]} />
        }
    }

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.5} castShadow>
                {getGeometry()}
                <MeshDistortMaterial
                    color={color}
                    distort={0.15}
                    speed={2}
                    roughness={0.1}
                    metalness={0.9}
                    envMapIntensity={1}
                />
            </mesh>
        </Float>
    )
}

interface ProductViewerProps {
    color?: string
    shape?: string
    className?: string
}

export default function ProductViewer({ color = '#6366f1', shape = 'box', className = '' }: ProductViewerProps) {
    return (
        <div className={`w-full h-full min-h-[300px] ${className}`}>
            <Canvas
                camera={{ position: [3, 2, 5], fov: 45 }}
                dpr={[1, 2]}
                shadows
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#ffffff"
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-3, 3, -3]} intensity={0.5} color="#d946ef" />
                <pointLight position={[3, -3, 3]} intensity={0.3} color="#818cf8" />

                <ProductMesh color={color} shape={shape} />

                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={4}
                />

                <Environment preset="city" />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    )
}
