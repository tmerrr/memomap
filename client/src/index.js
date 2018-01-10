import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './component/App';
import Map from './component/Map';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Map />, document.getElementById('root'));
registerServiceWorker();
