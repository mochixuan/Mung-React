import React from 'react'
import './mainpage.scss'
import {inject,observer} from 'mobx-react'

// @inject(['themeColor'])
// @observer
class MainPage extends React.Component{

    render() {
        return (
            <div style={{
                color: this.props.themeColor
            }}>abcd</div>
        )
    }

}

export default MainPage
