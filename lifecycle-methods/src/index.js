import React from 'react';
import { ReactDOM } from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorkers from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkers.unregister();