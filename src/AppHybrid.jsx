import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SpaceshipHybrid from './components/SpaceshipHybrid';
import SectionMarkersClickable from './components/SectionMarkersClickable';
import SceneManual from './components/SceneManual';
import StaticLanding from './components/StaticLanding';
import ProjectsOverlay from './components/ProjectsOverlay/ProjectsOverlay';
import CreditsOverlay from './components/CreditsOverlay/CreditsOverlay';
import AboutOverlay from './components/AboutOverlay/AboutOverlay';
import ContactOverlay from './components/ContactOverlay/ContactOverlay';
import './App.css';

// Mounts only after all useGLTF suspense promises inside the Suspense boundary resolve.
// The empty-dep useEffect fires exactly once, after the first paint of the 3D scene.
function SceneReadyNotifier({ onReady }) {
	useEffect(() => {
		onReady();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return null;
}

function AppHybrid() {
	const shipRef = useRef();
	const [targetSection, setTargetSection] = useState(null);
	const [arrivedSection, setArrivedSection] = useState(0);
	const [isProjectsOverlayOpen, setIsProjectsOverlayOpen] = useState(false);
	const [isCreditsOverlayOpen, setIsCreditsOverlayOpen] = useState(false);
	const [isAboutOverlayOpen, setIsAboutOverlayOpen] = useState(false);
	const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);

	// Landing-layer state
	const [hasLaunched, setHasLaunched] = useState(false);
	const [is3DReady, setIs3DReady] = useState(false);

	const handleSceneReady = () => setIs3DReady(true);
	const handleLaunch = () => setHasLaunched(true);

	const handleSectionClick = (sectionIndex) => {
		// If already at this section and we know our position, just open the overlay
		if (sectionIndex === arrivedSection && arrivedSection !== null) {
			if (sectionIndex === 1) {
				setIsCreditsOverlayOpen(true);
			} else if (sectionIndex === 2) {
				setIsAboutOverlayOpen(true);
			} else if (sectionIndex === 3) {
				setIsProjectsOverlayOpen(true);
			} else if (sectionIndex === 4) {
				setIsContactOverlayOpen(true);
			}
			return;
		}

		// Otherwise, navigate to the new section
		setTargetSection(sectionIndex);
		setArrivedSection(null); // Clear current location while in transit
		setIsProjectsOverlayOpen(false);
		setIsCreditsOverlayOpen(false);
		setIsAboutOverlayOpen(false);
		setIsContactOverlayOpen(false);
	};

	const handleManualFlight = () => {
		// Clear the arrived section when manually flying
		setArrivedSection(null);
		// Also clear any pending target to prevent auto-navigation from resuming
		setTargetSection(null);
	};

	const handleReachTarget = (reachedSectionIndex) => {
		setArrivedSection(reachedSectionIndex);
		setTargetSection(null);

		if (reachedSectionIndex === 1) {
			setIsCreditsOverlayOpen(true);
		} else if (reachedSectionIndex === 2) {
			setIsAboutOverlayOpen(true);
		} else if (reachedSectionIndex === 3) {
			setIsProjectsOverlayOpen(true);
		} else if (reachedSectionIndex === 4) {
			setIsContactOverlayOpen(true);
		}
	};

	const handleCloseProjectsOverlay = () => {
		setIsProjectsOverlayOpen(false);
	};

	const handleCloseCreditsOverlay = () => {
		setIsCreditsOverlayOpen(false);
	};

	const handleCloseAboutOverlay = () => {
		setIsAboutOverlayOpen(false);
	};

	const handleCloseContactOverlay = () => {
		setIsContactOverlayOpen(false);
	};

	return (
		<>
			{/* Canvas — always mounted so 3D assets load in background immediately.
			    opacity: 0 hides it without pausing the R3F render loop. */}
			<div
				className='canvas-wrapper'
				style={{
					opacity: hasLaunched ? 1 : 0,
					transition: 'opacity 0.8s ease-in-out',
					pointerEvents: hasLaunched ? 'all' : 'none',
				}}
			>
				<Canvas
					camera={{ position: [0, 5, 10], fov: 75 }}
					style={{ background: '#000011' }}
				>
					{/* Lighting */}
					<ambientLight intensity={0.3} />
					<directionalLight position={[10, 10, 5]} intensity={1} />
					<pointLight position={[-10, -10, -5]} intensity={0.5} />

					{/* Background */}
					<Stars
						radius={100}
						depth={50}
						count={5000}
						factor={4}
						saturation={0}
						fade
						speed={1}
					/>

					{/* Main Scene Components */}
					<SceneManual shipRef={shipRef} />
					<Suspense fallback={null}>
						<SectionMarkersClickable
							onSectionClick={handleSectionClick}
							arrivedSection={arrivedSection}
						/>
						<SpaceshipHybrid
							ref={shipRef}
							targetSection={targetSection}
							onReachTarget={handleReachTarget}
							onManualFlight={handleManualFlight}
						/>
						{/* Fires once all GLTF suspense promises in this boundary resolve */}
						<SceneReadyNotifier onReady={handleSceneReady} />
					</Suspense>
				</Canvas>
			</div>

			{/* 2D landing — fades out via AnimatePresence on launch */}
			<AnimatePresence>
				{!hasLaunched && (
					<StaticLanding
						is3DReady={is3DReady}
						onLaunch={handleLaunch}
						onOpenAbout={() => setIsAboutOverlayOpen(true)}
						onOpenProjects={() => setIsProjectsOverlayOpen(true)}
						onOpenContact={() => setIsContactOverlayOpen(true)}
						onOpenCredits={() => setIsCreditsOverlayOpen(true)}
					/>
				)}
			</AnimatePresence>

			{/* 3D-only UI — shown only after the user has launched the experience */}
			{hasLaunched && (
				<nav className='main-navigation'>
					<button
						className={`nav-button ${arrivedSection === 0 ? 'active' : ''}`}
						onClick={() => handleSectionClick(0)}
					>
						Home
					</button>
					<button
						className={`nav-button ${arrivedSection === 2 ? 'active' : ''}`}
						onClick={() => handleSectionClick(2)}
					>
						About
					</button>
					<button
						className={`nav-button ${arrivedSection === 3 ? 'active' : ''}`}
						onClick={() => handleSectionClick(3)}
					>
						Projects
					</button>
					<button
						className={`nav-button ${arrivedSection === 4 ? 'active' : ''}`}
						onClick={() => handleSectionClick(4)}
					>
						Contact
					</button>
					<button
						className={`nav-button ${arrivedSection === 1 ? 'active' : ''}`}
						onClick={() => handleSectionClick(1)}
					>
						Credits
					</button>
				</nav>
			)}

			{hasLaunched && (
				<div className='controls-info'>
					<h2>🚀 Controls</h2>
					<div className='controls-grid'>
						<div>
							<strong>Manual Flight:</strong>
						</div>
						<div>
							<kbd>↑</kbd> or <kbd>W</kbd> - Forward
						</div>
						<div>
							<kbd>↓</kbd> or <kbd>S</kbd> - Backward
						</div>
						<div>
							<kbd>←</kbd> - Turn Left
						</div>
						<div>
							<kbd>→</kbd> - Turn Right
						</div>
						<div>
							<kbd>Space</kbd> - Ascend
						</div>
						<div>
							<kbd>Ctrl</kbd> - Descend
						</div>
						<div style={{ marginTop: '10px' }}>
							<strong>Auto-Pilot:</strong>
						</div>
						<div>Click any planet to fly there</div>
						<div style={{ fontSize: '12px', opacity: '0.7', marginTop: '5px' }}>
							💡 Press any key to cancel auto-pilot
						</div>
					</div>
				</div>
			)}

			{/* Overlays — always present; work from both 2D landing and 3D modes */}
			<ProjectsOverlay
				isOpen={isProjectsOverlayOpen}
				onClose={handleCloseProjectsOverlay}
			/>
			<CreditsOverlay
				isOpen={isCreditsOverlayOpen}
				onClose={handleCloseCreditsOverlay}
			/>
			<AboutOverlay
				isOpen={isAboutOverlayOpen}
				onClose={handleCloseAboutOverlay}
			/>
			<ContactOverlay
				isOpen={isContactOverlayOpen}
				onClose={handleCloseContactOverlay}
			/>
		</>
	);
}

export default AppHybrid;
