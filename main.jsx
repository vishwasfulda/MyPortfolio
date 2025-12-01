import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Portfolio from './portfolio.jsx';
import Calculator from './Calculator.jsx';
import './index.css'; 

// Component to handle navigation state
const AppRouter = () => {
  // 'view' state manages which component is currently rendered: 
  // 'portfolio' (default) or the project ID (e.g., 'calculator')
  const [view, setView] = useState('portfolio');

  // Function to change the view state
  const navigate = (newView) => {
    setView(newView);
  };

  // Render the component based on the current view state
  let componentToRender;
  
  switch (view) {
    case 'calculator':
      componentToRender = <Calculator navigate={navigate} />;
      break;
    case 'portfolio':
    default:
      // Pass the navigate function to the Portfolio component so it can switch views
      componentToRender = <Portfolio navigate={navigate} />;
      break;
  }

  return componentToRender;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);