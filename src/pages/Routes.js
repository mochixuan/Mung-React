import React from 'react'
import {Route,Switch,withRouter} from 'react-router-dom'
import MainPage from './main/MainPage'
import ThemePage from "./theme/ThemePage";
import DetailPage from "./detail/DetailPage";

@withRouter
class Routes extends React.Component{

    render() {

        return (
            <Switch>
                <Route exact path={'/'} component={MainPage}/>
                <Route path={'/theme'} component={ThemePage}/>
                <Route path={'/detail/:id'} component={DetailPage}/>
            </Switch>
        )
    }
}



export default Routes
