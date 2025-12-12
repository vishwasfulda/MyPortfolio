import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'; 
import Portfolio from './portfolio.jsx'; 
import Simple3DViewer from './Simple3DViewer.jsx'; 
import Calculator from './Calculator.jsx'; 
import WeatherDashboard from './WeatherDashboard.jsx'; 
// Assuming you have global styles defined here
import './index.css'; 

// --- History Utility Functions ---
// Function to get the current view ID from the URL hash
const getCurrentViewFromHash = () => {
    // We will use the URL hash (e.g., #3d-viewer) for routing
    const hash = window.location.hash.slice(1);
    return hash || 'portfolio';
};

// Function to set the browser history state
const setBrowserHistory = (viewId) => {
    // Updates the URL hash (e.g., #portfolio or #3d-viewer)
    window.history.pushState({ viewId }, "", `#${viewId}`);
};

/**
 * Main application component (the Router).
 */
const AppRouter = () => {
    // State is initialized based on the current URL hash
    const [currentView, setCurrentView] = useState(getCurrentViewFromHash());

    // 1. EFFECT: Listen for browser navigation (Back/Forward buttons)
    useEffect(() => {
        const handlePopState = () => {
            // When the browser history changes (via back/forward), update React state
            setCurrentView(getCurrentViewFromHash());
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup: Remove listener when component unmounts
        return () => window.removeEventListener('popstate', handlePopState);
    }, []); // Run only once on mount

    // 2. EFFECT: Dynamically update the browser title whenever the view changes
    useEffect(() => {
        let title = "Vishwas Chhetri | Portfolio"; 
        switch (currentView) {
            case '3d-viewer':
                title = "Vishwas Chhetri | 3D Viewer Demo";
                break;
            case 'calculator':
                title = "Vishwas Chhetri | Calculator App";
                break;
            case 'weather-dashboard':
                title = "Vishwas Chhetri | Weather Dashboard";
                break;
            default:
        }
        document.title = title; 
    }, [currentView]); 

    // Function passed down to components to handle internal navigation
    const navigate = (viewId) => {
        setCurrentView(viewId);
        setBrowserHistory(viewId); // Update the URL hash
        window.scrollTo(0, 0); 
    };
    
    // Ensure the initial state pushes the correct URL into the history
    useEffect(() => {
        // This ensures if the user lands on the root URL, the hash is set to #portfolio
        if (window.location.hash.slice(1) !== currentView) {
             setBrowserHistory(currentView);
        }
    }, [currentView]);


    // Helper component to render the navigation header for project pages
    const ProjectHeader = ({ title }) => (
        <header className="p-4 bg-zinc-900 border-b border-teal-500/50 text-white shadow-lg flex items-center">
            <button 
                onClick={() => navigate('portfolio')} 
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors font-medium mr-4"
            >
                ← Back to Portfolio
            </button>
            <h1 className="text-2xl font-bold text-teal-400">{title}</h1>
        </header>
    );

    // Render the correct component based on the current view state
    const renderView = () => {
        switch (currentView) {
            case 'portfolio':
                return <Portfolio navigate={navigate} />;
            case '3d-viewer':
                return (
                    <div className="h-screen flex flex-col">
                        <ProjectHeader title="Simple 3D Viewer Demo" />
                        <main className="flex-grow">
                            <Simple3DViewer />
                        </main>
                    </div>
                );
            case 'calculator':
                return (
                    <div className="h-screen flex flex-col">
                        <ProjectHeader title="React Calculator App" />
                        <main className="flex-grow flex items-center justify-center bg-zinc-950">
                            <Calculator /> 
                        </main>
                    </div>
                );
            case 'weather-dashboard':
                return (
                    <div className="min-h-screen flex flex-col">
                         <ProjectHeader title="Cloud-Deployed Weather Dashboard" />
                        <main className="flex-grow">
                            <WeatherDashboard />
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

// BOOTSTRAP: This section connects the AppRouter component to the HTML DOM.
// It assumes your index.html has a root div: <div id="root"></div>
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <AppRouter />
        </React.StrictMode>
    );
}