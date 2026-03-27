# Flight Controls

## Switching Modes

Edit [src/main.jsx](src/main.jsx#L8) and change `MANUAL_MODE`:

- `MANUAL_MODE = true` - **Manual flight** with keyboard controls
- `MANUAL_MODE = false` - **Automatic navigation** with UI buttons

## Manual Flight Controls

When in manual mode, fly the spaceship using your keyboard:

| Key | Action |
|-----|--------|
| <kbd>↑</kbd> or <kbd>W</kbd> | Move Forward |
| <kbd>↓</kbd> or <kbd>S</kbd> | Move Backward |
| <kbd>←</kbd> | Turn Left |
| <kbd>→</kbd> | Turn Right |
| <kbd>Space</kbd> | Ascend (move up) |
| <kbd>Ctrl</kbd> or <kbd>C</kbd> | Descend (move down) |

### Flight Physics

- **Momentum**: The ship has inertia - it will coast when you stop pressing keys
- **Banking**: The ship tilts when turning for realistic flight
- **Camera**: Follows behind the ship like a third-person game

## Automatic Navigation Mode

In automatic mode:
- Click the **Home**, **About**, **Projects**, or **Contact** buttons
- The spaceship will smoothly fly to each section
- Camera follows automatically
- No keyboard input required

## Components

- **Manual Mode**:
  - [AppManual.jsx](src/AppManual.jsx) - Main app with manual controls
  - [SpaceshipManual.jsx](src/components/SpaceshipManual.jsx) - Keyboard-controlled ship
  - [SceneManual.jsx](src/components/SceneManual.jsx) - Third-person camera

- **Automatic Mode**:
  - [App.jsx](src/App.jsx) - Main app with navigation buttons
  - [Spaceship.jsx](src/components/Spaceship.jsx) - Auto-piloted ship
  - [Scene.jsx](src/components/Scene.jsx) - Following camera
