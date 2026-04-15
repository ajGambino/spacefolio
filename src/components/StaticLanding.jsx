import { motion } from 'framer-motion';
import './StaticLanding.css';

function StaticLanding({
	is3DReady,
	onLaunch,
	onOpenAbout,
	onOpenProjects,
	onOpenContact,
	onOpenCredits,
}) {
	return (
		<motion.div
			className='static-landing'
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8, ease: 'easeInOut' }}
		>
			<nav className='landing-nav'>
				<button className='landing-nav-btn' onClick={onOpenAbout}>
					About
				</button>
				<button className='landing-nav-btn' onClick={onOpenProjects}>
					Projects
				</button>
				<button className='landing-nav-btn' onClick={onOpenContact}>
					Contact
				</button>
				<button className='landing-nav-btn' onClick={onOpenCredits}>
					Credits
				</button>
			</nav>

			<div className='landing-hero'>
				<motion.div
					className='landing-title-block'
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1 }}
				>
					<p className='landing-eyebrow'>PORTFOLIO</p>
					<h1 className='landing-name'>Alex Gambino</h1>
					<p className='landing-tagline'>
						Analytics &amp; Engineering | Built for Uncertainty
					</p>
				</motion.div>

				<motion.div
					className='landing-cta-group'
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.35 }}
				>
					<div className={`launch-btn-wrap ${is3DReady ? 'is-ready' : ''}`}>
						<button
							className={`launch-btn ${
								is3DReady ? 'launch-btn--ready' : 'launch-btn--loading'
							}`}
							onClick={is3DReady ? onLaunch : undefined}
							disabled={!is3DReady}
						>
							{is3DReady ? 'Launch 3D Experience' : 'Preparing 3D Experience…'}
						</button>
					</div>

					{is3DReady && (
						<motion.p
							className='launch-ready-hint'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4 }}
						>
							3D experience ready
						</motion.p>
					)}

					<button className='view-projects-btn' onClick={onOpenProjects}>
						View Projects
					</button>
				</motion.div>
			</div>
		</motion.div>
	);
}

export default StaticLanding;
