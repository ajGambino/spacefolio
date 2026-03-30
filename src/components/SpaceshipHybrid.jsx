import { useRef, useEffect, useState, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const sectionPositions = [
	new THREE.Vector3(-10, -20, -10), // Home
	new THREE.Vector3(50, 18, -55), // Credits
	new THREE.Vector3(-55, 14, -45), // About
	new THREE.Vector3(10, 5, -25), // Projects
	new THREE.Vector3(-15, 8, -45), // Contact
	new THREE.Vector3(-80, 5, 35), // Venus
	new THREE.Vector3(300, 45, -90), // Mercury
	new THREE.Vector3(-233, -60, -440), // Mars
	new THREE.Vector3(-270, 100, -85), // Jupiter
	new THREE.Vector3(300, 40, -250), // Saturn
	new THREE.Vector3(-142, 53, -220), // Uranus
	new THREE.Vector3(133, 137, -570), // Neptune
	new THREE.Vector3(-200, 45, -110), // Pluto
	new THREE.Vector3(-150, 140, -300), // Black Hole
];

const SpaceshipHybrid = forwardRef(({ targetSection, onReachTarget, onManualFlight }, ref) => {
	const velocity = useRef(new THREE.Vector3());
	const [keys, setKeys] = useState({});
	const [isAutoNavigating, setIsAutoNavigating] = useState(false);
	const targetPosition = useRef(new THREE.Vector3());
	const lastTargetSection = useRef(-1);
	const isManualFlying = useRef(false);

	// Try to load the GLTF model
	let model = null;
	try {
		const { scene } = useGLTF('/models/spaceship.glb');
		model = scene;
	} catch (e) {
		// Model not available, will use fallback geometry
	}

	// Keyboard event handlers
	useEffect(() => {
		const handleKeyDown = (e) => {
			setKeys((prev) => ({ ...prev, [e.key]: true }));
			// Any key press cancels auto-navigation
			setIsAutoNavigating(false);
		};

		const handleKeyUp = (e) => {
			setKeys((prev) => ({ ...prev, [e.key]: false }));
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	// Handle target section changes
	useEffect(() => {
		if (targetSection !== null && targetSection !== lastTargetSection.current) {
			targetPosition.current.copy(sectionPositions[targetSection]);
			setIsAutoNavigating(true);
			isManualFlying.current = false; // Reset manual flying flag when auto-nav starts
			lastTargetSection.current = targetSection;
		}
	}, [targetSection]);

	useFrame((state, delta) => {
		if (!ref.current) return;

		const speed = 10;
		const rotationSpeed = 2;
		const damping = 0.9;

		const hasKeyInput =
			keys['ArrowLeft'] ||
			keys['ArrowRight'] ||
			keys['ArrowUp'] ||
			keys['ArrowDown'] ||
			keys['w'] ||
			keys['s'] ||
			keys[' '] ||
			keys['Shift'] ||
			keys['Control'] ||
			keys['c'];

		if (isAutoNavigating && !hasKeyInput) {
			// AUTO-NAVIGATION MODE
			const direction = new THREE.Vector3();
			direction.subVectors(targetPosition.current, ref.current.position);
			const distance = direction.length();

			if (distance > 0.5) {
				// Move towards target
				direction.normalize();
				ref.current.position.add(direction.multiplyScalar(speed * delta * 1.5));

				// Rotate to face target (add PI to account for model's 180° rotation)
				const angle = Math.atan2(direction.x, direction.z) + Math.PI;
				ref.current.rotation.y = THREE.MathUtils.lerp(
					ref.current.rotation.y,
					angle,
					delta * 5,
				);

				// Banking during auto-flight
				ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
			} else {
				// Reached target
				setIsAutoNavigating(false);
				if (onReachTarget) onReachTarget(lastTargetSection.current);
			}
		} else {
			// MANUAL CONTROL MODE
			// Notify parent that manual flight has started (only once)
			if (hasKeyInput && !isManualFlying.current && onManualFlight) {
				isManualFlying.current = true;
				lastTargetSection.current = -1; // Reset to allow re-navigation to same section
				onManualFlight();
			}
			// Rotation controls
			if (keys['ArrowLeft']) {
				ref.current.rotation.y += rotationSpeed * delta;
			}
			if (keys['ArrowRight']) {
				ref.current.rotation.y -= rotationSpeed * delta;
			}

			// Forward/backward movement in the direction the ship is facing
			const forward = new THREE.Vector3(0, 0, -1);
			forward.applyEuler(ref.current.rotation);

			if (keys['ArrowUp'] || keys['w']) {
				velocity.current.add(forward.multiplyScalar(speed * delta));
			}
			if (keys['ArrowDown'] || keys['s']) {
				velocity.current.add(forward.multiplyScalar(-speed * delta));
			}

			// Up/down controls
			if (keys[' '] || keys['Shift']) {
				velocity.current.y += speed * delta;
			}
			if (keys['Control'] || keys['c']) {
				velocity.current.y -= speed * delta;
			}

			// Apply velocity with damping
			velocity.current.multiplyScalar(damping);
			ref.current.position.add(velocity.current);

			// Tilt effects based on movement
			ref.current.rotation.z = THREE.MathUtils.lerp(
				ref.current.rotation.z,
				-velocity.current.x * 0.2,
				delta * 5,
			);
			ref.current.rotation.x = THREE.MathUtils.lerp(
				ref.current.rotation.x,
				velocity.current.z * 0.1,
				delta * 5,
			);
		}

		// Idle floating when not moving
		if (!isAutoNavigating && velocity.current.length() < 0.1) {
			ref.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.005;
		}
	});

	return (
		<group ref={ref} position={[0, 0, 0]}>
			{/* Use GLTF model if available, otherwise fallback to geometry */}
			{model ? (
				<group scale={[0.0033, 0.0033, 0.0033]} rotation={[0, Math.PI, 0]}>
					<primitive object={model.clone()} />
				</group>
			) : (
				<>
					{/* Main body */}
					<mesh castShadow>
						<coneGeometry args={[0.5, 2, 8]} />
						<meshStandardMaterial
							color='#4488ff'
							metalness={0.8}
							roughness={0.2}
						/>
					</mesh>

					{/* Cockpit */}
					<mesh position={[0, 0.3, 0.3]} castShadow>
						<sphereGeometry args={[0.3, 16, 16]} />
						<meshStandardMaterial
							color='#88ccff'
							metalness={0.9}
							roughness={0.1}
							transparent
							opacity={0.8}
						/>
					</mesh>

					{/* Wings */}
					<mesh
						position={[0.8, -0.2, 0]}
						rotation={[0, 0, Math.PI / 6]}
						castShadow
					>
						<boxGeometry args={[0.1, 0.8, 1.5]} />
						<meshStandardMaterial
							color='#2244aa'
							metalness={0.7}
							roughness={0.3}
						/>
					</mesh>
					<mesh
						position={[-0.8, -0.2, 0]}
						rotation={[0, 0, -Math.PI / 6]}
						castShadow
					>
						<boxGeometry args={[0.1, 0.8, 1.5]} />
						<meshStandardMaterial
							color='#2244aa'
							metalness={0.7}
							roughness={0.3}
						/>
					</mesh>
				</>
			)}

			{/* Engine glow */}
			<pointLight
				position={[0, -1, 0]}
				intensity={2}
				distance={5}
				color='#ff6600'
			/>
			<mesh position={[0, -1, 0]}>
				<cylinderGeometry args={[0.2, 0.3, 0.5, 16]} />
				<meshBasicMaterial color='#ff6600' />
			</mesh>
		</group>
	);
});

export default SpaceshipHybrid;
