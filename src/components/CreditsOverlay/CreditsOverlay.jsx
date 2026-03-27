import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { credits } from '../../constants/credits';
import './CreditsOverlay.css';

function CreditsOverlay({ isOpen, onClose }) {
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
						aria-labelledby='credits-title'
					>
						{/* Header */}
						<div className='overlay-header'>
							<h2 id='credits-title' className='overlay-title'>
								<span className='title-icon'>🎨</span>
								Credits & Attributions
							</h2>

							<motion.button
								ref={closeBtnRef}
								className='close-btn'
								onClick={onClose}
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								aria-label='Close credits overlay'
							>
								<span className='close-icon'>✕</span>
							</motion.button>
						</div>

						{/* Credits Content */}
						<motion.div
							className='overlay-content'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
						>
							<div className='credits-grid'>
								{/* Attribution Cards */}
								{credits.map((credit, idx) => (
									<motion.article
										key={credit.id}
										className='credit-card'
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.15 + idx * 0.05 }}
									>
										<div className='credit-card-header'>
											<h3 className='credit-title'>{credit.title}</h3>
											<span className='credit-type'>{credit.type}</span>
										</div>
										<div className='credit-card-body'>
											<p className='credit-description'>
												<a
													href={credit.modelUrl}
													target='_blank'
													rel='noopener noreferrer'
													className='credit-link'
												>
													"{credit.title}"
												</a>{' '}
												by{' '}
												<span className='credit-artist'>{credit.artist}</span>{' '}
												is licensed under{' '}
												<a
													href={credit.licenseUrl}
													target='_blank'
													rel='noopener noreferrer'
													className='credit-link'
												>
													{credit.license}
												</a>
											</p>
										</div>
										<div className='credit-card-footer'>
											<span className='credit-badge'>
												{credit.licenseBadge}
											</span>
										</div>
									</motion.article>
								))}
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return createPortal(overlayContent, document.body);
}

export default CreditsOverlay;
