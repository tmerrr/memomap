import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainApp from './component/App'
import registerServiceWorker from './registerServiceWorker';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import axios from 'axios';


ReactDOM.render(<MainApp />, document.getElementById('root'))
registerServiceWorker();
