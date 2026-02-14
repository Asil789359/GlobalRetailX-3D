import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={2.2} position={[0, 0, 0]}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.35}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    )
}

function FloatingParticles() {
    const count = 200
    const meshRef = useRef<THREE.InstancedMesh>(null)

    const particles = useMemo(() => {
        const temp: { position: THREE.Vector3; speed: number; scale: number }[] = []
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20
                ),
                speed: 0.01 + Math.random() * 0.02,
                scale: 0.02 + Math.random() * 0.04,
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const matrix = new THREE.Matrix4()

        particles.forEach((particle, i) => {
            particle.position.y += Math.sin(state.clock.elapsedTime * particle.speed * 10 + i) * 0.002
            particle.position.x += Math.cos(state.clock.elapsedTime * particle.speed * 5 + i) * 0.001

            matrix.makeScale(particle.scale, particle.scale, particle.scale)
            matrix.setPosition(particle.position)
            meshRef.current!.setMatrixAt(i, matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.6} />
        </instancedMesh>
    )
}

function GlowRing({ color = '#d946ef', radius = 3, speed = 0.5 }: { color?: string; radius?: number; speed?: number }) {
    const ringRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * speed) * 0.3
            ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5
        }
    })

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[radius, 0.015, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
    )
}

function OrbitingSpheres() {
    const groupRef = useRef<THREE.Group>(null)
    const colors = ['#818cf8', '#d946ef', '#f59e0b', '#22c55e', '#06b6d4']

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }
    })

    return (
        <group ref={groupRef}>
            {colors.map((color, i) => {
                const angle = (i / colors.length) * Math.PI * 2
                const radius = 3.5
                return (
                    <Float key={i} speed={2 + i * 0.5} floatIntensity={0.5}>
                        <Sphere
                            args={[0.12, 16, 16]}
                            position={[
                                Math.cos(angle) * radius,
                                Math.sin(angle * 0.5) * 0.5,
                                Math.sin(angle) * radius,
                            ]}
                        >
                            <meshStandardMaterial
                                color={color}
                                emissive={color}
                                emissiveIntensity={2}
                                toneMapped={false}
                            />
                        </Sphere>
                    </Float>
                )
            })}
        </group>
    )
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} color="#818cf8" />
                <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#d946ef" />
                <pointLight position={[0, 0, 3]} intensity={1} color="#6366f1" />

                <AnimatedSphere />
                <OrbitingSpheres />
                <GlowRing color="#6366f1" radius={3.2} speed={0.3} />
                <GlowRing color="#d946ef" radius={4} speed={0.2} />
                <FloatingParticles />

                <Stars
                    radius={50}
                    depth={50}
                    count={2000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />
            </Canvas>
        </div>
    )
}
