import React from 'react';
import ReactDOM from 'react-dom/client';
import AppHybrid from './AppHybrid';
import './index.css';

// Choose your control mode:
// 'auto' - Click buttons to fly between sections automatically
// 'manual' - Keyboard controls only
// 'hybrid' - Keyboard controls + click planets to auto-fly there
const MODE = 'hybrid';

const apps = {
	hybrid: <AppHybrid />,
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>{apps[MODE]}</React.StrictMode>
);
