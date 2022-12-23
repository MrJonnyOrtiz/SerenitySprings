import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <React.StrictMode>
      <Router>
         <ThemeProvider theme={theme}>
            <App />
         </ThemeProvider>
      </Router>
   </React.StrictMode>
);
