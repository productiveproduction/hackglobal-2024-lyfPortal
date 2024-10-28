import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setupIonicReact } from '@ionic/react';
import './main.css';

setupIonicReact();

const reactRoot = document.getElementById('react-root');
createRoot(reactRoot).render(<App />);