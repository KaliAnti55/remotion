import React, {useMemo, useRef} from 'react';
import * as THREE from 'three';
import {useCurrentFrame, random} from 'remotion';
import {useFrame} from '@react-three/fiber';

export const Bubbles: React.FC<{
	readonly count: number;
	readonly speed: number;
	readonly opacity: number;
}> = ({count, speed, opacity}) => {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const frame = useCurrentFrame();

	const particles = useMemo(() => {
		const temp = [];
		for (let i = 0; i < count; i++) {
			const x = (random(`x-${i}`) - 0.5) * 1;
			const y = random(`y-${i}`) * 5;
			const z = (random(`z-${i}`) - 0.5) * 1;
			const s = random(`s-${i}`) * 0.03 + 0.01;
			temp.push({x, y, z, s, offset: random(`offset-${i}`) * 100});
		}
		return temp;
	}, [count]);

	useFrame(() => {
		if (!meshRef.current) return;

		const dummy = new THREE.Object3D();
		particles.forEach((p, i) => {
			const newY = ((p.y + (frame + p.offset) * speed * 0.1) % 5);
			dummy.position.set(p.x, newY, p.z);
			dummy.scale.set(p.s, p.s, p.s);
			dummy.updateMatrix();
			meshRef.current!.setMatrixAt(i, dummy.matrix);
		});
		meshRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<sphereGeometry args={[1, 8, 8]} />
			<meshPhysicalMaterial
				color="#ffffff"
				transmission={0.9}
				thickness={0.1}
				roughness={0}
				transparent
				opacity={opacity}
			/>
		</instancedMesh>
	);
};
