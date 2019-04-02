import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Routes from "./pages/Routes";

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.unregister();
