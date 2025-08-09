import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Your main CSS file (Tailwind imports go here)

// Wrap App with BrowserRouter for client-side routing
import { BrowserRouter } from 'react-router-dom';

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);