import React from 'react'
import MainPage from './main/MainPage'
import {Provider} from 'mobx-react'
import store from '../mobx/index'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

export default class Routes extends React.Component {
    render() {
        return (
            <Provider {...store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'} component={MainPage}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
