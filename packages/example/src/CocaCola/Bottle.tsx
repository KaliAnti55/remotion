import React, {useMemo} from 'react';
import * as THREE from 'three';

export const Bottle: React.FC<{
	readonly opacity: number;
	readonly liquidLevel: number;
}> = ({opacity, liquidLevel}) => {
	const bottleProfile = useMemo(() => {
		const points = [];
		// Bottle profile points (x, y)
		points.push(new THREE.Vector2(0, 0)); // Bottom center
		points.push(new THREE.Vector2(0.8, 0)); // Bottom edge
		points.push(new THREE.Vector2(1, 0.2));
		points.push(new THREE.Vector2(1.1, 1));
		points.push(new THREE.Vector2(1.2, 2.5));
		points.push(new THREE.Vector2(0.9, 4));
		points.push(new THREE.Vector2(0.7, 5));
		points.push(new THREE.Vector2(0.8, 6.5));
		points.push(new THREE.Vector2(1.1, 7.5));
		points.push(new THREE.Vector2(1.1, 8.5));
		points.push(new THREE.Vector2(0.5, 10)); // Neck
		points.push(new THREE.Vector2(0.4, 11)); // Top neck
		points.push(new THREE.Vector2(0.5, 11.2)); // Cap edge
		points.push(new THREE.Vector2(0.5, 11.5)); // Top cap
		points.push(new THREE.Vector2(0, 11.5)); // Top center
		return points;
	}, []);

	const liquidProfile = useMemo(() => {
		const points = [];
		const maxLevel = 10;
		const currentMax = maxLevel * liquidLevel;

		points.push(new THREE.Vector2(0, 0.1));
		points.push(new THREE.Vector2(0.75, 0.1));
		points.push(new THREE.Vector2(0.95, 0.25));
		points.push(new THREE.Vector2(1.05, 1));
		points.push(new THREE.Vector2(1.15, 2.5));
		points.push(new THREE.Vector2(0.85, 4));
		points.push(new THREE.Vector2(0.65, 5));
		points.push(new THREE.Vector2(0.75, 6.5));
		points.push(new THREE.Vector2(1.05, 7.5));
		points.push(new THREE.Vector2(1.05, 8.5));
		points.push(new THREE.Vector2(0.45, currentMax));
		points.push(new THREE.Vector2(0, currentMax));

		return points;
	}, [liquidLevel]);

	return (
		<group scale={0.5}>
			{/* Glass Bottle */}
			<mesh castShadow receiveShadow>
				<latheGeometry args={[bottleProfile, 64]} />
				<meshPhysicalMaterial
					color="#ffffff"
					metalness={0}
					roughness={0.05}
					transmission={0.95}
					thickness={0.2}
					envMapIntensity={1}
					transparent
					opacity={opacity}
				/>
			</mesh>

			{/* Cola Liquid */}
			<mesh position={[0, 0, 0]}>
				<latheGeometry args={[liquidProfile, 64]} />
				<meshPhysicalMaterial
					color="#1a0404"
					metalness={0.1}
					roughness={0.1}
					transmission={0}
					opacity={opacity}
					transparent
				/>
			</mesh>

			{/* Label (Rough approximation) */}
			<group position={[0, 4.5, 0]}>
				<mesh>
					<cylinderGeometry args={[0.91, 0.91, 2, 64]} />
					<meshStandardMaterial color="#e41e2b" />
				</mesh>
			</group>
		</group>
	);
};
