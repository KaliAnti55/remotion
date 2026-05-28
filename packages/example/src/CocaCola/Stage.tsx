import React from 'react';
import {Environment, ContactShadows} from '@react-three/drei';

export const Stage: React.FC<{
	readonly children: React.ReactNode;
	readonly lightIntensity: number;
}> = ({children, lightIntensity}) => {
	return (
		<>
			<Environment preset="studio" />
			<ambientLight intensity={0.2 * lightIntensity} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				intensity={lightIntensity * 2}
				castShadow
			/>
			<pointLight position={[-10, -10, -10]} intensity={lightIntensity} color="#ff0000" />

			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
				<planeGeometry args={[100, 100]} />
				<meshPhysicalMaterial
					color="#050505"
					roughness={0.1}
					metalness={0.8}
				/>
			</mesh>

			<ContactShadows
				opacity={0.4}
				scale={10}
				blur={2}
				far={10}
				resolution={256}
				color="#000000"
			/>

			{children}
		</>
	);
};
