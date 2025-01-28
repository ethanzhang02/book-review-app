import React from 'react'; // Correct way to import React
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App.jsx'; // Adjust the path if needed

createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Correct usage of React.StrictMode */}
    <App />
  </React.StrictMode>,
);
