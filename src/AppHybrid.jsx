import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import SpaceshipHybrid from './components/SpaceshipHybrid';
import SectionMarkersClickable from './components/SectionMarkersClickable';
import SceneManual from './components/SceneManual';
import ProjectsOverlay from './components/ProjectsOverlay/ProjectsOverlay';
import CreditsOverlay from './components/CreditsOverlay/CreditsOverlay';
import AboutOverlay from './components/AboutOverlay/AboutOverlay';
import ContactOverlay from './components/ContactOverlay/ContactOverlay';
import './App.css';

function AppHybrid() {
	const shipRef = useRef();
	const [targetSection, setTargetSection] = useState(null);
	const [arrivedSection, setArrivedSection] = useState(0);
	const [isProjectsOverlayOpen, setIsProjectsOverlayOpen] = useState(false);
	const [isCreditsOverlayOpen, setIsCreditsOverlayOpen] = useState(false);
	const [isAboutOverlayOpen, setIsAboutOverlayOpen] = useState(false);
	const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);

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
				</Suspense>
			</Canvas>

			{/* Navigation Bar */}
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

			{/* Controls Info */}
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

			{/* Overlays */}
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
