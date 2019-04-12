import React from 'react'
import {Route,Switch,withRouter} from 'react-router-dom'
import MainPage from '../main/MainPage'
import ThemePage from "../theme/ThemePage";
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import './router.css'

@withRouter
class Routes extends React.Component{

    render() {

        return (
            <Switch>
                <Route exact path={'/'} component={MainPage}/>
                <Route path={'/theme'} component={ThemePage}/>
            </Switch>
        )

        const location = this.props.location

        return (
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames={'router'}
                    timeout={3000}
                    appear={true}
                >
                    <Switch>
                        <Route exact path={'/'} component={MainPage}/>
                        <Route path={'/theme'} component={ThemePage}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}



export default Routes
