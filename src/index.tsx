import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const RootElement = document.getElementById('root')!;

const root = ReactDOM.createRoot(RootElement);
root.render(

    <FluentProvider theme={webLightTheme}>
        <App />
    </FluentProvider>
        // <React.StrictMode>
        //     <App />
        // </React.StrictMode>

);


