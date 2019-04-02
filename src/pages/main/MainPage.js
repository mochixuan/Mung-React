import React from 'react'
import './mainpage.scss'
import {inject,observer} from 'mobx-react'

@inject('themeStore')
@observer
class MainPage extends React.Component{

    render() {
        return (
            <div style={{backgroundColor: this.props.themeStore.themeColor}}>abcd</div>
        )
    }

}

export default MainPage
