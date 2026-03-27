import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../constants/projects';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import './ProjectsOverlay.css';

function ProjectsOverlay({ isOpen, onClose }) {
	const [selectedProject, setSelectedProject] = useState(null);
	const [filter, setFilter] = useState('all'); // 'all' or 'featured'
	const overlayRef = useRef(null);
	const firstFocusableRef = useRef(null);

	const filteredProjects =
		filter === 'featured' ? projects.filter((p) => p.featured) : projects;

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				if (selectedProject) {
					setSelectedProject(null);
				} else {
					onClose();
				}
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isOpen, selectedProject, onClose]);

	useEffect(() => {
		if (isOpen) {
			const previouslyFocused = document.activeElement;
			setTimeout(() => {
				if (firstFocusableRef.current) {
					firstFocusableRef.current.focus();
				}
			}, 100);
			document.body.style.overflow = 'hidden';

			return () => {
				document.body.style.overflow = '';
				if (previouslyFocused) {
					previouslyFocused.focus();
				}
			};
		}
	}, [isOpen]);

	// Reset selected project when closing
	useEffect(() => {
		if (!isOpen) {
			setSelectedProject(null);
		}
	}, [isOpen]);

	// Click outside to close (only on backdrop, not content)
	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			if (selectedProject) {
				setSelectedProject(null);
			} else {
				onClose();
			}
		}
	};

	if (!isOpen) return null;

	const overlayContent = (
		<AnimatePresence mode='wait'>
			{isOpen && (
				<motion.div
					ref={overlayRef}
					className='overlay-backdrop'
					onClick={handleBackdropClick}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					{/* Animated Background */}
					<div className='overlay-bg-stars' />
					<div className='overlay-bg-scanlines' />

					<motion.div
						className='overlay-container'
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						role='dialog'
						aria-modal='true'
						aria-labelledby='projects-title'
					>
						{!selectedProject ? (
							<>
								{/* Header */}
								<div className='overlay-header'>
									<div className='header-left'>
										<h2 id='projects-title' className='overlay-title'>
											<span className='title-icon'>⚡</span>
											Projects
										</h2>
										<div className='filter-controls'>
											<button
												ref={firstFocusableRef}
												className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
												onClick={() => setFilter('all')}
												aria-pressed={filter === 'all'}
											>
												All ({projects.length})
											</button>
											<button
												className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
												onClick={() => setFilter('featured')}
												aria-pressed={filter === 'featured'}
											>
												Featured ({projects.filter((p) => p.featured).length})
											</button>
										</div>
									</div>

									<motion.button
										className='close-btn'
										onClick={onClose}
										whileHover={{ scale: 1.1, rotate: 90 }}
										whileTap={{ scale: 0.9 }}
										aria-label='Close projects overlay'
									>
										<span className='close-icon'>✕</span>
									</motion.button>
								</div>

								{/* Projects Grid */}
								<motion.div
									className='projects-grid'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.1 }}
								>
									<AnimatePresence mode='popLayout'>
										{filteredProjects.map((project, idx) => (
											<motion.div
												key={project.id}
												layout
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ delay: idx * 0.05 }}
											>
												<ProjectCard
													project={project}
													onClick={setSelectedProject}
												/>
											</motion.div>
										))}
									</AnimatePresence>
								</motion.div>
							</>
						) : (
							<ProjectDetail
								project={selectedProject}
								onBack={() => setSelectedProject(null)}
							/>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	// Render as portal to end of body
	return createPortal(overlayContent, document.body);
}

export default ProjectsOverlay;
