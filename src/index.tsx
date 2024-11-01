import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const RootElement = document.getElementById('root')!;

const root = ReactDOM.createRoot(RootElement);
root.render(

        <React.StrictMode>
            <App />
        </React.StrictMode>

);


