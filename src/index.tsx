import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const RootElement = document.getElementById('root')!;

const root = ReactDOM.createRoot(RootElement);
root.render(

        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>

);


