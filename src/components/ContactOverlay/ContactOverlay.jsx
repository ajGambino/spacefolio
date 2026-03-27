import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ContactOverlay.css';

function ContactOverlay({ isOpen, onClose }) {
	const overlayRef = useRef(null);
	const closeBtnRef = useRef(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);

	// Focus management
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

	useEffect(() => {
		if (!isOpen) {
			setFormData({ name: '', email: '', message: '' });
		}
	}, [isOpen]);

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: EmailJS integration will go here
		console.log('Form submitted:', formData);
		// Placeholder: Show success message or handle submission
		alert('EmailJS integration pending. Form data logged to console.');
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
						className='overlay-container contact-overlay-container'
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						role='dialog'
						aria-modal='true'
						aria-labelledby='contact-title'
					>
						{/* Header */}
						<div className='overlay-header'>
							<h2 id='contact-title' className='overlay-title'>
								<span className='title-icon'>📡</span>
								Contact Me
							</h2>

							<motion.button
								ref={closeBtnRef}
								className='close-btn'
								onClick={onClose}
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								aria-label='Close contact overlay'
							>
								<span className='close-icon'>✕</span>
							</motion.button>
						</div>

						{/* Contact Content */}
						<motion.div
							className='overlay-content'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
						>
							<div className='contact-container'>
								<motion.div
									className='contact-intro'
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
									<h3 className='contact-heading'>Get In Touch</h3>
									<p className='contact-description'>
										Have a question or want to work together? Send me a message
										and I'll get back to you as soon as possible!
									</p>
								</motion.div>

								{/* Contact Form */}
								<motion.form
									className='contact-form'
									onSubmit={handleSubmit}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.25 }}
								>
									{/* Name Field */}
									<div className='form-field'>
										<label htmlFor='name' className='form-label'>
											Name
										</label>
										<input
											type='text'
											id='name'
											name='name'
											value={formData.name}
											onChange={handleInputChange}
											className='form-input'
											placeholder='Your name'
											required
										/>
									</div>

									{/* Email Field */}
									<div className='form-field'>
										<label htmlFor='email' className='form-label'>
											Email
										</label>
										<input
											type='email'
											id='email'
											name='email'
											value={formData.email}
											onChange={handleInputChange}
											className='form-input'
											placeholder='your.email@example.com'
											required
										/>
									</div>

									{/* Message Field */}
									<div className='form-field'>
										<label htmlFor='message' className='form-label'>
											Message
										</label>
										<textarea
											id='message'
											name='message'
											value={formData.message}
											onChange={handleInputChange}
											className='form-textarea'
											placeholder='Your message...'
											rows={6}
											required
										/>
									</div>

									{/* Submit Button */}
									<motion.button
										type='submit'
										className='form-submit-btn'
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<span className='btn-icon'>📨</span>
										Send Message
									</motion.button>

									{/* EmailJS Notice */}
									<p className='emailjs-notice'>
										<span className='notice-icon'>⚙️</span>
										EmailJS integration pending
									</p>
								</motion.form>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return createPortal(overlayContent, document.body);
}

export default ContactOverlay;
