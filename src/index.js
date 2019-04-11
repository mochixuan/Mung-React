import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './data/img/iconfont/iconfont.css'
import * as serviceWorker from './serviceWorker';
import App from "./App";

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
