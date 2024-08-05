import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { useRef } from 'react';

const Planet = ({ position, size, color, name, distance, orbitalPeriod }) => {
  const planetRef = useRef();

  return (
    <group>
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], position[1] + size + 0.5, position[2]]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      <Text
        position={[position[0], position[1] - size - 0.5, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {`Distance: ${distance} AU`}
        {`\nOrbital Period: ${orbitalPeriod} years`}
      </Text>
    </group>
  );
};

const SolarSystem = () => {
  const planets = [
    { name: 'Mercury', distance: 0.39, size: 0.383, color: '#8C7853', orbitalPeriod: 0.24 },
    { name: 'Venus', distance: 0.72, size: 0.949, color: '#FFA500', orbitalPeriod: 0.62 },
    { name: 'Earth', distance: 1, size: 1, color: '#4169E1', orbitalPeriod: 1 },
    { name: 'Mars', distance: 1.52, size: 0.532, color: '#FF4500', orbitalPeriod: 1.88 },
    { name: 'Jupiter', distance: 5.2, size: 11.21, color: '#FFA07A', orbitalPeriod: 11.86 },
    { name: 'Saturn', distance: 9.54, size: 9.45, color: '#F4D03F', orbitalPeriod: 29.46 },
    { name: 'Uranus', distance: 19.19, size: 4.01, color: '#5DADE2', orbitalPeriod: 84.01 },
    { name: 'Neptune', distance: 30.07, size: 3.88, color: '#4B0082', orbitalPeriod: 164.79 },
  ];

  return (
    <Canvas camera={{ position: [0, 20, 25], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.5} />
      </mesh>
      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          position={[planet.distance * 3, 0, 0]}
          size={planet.size * 0.3}
          color={planet.color}
          name={planet.name}
          distance={planet.distance}
          orbitalPeriod={planet.orbitalPeriod}
        />
      ))}
    </Canvas>
  );
};

const Index = () => {
  return (
    <div className="w-full h-screen bg-black">
      <SolarSystem />
    </div>
  );
};

export default Index;
