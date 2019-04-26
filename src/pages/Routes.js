import React from 'react'
import {Route,Switch,withRouter} from 'react-router-dom'
import MainPage from './main/MainPage'
import ThemePage from "./theme/ThemePage";
import DetailPage from "./detail/DetailPage";
import PhotoDetailPage from './phote/PhotoDetailPage'
import MovieListPage from './list/MovieListPage'
import SearchPage from './search/SearchPage'

@withRouter
class Routes extends React.Component{

    render() {

        return (
            <Switch>
                <Route exact path={'/'} component={MainPage}/>
                <Route path={'/theme'} component={ThemePage}/>
                <Route path={'/detail/:id'} component={DetailPage}/>
                <Route path={'/photo/:id'} component={PhotoDetailPage}/>
                <Route path={'/list'} component={MovieListPage}/>
                <Route path={'/search'} component={SearchPage}/>
            </Switch>
        )
    }
}



export default Routes
