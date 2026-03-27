# Spacefolio - 3D Interactive Portfolio

A 3D portfolio website where you pilot a spaceship through space to explore different sections. Navigate manually with keyboard controls or click on planets to auto-fly to each section. Each planet opens an overlay with detailed content about projects, background, and contact info.

## Features

- **Hybrid Control System**: Keyboard flight controls + clickable planets for auto-pilot navigation
- **3D Planetary Models**: Earth, Mars, Venus, Mercury, and other celestial bodies from Sketchfab
- **Interactive Overlays**: Projects gallery with detailed views, About/Credits, and Contact sections
- **Manual Flight Physics**: Momentum-based movement with banking animations and third-person camera
- **Rich Project Showcase**: 6 featured projects with images, tech stacks, metrics, and detailed descriptions
- **Starfield Background**: 5000+ stars with ambient and directional lighting
- **Reconnection Support**: Smooth handling when resuming navigation

## Project Structure

```
src/
├── components/
│   ├── SpaceshipHybrid.jsx           # Spaceship with hybrid control (manual + auto-pilot)
│   ├── SectionMarkersClickable.jsx   # Clickable planetary models
│   ├── SceneManual.jsx               # Third-person camera controller
│   ├── ProjectsOverlay/
│   │   ├── ProjectsOverlay.jsx       # Projects gallery overlay
│   │   ├── ProjectCard.jsx           # Individual project cards
│   │   └── ProjectDetail.jsx         # Detailed project view
│   ├── AboutOverlay/
│   │   └── AboutOverlay.jsx          # About section overlay
│   ├── ContactOverlay/
│   │   └── ContactOverlay.jsx        # Contact information overlay
│   └── CreditsOverlay/
│       └── CreditsOverlay.jsx        # 3D model attribution overlay
├── constants/
│   ├── projects.js                   # Project data (6 projects)
│   └── credits.js                    # 3D model credits
├── AppHybrid.jsx                     # Main app with hybrid controls
├── App.css                           # Styling
├── main.jsx                          # React entry point
└── index.css                         # Global styles
```

## Interactive Sections

The portfolio features 4 clickable space station sections:

1. **(Credits)** - Attribution for 3D models from Sketchfab artists
2. **(About)** - Background and introduction
3. **(Projects)** - Portfolio of 6 projects including:
   - Kalshi BTC Trading Engine
   - Tennis Match Simulation Framework
   - Bid Equity (Fantasy Auction)
   - Fantasy Freebies
   - SmartShop (Geographic Clustering)
   - Golf Tournament Manager
4. **(Contact)** - Contact information and links

## Controls

### Manual Flight

- <kbd>↑</kbd> or <kbd>W</kbd> - Move Forward
- <kbd>↓</kbd> or <kbd>S</kbd> - Move Backward
- <kbd>←</kbd> - Turn Left
- <kbd>→</kbd> - Turn Right
- <kbd>Space</kbd> - Ascend
- <kbd>Ctrl</kbd> - Descend

### Auto-Pilot

- **Click any planet** to automatically fly to that section
- Press any key to cancel auto-pilot and resume manual control

See [CONTROLS.md](CONTROLS.md) for detailed control documentation.

## Technologies

- React 18
- React Three Fiber
- Three.js
- @react-three/drei (GLTFLoader, Stars, useGLTF)
- Framer Motion
- Vite
