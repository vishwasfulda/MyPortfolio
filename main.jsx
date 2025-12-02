import React, { useState, useEffect } from 'react'; // ADDED useEffect
import ReactDOM from 'react-dom/client'; 
// Enforcing .jsx extensions on all local imports based on file structure:
import Portfolio from './portfolio.jsx'; 
import Simple3DViewer from './Simple3DViewer.jsx'; 
import Calculator from './Calculator.jsx'; 
import WeatherDashboard from './WeatherDashboard.jsx'; 

// Assuming you have global styles defined here
import './index.css'; 


/**
 * Main application component (the Router).
 * This component manages the state of the current view and renders the appropriate component.
 */
const AppRouter = () => {
    // State to hold the current view/route (e.g., 'portfolio', '3d-viewer', 'calculator', 'weather-dashboard')
    const [currentView, setCurrentView] = useState('portfolio');

    // EFFECT TO DYNAMICALLY UPDATE THE BROWSER TITLE
    useEffect(() => {
        let title = "Vishwas Chhetri | Portfolio"; // Default title for the main page

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
                // Keep the default title
        }

        // Sets the title that appears in the browser tab
        document.title = title; 
    }, [currentView]); // Re-run effect whenever the view changes

    // Function passed down to Portfolio component to handle internal navigation
    const navigate = (viewId) => {
        setCurrentView(viewId);
        // Scroll back to the top when navigating to a new view
        window.scrollTo(0, 0); 
    };

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
                // Default view: Portfolio page
                return <Portfolio navigate={navigate} />;
            
            case '3d-viewer':
                // Route for the Simple 3D Viewer project
                return (
                    <div className="h-screen flex flex-col">
                        <ProjectHeader title="Simple 3D Viewer Demo" />
                        <main className="flex-grow">
                            <Simple3DViewer />
                        </main>
                    </div>
                );

            case 'calculator':
                // Route for the Calculator project
                return (
                    <div className="h-screen flex flex-col">
                        <ProjectHeader title="React Calculator App" />
                        <main className="flex-grow flex items-center justify-center bg-zinc-950">
                            <Calculator /> 
                        </main>
                    </div>
                );
            
            case 'weather-dashboard':
                // Route for the Weather Dashboard project
                return (
                    <div className="min-h-screen flex flex-col">
                         <ProjectHeader title="Cloud-Deployed Weather Dashboard" />
                        <main className="flex-grow">
                            <WeatherDashboard />
                        </main>
                    </div>
                );

            default:
                // Fallback to the Portfolio page
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
} else {
    // This is a safety mechanism. If this runs, the problem is definitely in index.html.
    console.error("Failed to find the root element. Ensure your index.html contains: <div id='root'></div>");
}