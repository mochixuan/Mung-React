import React from "react";
import store from "./mobx";
import {Provider} from 'mobx-react'
import {BrowserRouter} from 'react-router-dom'
import Routes from './pages/router/Routes'

class App extends React.Component{
    render() {
        return (
            <Provider {...store}>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App
