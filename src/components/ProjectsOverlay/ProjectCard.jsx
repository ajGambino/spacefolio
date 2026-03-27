import { motion } from 'framer-motion';

function ProjectCard({ project, onClick }) {
	return (
		<motion.article
			className='project-card'
			onClick={() => onClick(project)}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			whileHover={{ scale: 1.02, y: -4 }}
			transition={{ duration: 0.2 }}
			tabIndex={0}
			role='button'
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick(project);
				}
			}}
			aria-label={`View details for ${project.title}`}
		>
			{/* Featured Badge */}
			{project.featured && (
				<motion.div
					className='featured-badge'
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					<span className='badge-icon'>★</span>
					<span>Featured</span>
				</motion.div>
			)}

			{/* Project Image */}
			<div className='project-card-image'>
				{project.image ? (
					<img
						src={project.image}
						alt={`${project.title} preview`}
						className='project-image'
						loading='lazy'
						onError={(e) => {
							// Fallback if path is wrong / missing in production
							e.currentTarget.style.display = 'none';
						}}
					/>
				) : (
					<div className='image-placeholder'>
						<span className='placeholder-icon'>🚀</span>
					</div>
				)}
				<div className='image-overlay' />
			</div>

			{/* Project Info */}
			<div className='project-card-content'>
				<h3 className='project-card-title'>{project.title}</h3>
				<p className='project-card-description'>{project.shortDescription}</p>

				{/* System */}
				<div className='project-card-tags'>
					{project.system.slice(0, 3).map((item) => (
						<span key={item} className='project-tag'>
							{item}
						</span>
					))}
					{project.system.length > 3 && (
						<span className='project-tag-more'>+{project.system.length - 3}</span>
					)}
				</div>

				{/* View Details Indicator */}
				<div className='project-card-footer'>
					<span className='view-details'>View Details</span>
					<span className='arrow-icon'>→</span>
				</div>
			</div>

			{/* Glow Effect */}
			<div className='card-glow' />
		</motion.article>
	);
}

export default ProjectCard;
