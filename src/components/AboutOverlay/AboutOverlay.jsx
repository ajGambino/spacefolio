import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AboutOverlay.css';

function AboutOverlay({ isOpen, onClose }) {
	const overlayRef = useRef(null);
	const closeBtnRef = useRef(null);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			const previouslyFocused = document.activeElement;

			setTimeout(() => {
				if (closeBtnRef.current) {
					closeBtnRef.current.focus();
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

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
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
						aria-labelledby='about-title'
					>
						{/* Header */}
						<div className='overlay-header'>
							<h2 id='about-title' className='overlay-title'>
								<span className='title-icon'>👨‍🚀</span>
								About Me
							</h2>

							<motion.button
								ref={closeBtnRef}
								className='close-btn'
								onClick={onClose}
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								aria-label='Close about overlay'
							>
								<span className='close-icon'>✕</span>
							</motion.button>
						</div>

						{/* About Content */}
						<motion.div
							className='overlay-content'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
						>
							<div className='about-container'>
								{/* Profile Image */}
								<motion.div
									className='profile-section'
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2 }}
								>
									<div className='profile-image-container'>
										<div className='profile-image-placeholder'>
											<span className='profile-icon'>👤</span>
										</div>
										<div className='profile-glow' />
									</div>
								</motion.div>

								{/* Bio Content */}
								<motion.div
									className='bio-section'
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.25 }}
								>
									<h3 className='bio-heading'>Hello, I'm Alex</h3>
									<div className='bio-divider' />

									<p className='bio-text'>
										I spent 17 years as a professional poker player. Every
										decision was an EV calculation. That same framework now
										drives how I approach software, building systems for
										high-stakes decision making. The goal isn't just to model
										reality, it's to exploit where it's wrong.
									</p>
									<p className='bio-text'>
										My work sits at the intersection of analytics and
										engineering, focused on simulation, probability modeling,
										and constraint optimization. I prioritize speed, iteration,
										and signal over overengineering abstractions, designing
										systems that scale as they evolve.
									</p>
									<p className='bio-text'>
										More recently, I've been pushing deeper into stochastic
										modeling and machine learning systems that adapt as
										conditions change. Uncertainty isn't a problem I'm solving
										around. It's the environment I build for.
									</p>
									{/* Skills/Tech Stack */}
									<div className='skills-section'>
										<h4 className='skills-heading'>Core Stack</h4>
										<div className='skills-grid'>
											<div className='skills-grid'>
												<span className='skill-badge'>Python</span>
												<span className='skill-badge'>NumPy</span>
												<span className='skill-badge'>Pandas</span>
												<span className='skill-badge'>SciPy</span>
												<span className='skill-badge'>Monte Carlo</span>
												<span className='skill-badge'>Optimization (ILP)</span>
												<span className='skill-badge'>Machine Learning</span>
												<span className='skill-badge'>React</span>
												<span className='skill-badge'>Flask</span>
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return createPortal(overlayContent, document.body);
}

export default AboutOverlay;
