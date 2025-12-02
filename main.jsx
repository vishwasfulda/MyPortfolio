import React, { useState } from 'react';
// 1. IMPORT REACTDOM (REQUIRED TO MOUNT THE APP)
import ReactDOM from 'react-dom/client'; 
import Portfolio from './portfolio.jsx'; 
import Simple3DViewer from './Simple3DViewer.jsx'; 
import Calculator from './Calculator.jsx'; 

// Include the CSS import assumed by a standard React setup
import './index.css'; 


/**
 * Main application component (the Router).
 */
const AppRouter = () => {
    // State to hold the current view/route (e.g., 'portfolio', '3d-viewer', 'calculator')
    const [currentView, setCurrentView] = useState('portfolio');

    // Function passed down to Portfolio component to handle internal navigation
    const navigate = (viewId) => {
        setCurrentView(viewId);
        // Scroll back to the top when navigating to a new view
        window.scrollTo(0, 0); 
    };

    // Render the correct component based on the current view state
    const renderView = () => {
        switch (currentView) {
            case 'portfolio':
                // Pass the navigate function down to the Portfolio component
                return <Portfolio navigate={navigate} />;
            
            case '3d-viewer':
                return (
                    <div className="h-screen flex flex-col">
                        <header className="p-4 bg-zinc-900 border-b border-teal-500/50 text-white shadow-lg flex items-center">
                            <button 
                                onClick={() => navigate('portfolio')} 
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors font-medium mr-4"
                            >
                                ← Back to Portfolio
                            </button>
                            <h1 className="text-2xl font-bold text-teal-400">Simple 3D Viewer Demo</h1>
                        </header>
                        <main className="flex-grow">
                            {/* Renders the full-screen 3D viewer component */}
                            <Simple3DViewer />
                        </main>
                    </div>
                );

            case 'calculator':
                return (
                    <div className="h-screen flex flex-col">
                        <header className="p-4 bg-zinc-900 border-b border-teal-500/50 text-white shadow-lg flex items-center">
                            <button 
                                onClick={() => navigate('portfolio')} 
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors font-medium mr-4"
                            >
                                ← Back to Portfolio
                            </button>
                            <h1 className="text-2xl font-bold text-teal-400">React Calculator App</h1>
                        </header>
                        <main className="flex-grow flex items-center justify-center bg-zinc-950">
                            <Calculator /> 
                        </main>
                    </div>
                );

            default:
                return <Portfolio navigate={navigate} />;
        }
    };

    return (
        <div id="app-root">
            {renderView()}
        </div>
    );
};

// 2. BOOTSTRAP: This section connects the React AppRouter component to the HTML DOM.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);