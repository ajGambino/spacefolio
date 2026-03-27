import { Text, useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Preload all planet models
useGLTF.preload('/models/earth.glb');
useGLTF.preload('/models/iss.glb');
useGLTF.preload('/models/venus.glb');
useGLTF.preload('/models/mercury.glb');
useGLTF.preload('/models/mars.glb');
useGLTF.preload('/models/jupiter.glb');
useGLTF.preload('/models/saturn.glb');
useGLTF.preload('/models/uranus.glb');
useGLTF.preload('/models/neptune.glb');
useGLTF.preload('/models/pluto.glb');
useGLTF.preload('/models/black_hole.glb');

const sections = [
	{
		position: [-5, -5, 0],
		title: 'Home',
		color: '#c9ada7',
		model: 'earth.glb',
		scale: 2,
	},
	{
		position: [50, 18, -55],
		title: 'Credits',
		color: '#c9ada7',
		model: 'iss.glb',
		scale: 0.02,
	},
	{
		position: [-55, 14, -45],
		title: 'About',
		color: '#c9ada7',
		model: 'iss.glb',
		scale: 0.02,
	},
	{
		position: [12, 7, -25],
		title: 'Projects',
		color: '#c9ada7',
		model: 'iss.glb',
		scale: 0.02,
	},
	{
		position: [-15, 8, -45],
		title: 'Contact',
		color: '#c9ada7',
		model: 'iss.glb',
		scale: 0.02,
	},
	{
		position: [-80, 5, 30],
		title: 'Venus',
		color: '#c9ada7',
		model: 'venus.glb',
		scale: 2,
	},
	{
		position: [90, 45, -90],
		title: 'Mercury',
		color: '#c9ada7',
		model: 'mercury.glb',
		scale: 0.022,
	},
	{
		position: [-20, 35, -110],
		title: 'Mars',
		color: '#c9ada7',
		model: 'mars.glb',
		scale: 0.025,
	},
	{
		position: [-100, 40, -85],
		title: 'Jupiter',
		color: '#c9ada7',
		model: 'jupiter.glb',
		scale: 0.04,
	},
	{
		position: [100, 15, -25],
		title: 'Saturn',
		color: '#c9ada7',
		model: 'saturn.glb',
		scale: 0.035,
	},
	{
		position: [20, 40, -120],
		title: 'Uranus',
		color: '#c9ada7',
		model: 'uranus.glb',
		scale: 0.003,
	},
	{
		position: [150, 30, -70],
		title: 'Neptune',
		color: '#c9ada7',
		model: 'neptune.glb',
		scale: 0.03,
	},
	{
		position: [-90, 10, -100],
		title: 'Pluto',
		color: '#c9ada7',
		model: 'pluto.glb',
		scale: 0.018,
	},
	{
		position: [-150, 140, -300],
		title: 'Black Hole',
		color: '#c9ada7',
		model: 'black_hole.glb',
		scale: 0.03,
	},
];

function SectionMarker({
	position,
	title,
	color,
	index,
	onClick,
	isActive,
	modelPath,
	modelScale,
}) {
	const markerRef = useRef();
	const textRef = useRef();
	const [hovered, setHovered] = useState(false);
	const isInitialized = useRef(false);
	const hoverTimeoutRef = useRef(null);

	// Load planet model - useGLTF must be called unconditionally
	const { scene: planetModel } = useGLTF(`/models/${modelPath}`);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	useFrame((state, delta) => {
		// Initialize scale on first frame
		if (!isInitialized.current) {
			if (markerRef.current) {
				markerRef.current.scale.set(1.0, 1.0, 1.0);
			}
			if (textRef.current) {
				textRef.current.scale.set(1.0, 1.0, 1.0);
			}
			isInitialized.current = true;
		}

		// Smooth scale transition
		const targetScale = hovered ? 1.15 : 1.0;

		if (markerRef.current) {
			// Gentle rotation
			markerRef.current.rotation.y += 0.005;
			markerRef.current.position.y =
				position[1] + Math.sin(state.clock.elapsedTime + index) * 0.5;

			// Smooth scale interpolation with clamping
			const currentScale = markerRef.current.scale.x;
			const newScale = THREE.MathUtils.lerp(
				currentScale,
				targetScale,
				Math.min(delta * 10, 0.5),
			);
			markerRef.current.scale.set(newScale, newScale, newScale);
		}

		// Make text face camera
		if (textRef.current) {
			textRef.current.lookAt(state.camera.position);

			// Smooth font size transition on the text mesh itself with clamping
			const targetFontSize = hovered ? 1.15 : 1.0;
			const currentFontSize = textRef.current.scale.x;
			const newFontScale = THREE.MathUtils.lerp(
				currentFontSize,
				targetFontSize,
				Math.min(delta * 10, 0.5),
			);
			textRef.current.scale.set(newFontScale, newFontScale, newFontScale);
		}
	});

	const emissiveIntensity = isActive ? 1.5 : hovered ? 1.0 : 0.5;

	return (
		<group
			position={position}
			ref={markerRef}
			onClick={(e) => {
				e.stopPropagation();
				onClick(index);
			}}
			onPointerOver={(e) => {
				e.stopPropagation();
				// Clear any pending timeout
				if (hoverTimeoutRef.current) {
					clearTimeout(hoverTimeoutRef.current);
					hoverTimeoutRef.current = null;
				}
				// Only update if not already hovered (avoid redundant state updates)
				if (!hovered) {
					setHovered(true);
					document.body.style.cursor = 'pointer';
				}
			}}
			onPointerOut={(e) => {
				e.stopPropagation();
				// Clear any existing timeout
				if (hoverTimeoutRef.current) {
					clearTimeout(hoverTimeoutRef.current);
				}
				// Delay the hover state change to prevent flickering from nested meshes
				hoverTimeoutRef.current = setTimeout(() => {
					setHovered(false);
					document.body.style.cursor = 'default';
					hoverTimeoutRef.current = null;
				}, 50);
			}}
		>
			{/* Planet Model or Fallback */}
			{planetModel ? (
				<group scale={modelScale}>
					<primitive object={planetModel.clone()} />
				</group>
			) : (
				<>
					{/* Outer ring */}
					<mesh rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[2, 0.1, 16, 32]} />
						<meshStandardMaterial
							color={color}
							emissive={color}
							emissiveIntensity={emissiveIntensity}
						/>
					</mesh>

					{/* Inner platform */}
					<mesh rotation={[Math.PI / 2, 0, 0]}>
						<circleGeometry args={[1.5, 32]} />
						<meshStandardMaterial
							color={color}
							transparent
							opacity={hovered ? 0.5 : 0.3}
							emissive={color}
							emissiveIntensity={emissiveIntensity * 0.5}
						/>
					</mesh>

					{/* Vertical pillars */}
					{[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
						<mesh
							key={i}
							position={[Math.cos(angle) * 2, 1, Math.sin(angle) * 2]}
						>
							<cylinderGeometry args={[0.05, 0.05, 2, 8]} />
							<meshStandardMaterial
								color={color}
								emissive={color}
								emissiveIntensity={emissiveIntensity * 0.5}
							/>
						</mesh>
					))}

					{/* Floating orb */}
					<mesh position={[0, 2.5, 0]}>
						<sphereGeometry args={[0.3, 32, 32]} />
						<meshStandardMaterial
							color={color}
							emissive={color}
							emissiveIntensity={emissiveIntensity * 2}
							toneMapped={false}
						/>
					</mesh>
				</>
			)}

			{/* Section title */}
			<Text
				ref={textRef}
				position={[0, 3.5, 0]}
				fontSize={1.0}
				color='white'
				anchorX='center'
				anchorY='middle'
				outlineWidth={0.05}
				outlineColor='#000000'
			>
				{title}
			</Text>

			{/* Point light for glow effect */}
			<pointLight
				position={[0, 2.5, 0]}
				intensity={hovered ? 3 : 2}
				distance={10}
				color={color}
			/>
		</group>
	);
}

function SectionMarkersClickable({ onSectionClick, arrivedSection }) {
	return (
		<>
			{sections.map((section, index) => (
				<SectionMarker
					key={index}
					position={section.position}
					title={section.title}
					color={section.color}
					index={index}
					onClick={onSectionClick}
					isActive={arrivedSection === index}
					modelPath={section.model}
					modelScale={section.scale}
				/>
			))}
		</>
	);
}

export default SectionMarkersClickable;
