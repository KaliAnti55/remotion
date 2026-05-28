import React from 'react';
import {RoundedBox} from '@react-three/drei';

export const Ice: React.FC<{
	readonly position: [number, number, number];
	readonly rotation: [number, number, number];
	readonly scale: number;
	readonly opacity: number;
}> = ({position, rotation, scale, opacity}) => {
	return (
		<RoundedBox
			args={[1, 1, 1]}
			radius={0.1}
			smoothness={4}
			position={position}
			rotation={rotation}
			scale={scale}
		>
			<meshPhysicalMaterial
				color="#ffffff"
				transmission={0.9}
				thickness={0.5}
				roughness={0.1}
				transparent
				opacity={opacity}
			/>
		</RoundedBox>
	);
};
