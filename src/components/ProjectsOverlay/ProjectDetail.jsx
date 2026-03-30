import { motion } from 'framer-motion';

function ProjectDetail({ project, onBack }) {
	return (
		<motion.div
			className='project-detail'
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
		>
			{/* Back Button */}
			<motion.button
				className='detail-back-btn'
				onClick={onBack}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				aria-label='Back to projects grid'
			>
				<span className='back-arrow'>←</span>
				<span>Back to Projects</span>
			</motion.button>

			{/* Header Section */}
			<div className='detail-header'>
				<div className='detail-image'>
					{project.image ? (
						<a
							href={project.image}
							target='_blank'
							rel='noopener noreferrer'
							className='detail-image-link'
							aria-label={`Open full size image of ${project.title}`}
						>
							<img
								src={project.image}
								alt={`${project.title} hero`}
								className='detail-hero-image'
								loading='lazy'
								onError={(e) => {
									e.currentTarget.style.display = 'none';
								}}
							/>
						</a>
					) : (
						<div className='image-placeholder-large'>
							<span className='placeholder-icon-large'>🚀</span>
						</div>
					)}
					<div className='image-overlay' />
				</div>

				<div className='detail-header-info'>
					{project.featured && (
						<div className='featured-badge-detail'>
							<span className='badge-icon'>★</span>
							<span>Featured Project</span>
						</div>
					)}
					<h2 className='detail-title'>{project.title}</h2>
					<p className='detail-short-desc'>{project.shortDescription}</p>

					{/* Action Buttons */}
					<div className='detail-actions'>
						{project.links.github && (
							<motion.a
								href={project.links.github}
								target='_blank'
								rel='noopener noreferrer'
								className='action-btn github-btn'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className='btn-icon'>{'</>'}</span>
								<span>GitHub</span>
							</motion.a>
						)}
						{project.links.live && (
							<motion.a
								href={project.links.live}
								target='_blank'
								rel='noopener noreferrer'
								className='action-btn live-btn'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className='btn-icon'>↗</span>
								<span>Live Demo</span>
							</motion.a>
						)}
					</div>
				</div>
			</div>

			{/* Content Sections */}
			<div className='detail-content'>
				{/* Description */}
				<section className='detail-section'>
					<h3 className='section-title'>Overview</h3>
					<p className='detail-long-desc'>{project.longDescription}</p>
				</section>

				{/* Metrics (if available) */}
				{project.metrics && project.metrics.length > 0 && (
					<section className='detail-section'>
						<h3 className='section-title'>Key Metrics</h3>
						<div className='metrics-grid'>
							{project.metrics.map((metric, idx) => (
								<motion.div
									key={idx}
									className='metric-card'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.1 }}
								>
									<div className='metric-value'>{metric.value}</div>
									<div className='metric-label'>{metric.label}</div>
								</motion.div>
							))}
						</div>
					</section>
				)}

				{/* Highlights */}
				{project.highlights && project.highlights.length > 0 && (
					<section className='detail-section'>
						<h3 className='section-title'>Highlights</h3>
						<ul className='highlights-list'>
							{project.highlights.map((highlight, idx) => (
								<motion.li
									key={idx}
									className='highlight-item'
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.05 }}
								>
									<span className='highlight-bullet'>▸</span>
									<span>{highlight}</span>
								</motion.li>
							))}
						</ul>
					</section>
				)}
				{/* Artifacts */}
				{project.artifacts && project.artifacts.length > 0 && (
					<section className='detail-section'>
						<h3 className='section-title'>Artifacts</h3>
						<div className='artifacts-grid'>
							{project.artifacts.map((a, idx) => (
								<motion.a
									key={`${a.label}-${idx}`}
									className='artifact-card'
									href={a.src}
									target='_blank'
									rel='noopener noreferrer'
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.05 }}
									whileHover={{ y: -2, scale: 1.01 }}
								>
									<div className='artifact-thumb'>
										<img src={a.src} alt={a.label} />
										<div className='artifact-thumb-overlay' />
									</div>
									<div className='artifact-meta'>
										<div className='artifact-label'>{a.label}</div>
										<div className='artifact-hint'>Open</div>
									</div>
								</motion.a>
							))}
						</div>
					</section>
				)}

				{/* System */}
				<section className='detail-section'>
					<h3 className='section-title'>System</h3>
					<div className='stack-grid'>
						{project.system.map((item, idx) => (
							<motion.span
								key={item}
								className='stack-badge'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: idx * 0.03 }}
								whileHover={{ scale: 1.05 }}
							>
								{item}
							</motion.span>
						))}
					</div>
				</section>
			</div>

			{/* Decorative Glow */}
			<div className='detail-glow' />
		</motion.div>
	);
}

export default ProjectDetail;
