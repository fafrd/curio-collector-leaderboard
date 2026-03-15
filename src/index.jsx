import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Footer from './Footer.jsx'

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Footer/>
  </React.StrictMode>
);
