import React from 'react';
import ReactDOM from 'react-dom/';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Providers from "./services/Providers";
import './utils/multicall/index';
import {connectorLocalStorageKey} from "./services/constants";

if ('ethereum' in window) {
    (window.ethereum as any).autoRefreshOnNetworkChange = false
}
if(sessionStorage.getItem(connectorLocalStorageKey) !== localStorage.getItem(connectorLocalStorageKey)) {
    localStorage.removeItem(connectorLocalStorageKey);
    sessionStorage.removeItem(connectorLocalStorageKey);
}

ReactDOM.render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
