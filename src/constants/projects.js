export const projects = [
	{
		id: 'kalshi-btc-trader',
		title: 'BTC Probability & Trading Engine',
		shortDescription:
			'Real-time probability model that prices BTC event outcomes from volatility and return distributions, identifying mispriced contracts and executing trades.',
		longDescription:
			'Built a trading pipeline that ingests live BTC-USD candles, computes rolling realized volatility, forecasts contract settlement probabilities across configurable horizons, and places/records trades via the Kalshi API. The system emphasizes reliability (freshness diagnostics, deterministic settlement scheduling, and detailed trade logs) and is designed for iterative backtesting as more trades accumulate. The system is designed to surface potential edge by comparing model-implied probabilities against market prices.',
		system: [
			'Probability Modeling',
			'Time Series',
			'Stochastic Systems',
			'Backtesting',
			'Risk Modeling',
			'Python',
			'NumPy',
			'Pandas',
			'SciPy',
		],
		links: {
			github: 'https://github.com/ajGambino/kalshi',
			live: '',
		},
		highlights: [
			'Probability model based on log returns with volatility scaling (Gaussian + Student-t distributions for fat-tail modeling)',
			'Real-time BTC candle ingestion + freshness diagnostics to detect lag/stale feeds',
			'Rolling realized volatility estimation and probability forecasts for event contracts',
			'Configurable settlement horizons (hourly vs daily) with deterministic scheduling',
			'Execution layer supporting repeatable paper trading and live trading modes',
			'Structured trade logging for later backtesting and performance analytics',
			'Designed to evolve: plug in new signals, calibration layers, and risk constraints',
		],
		featured: true,
		metrics: [
			{ label: 'Data Granularity', value: '1m / 5m candles' },
			{ label: 'Volatility Window', value: '24h rolling window' },
			{ label: 'Execution Modes', value: 'Paper + Live trading' },
			{ label: 'Settlement Horizons', value: 'Hourly / Daily' },
		],
		image: '/images/kalshi.png',
		artifacts: [
			{
				type: 'image',
				label: 'Architecture',
				src: '/images/kalshi-arch.png',
			},
			{
				type: 'image',
				label: 'Trade Log',
				src: '/images/kalshi-log.png',
			},
		],
	},
	{
		id: 'tennis-sim-framework',
		title: 'Stochastic Tennis Simulation Engine',
		shortDescription:
			'High-fidelity Monte Carlo engine that simulates tennis from point to match level, capturing outcome distributions and variance using player data and ML models.',
		longDescription:
			'Built a full tennis simulation framework that models matches from points to games to sets to tiebreaks with complete rules and rich stat tracking (aces, double faults, break points, rally lengths, and more). The engine loads historical ATP/WTA match data from Jeff Sackmann datasets, supports surface-specific stats (hard/clay/grass), and blends player parameters with tour averages using smoothing when samples are thin. For higher fidelity, it can run a shot-by-shot rally simulation with serve placement, return quality, and tactical patterns, optionally enriched by Match Charting Project data from 17,000+ charted matches. The project includes an Elo rating system for realistic skill differentiation, an ML pipeline (XGBoost) for match outcome prediction, reproducible seeded simulations, and two interfaces: a Streamlit web UI (bulk Monte Carlo + single-match viewer with paginated shot replay) and CLI tools for scripted runs and CSV exports. The goal is to move beyond point estimates and model the full distribution of outcomes, capturing variance and uncertainty at every level of play.',
		system: [
			'Monte Carlo',
			'Stochastic Modeling',
			'Machine Learning',
			'Sports Simulation',
			'Python',
			'Pandas',
			'NumPy',
			'XGBoost',
			'Streamlit',
		],
		links: {
			github: 'https://github.com/ajGambino/tennis_sim',
			live: 'https://brokesims.streamlit.app/',
		},
		highlights: [
			'Stochastic simulation framework capturing outcome distributions and match-level uncertainty, not just point estimates',
			'ML model (XGBoost) trained on historical match data to improve outcome predictions alongside simulation outputs',
			'Full tennis rules engine: advantage scoring, tiebreaks, best of 3 or 5 match logic',
			'Point level probabilistic serve/return model using historical player stats with smoothing + tour average fallback',
			'Shot by shot rally simulation with serve placement, return quality, and tactical modeling',
			'Optional Match Charting Project integration leveraging patterns from 17,000+ charted matches',
			'Monte Carlo runner for thousands of simulations with score distributions + stat distributions',
			'Streamlit UI: bulk simulator + single match viewer + paginated shot replay (20 shots/page)',
			'CLI tools for single matches, bulk sims, ML predictions, and CSV exports',
			'Reproducible results via deterministic random seeds',
		],
		featured: true,
		metrics: [
			{ label: 'Simulation Modes', value: 'Point + Shot-level' },
			{ label: 'Charting Coverage', value: '17K+ Matches' },
			{ label: 'Interfaces', value: 'Streamlit + CLI' },
			{ label: 'Reproducibility', value: 'Seeded runs' },
		],
		image: '/images/tennis.png',
		artifacts: [
			{ type: 'image', label: 'Shot by Shot', src: '/images/single_sim.png' },
			{
				type: 'image',
				label: 'Tournament Sim',
				src: '/images/tourney_sims.png',
			},
			{
				type: 'image',
				label: 'Model Comparison',
				src: '/images/model_comparison.png',
			},
		],
	},
	{
		id: 'fantasy-blind-auction',
		title: 'Real-Time Auction Engine',
		shortDescription:
			'Concurrent auction system with blind bidding, deterministic resolution logic, and synchronized state across players in real-time.',
		longDescription:
			'Built a real-time auction system centered around simultaneous blind bidding, where multiple players submit hidden inputs that must be resolved deterministically and fairly under strict timing constraints. The core challenge was designing a server-side engine that enforces bidding rules, budget constraints, and tie-breaking logic while maintaining a consistent game state across all clients. The system uses WebSockets for live synchronization, ensuring all players see the same state transitions in real-time, with robust reconnection handling to preserve continuity mid-game. Supabase (PostgreSQL) handles persistence, while the backend coordinates auction flow, timers, and validation logic. The result is a multiplayer system that behaves predictably under concurrency, where outcomes are fully determined by rules rather than client-side race conditions or timing inconsistencies. The system enforces deterministic outcomes regardless of timing or client behavior.',
		system: [
			'Real-Time Systems',
			'Concurrency',
			'Game Logic',
			'State Synchronization',
			'React',
			'Node.js',
			'Socket.IO',
			'Supabase',
		],
		links: {
			github: 'https://github.com/ajGambino/blindauctions',
			live: 'https://blindauctions-1.onrender.com/',
		},
		highlights: [
			'Blind bidding system with simultaneous hidden inputs and deterministic resolution',
			'Server-side auction engine enforcing budget constraints, bidding rules, and tie-breaking logic',
			'Real-time state synchronization across clients using WebSockets',
			'Reconnection-safe architecture preserving game state mid-auction',
			'Deterministic outcomes under concurrent inputs (no race condition exploits)',
			'Configurable game parameters: player count, budgets, roster constraints',
			'Persistent game state and history using Supabase (PostgreSQL)',
		],
		featured: true,
		metrics: [
			{ label: 'Game Modes', value: '2–6 Players' },
			{ label: 'Budget per Player', value: '$100 per player' },
			{ label: 'Roster Size', value: '5 players' },
			{ label: 'Auction Type', value: 'Blind Bidding' },
		],
		image: '/images/bid_equity.png',
		artifacts: [
			{
				type: 'image',
				label: 'Auction Board',
				src: '/images/bid2.png',
			},
			{
				type: 'image',
				label: 'Live Bidding',
				src: '/images/bid3.png',
			},
			{
				type: 'image',
				label: 'Final Rosters',
				src: '/images/bid4.png',
			},
		],
	},
	{
		id: 'fantasy-freebies',
		title: 'Fantasy Decision Support System',
		shortDescription:
			'Analytics platform for draft, trade, and waiver decisions using projections, rankings, and multi-source data integration.',
		longDescription:
			'Built a comprehensive fantasy football analytics platform that consolidates the tools I actually use throughout the season: a live draft assistant (Draft Caddy), weekly projections with ESPN roster import and matchup views, rankings with ADP differential analysis, a position-weighted trade calculator supporting 1QB and Superflex formats, and weekly waiver wire writeups with historical navigation. The app is React + Vite on the frontend with Tailwind styling, uses a lightweight Express proxy (local) and Netlify Functions (production) to safely inject ESPN auth cookies and avoid browser CORS limitations, and relies on a CSV-driven data layer so weekly updates can be made without backend changes. A Python script generates projection datasets and caches Sleeper headshots for better performance. The goal is to turn fragmented fantasy data into structured, decision-ready insights across the entire season lifecycle.',
		system: [
			'Decision Support',
			'Fantasy Analytics',
			'Data Pipelines',
			'React',
			'Node.js',
			'Netlify Functions',
			'Python',
		],
		links: {
			github: '',
			live: 'https://goberds.netlify.app/',
		},
		highlights: [
			'Draft Caddy: live draft assistant with PPR/Half-PPR/custom rankings, ADP comparison, keeper support, and drafted-player tracking',
			'Projections: weekly fantasy projections with ESPN league roster import, matchup view (you vs opponent), and league-wide matchup analysis',
			'Rankings: multi-source consensus rankings with ADP vs rank differentials, targets, and bulk import from clipboard',
			'Trade Calculator: 1QB + Superflex support, position-weighted valuations, rank-trend adjustments, and saved trade history',
			'Waivers: week-by-week waiver recommendations with position filters and historical week navigation via CSV archives',
			'ESPN integration via proxy layer (Express locally + Netlify Functions in production) for cookie-authenticated requests',
			'CSV-first data management (projections, rankings, waivers, trade values) for fast weekly updates without backend changes',
			'Sleeper headshot caching to reduce API calls and improve load performance',
		],
		featured: true,
		metrics: [
			{
				label: 'Core Modules',
				value: 'Draft • Projections • Rankings • Trades • Waivers',
			},
			{ label: 'Data Layer', value: 'CSV-driven weekly updates' },
			{
				label: 'API Integrations',
				value: 'ESPN + Sleeper',
			},
			{ label: 'Deployment', value: 'Netlify + Functions proxy' },
		],
		image: '/images/fantasy_freebies.png',
		artifacts: [
			{
				type: 'image',
				label: 'Draft Caddy',
				src: '/images/draft_caddy.png',
			},
			{
				type: 'image',
				label: 'Matchup View',
				src: '/images/matchups.png',
			},
			{
				type: 'image',
				label: 'Trade Calculator',
				src: '/images/trade_calc.png',
			},
		],
	},
	{
		id: 'smartshop',
		title: 'Geospatial Clustering & Budget Optimization Tool',
		shortDescription:
			'Clustering system that converts national store data into local market segments and allocates budgets based on geographic density and proximity.',
		longDescription:
			'Built a location intelligence web app that ingests store location data, clusters nearby stores into geographic markets, and generates budget allocation recommendations based on cluster size and density. The goal is to help advertisers transform a single national budget into multiple shared local budgets for more efficient media buying, clearer market coverage, and improved local impact. The app includes an interactive map for exploring store distributions, inspecting clusters, and exporting assignments for downstream media planning and campaign execution. The system translates raw geographic data into actionable market structure, enabling more efficient and targeted budget allocation.',
		system: [
			'Geospatial Clustering',
			'Budget Optimization',
			'Data Visualization',
			'React',
			'JavaScript',
			'Mapbox/Leaflet',
		],
		links: {
			github: '',
			live: 'https://smartshopstores.netlify.app/',
		},
		highlights: [
			'Interactive map visualization of store locations and cluster boundaries',
			'Geographic proximity clustering to define local markets from store networks',
			'Budget allocation recommendations based on cluster size and density signals',
			'Exportable cluster assignments + budget splits for media planning workflows',
			'Designed to convert national spend into localized campaign structures',
		],
		featured: false,
		metrics: [
			{ label: 'Primary Output', value: 'Local market clusters' },
			{ label: 'Use Case', value: 'Budget localization' },
			{ label: 'Clustering Method', value: 'Geo clustering' },
			{ label: 'Exports', value: 'Cluster + budget files' },
		],
		image: '/images/smartshop.png',
		artifacts: [
			{
				type: 'image',
				label: 'Region Analysis',
				src: '/images/smartshop2.png',
			},
		],
	},
	{
		id: 'gw24-golf-tournament-manager',
		title: 'Real-Time Tournament & Betting Engine',
		shortDescription:
			'Live scoring and betting system with multi-format tournament logic, real-time leaderboards, and deterministic wager tracking.',
		longDescription:
			'Built a full-featured web app to run a multi-day golf tournament for 8 players across 4 teams. The system tracks hole-by-hole scoring and points across five formats (Own Ball, Alternate Shot, 2-Man Scramble, 4-Man Scramble, Shamble) and updates leaderboards in real-time across devices. It also includes a friendly wagering system for side bets (individual or team) with confirmation/void workflows to prevent disputes, plus historical bet tracking and recent bets visibility. Firebase powers authentication and live data sync using Firestore and Realtime Database for low-latency scoring updates. The system ensures scoring, standings, and wagers are tracked consistently and transparently across all formats in real time.',
		system: [
			'Real-Time Systems',
			'Tournament Logic',
			'Bet Tracking',
			'React',
			'Firebase',
			'Firestore',
			'Realtime Database',
		],
		links: {
			github: 'https://github.com/ajGambino/guys_weekend',
			live: 'https://guys-weekend.web.app/',
		},
		highlights: [
			'Leaderboard covering 5 tournament formats with points accumulation',
			'Hole-by-hole live scoring with automatic totals and team/individual rollups',
			'Real-time leaderboard sync across devices using Firebase Realtime Database',
			'Integrated betting system with bet categories, confirmations, and dispute resistant workflows',
			'Bet history with confirm/void tracking plus recent bets summary on the homepage',
			'Role based access: only authenticated users can enter scores and manage betting actions',
			'Mobile friendly UI with fast navigation between scoring, standings, and bets',
		],
		featured: false,
		metrics: [
			{ label: 'Players / Teams', value: '8 players / 4 teams' },
			{ label: 'Tournament Formats', value: '5 formats' },
			{ label: 'Scoring', value: 'Hole-by-hole + totals' },
			{ label: 'Real-time Sync', value: 'Live leaderboards' },
		],
		image: '/images/gw24.png',
		artifacts: [
			{
				type: 'image',
				label: 'Live Leaderboard',
				src: '/images/gw24-leaderboard.png',
			},
			{ type: 'image', label: 'Score Entry', src: '/images/gw24-scoring.png' },
			{ type: 'image', label: 'Bets Feed', src: '/images/gw24-bets.png' },
		],
	},
];
