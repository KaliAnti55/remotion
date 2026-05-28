import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Bottle} from './Bottle';
import {Bubbles} from './Bubbles';
import {Ice} from './Ice';
import {Stage} from './Stage';
import {Text} from '@react-three/drei';

export const CocaColaCommercial: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height, fps, durationInFrames} = useVideoConfig();

	// Scene 1: Emergence (0-3s)
	const emergenceProgress = spring({
		frame,
		fps,
		config: {damping: 200},
	});

	// Camera animation
	const cameraY = interpolate(frame, [0, durationInFrames], [2, 6]);
	const cameraRotation = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2]);
	const cameraDistance = interpolate(frame, [0, 180, 450, 900], [15, 10, 8, 12]);

	// Scene transitions
	const scene2Opacity = interpolate(frame, [180, 210, 420, 450], [0, 1, 1, 0]);
	const finalSceneOpacity = interpolate(frame, [780, 810], [0, 1]);

	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<ThreeCanvas width={width} height={height}>
				<Stage lightIntensity={emergenceProgress}>
					{/* Scene 1 & 2 & Final: Bottle focus */}
					<group
						rotation={[0, cameraRotation, 0]}
						position={[0, -2, 0]}
					>
						<Bottle
							opacity={1}
							liquidLevel={1}
						/>
						<Bubbles count={100} speed={0.2} opacity={1} />

						{/* Ice cubes in Scene 2 */}
						{frame > 180 && frame < 450 && (
							<group>
								<Ice
									position={[2, 2, 2]}
									rotation={[frame * 0.01, frame * 0.02, 0]}
									scale={interpolate(frame, [180, 240], [0, 1], {extrapolateLeft: 'clamp'})}
									opacity={scene2Opacity}
								/>
								<Ice
									position={[-2, 4, -1]}
									rotation={[0, frame * 0.01, frame * 0.03]}
									scale={interpolate(frame, [200, 260], [0, 0.8], {extrapolateLeft: 'clamp'})}
									opacity={scene2Opacity}
								/>
							</group>
						)}
					</group>

					{/* Final Scene Text */}
					{frame > 780 && (
						<group position={[0, 4, -2]}>
							<Text
								color="white"
								fontSize={1}
								anchorX="center"
								anchorY="middle"
								fillOpacity={finalSceneOpacity}
							>
								OPEN HAPPINESS
							</Text>
							<Text
								position={[0, -1.2, 0]}
								color="#e41e2b"
								fontSize={0.8}
								anchorX="center"
								anchorY="middle"
								fillOpacity={finalSceneOpacity}
							>
								COCA-COLA
							</Text>
						</group>
					)}

					{/* Camera setup */}
					<perspectiveCamera
						makeDefault
						position={[
							Math.sin(cameraRotation * 0.2) * cameraDistance,
							cameraY,
							Math.cos(cameraRotation * 0.2) * cameraDistance,
						]}
						fov={35}
					/>
				</Stage>
			</ThreeCanvas>
		</AbsoluteFill>
	);
};
