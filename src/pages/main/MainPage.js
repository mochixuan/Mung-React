import React from 'react'
import styles from './mainpage.scss'
import {inject,observer} from 'mobx-react'
import ReactSwipe from 'react-swipe'
//import {BaseGetRequest} from '../../data/net/HttpBase'

@inject('themeStore')
@observer
class MainPage extends React.Component{

    constructor(props) {
        super(props)

        //初始化swipeOpt
        this.swipeOptions = {
            auto: 3000,
            callback: this.onSwipeCallBack,
        }

        this.state = {
            text: 'asas'
        }

    }

    componentDidMount() {
        fetch("https://api.douban.com/v2/movie/in_theaters?start=1&count=10",{
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response)=>response.json())
            .then((result)=>{
                console.warn('result',result)
                this.setState({text: 'success'})
            }).catch((error)=>{
                console.warn('error',error)
                this.setState({text: 'error'})
            })
    }

    render() {
        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}
        return (
            <div className={styles.container}>

                <div className={styles.header} style={themeBgObj}>
                    <i className={'iconfont base-small-circle-icon'}>&#60140;</i>
                    <div className={'base-title'}>Mung</div>
                    <i className={'iconfont base-small-circle-icon'}>&#60158;</i>
                </div>

                <div className={styles.banner} style={themeBgObj}>
                    <ReactSwipe swipeOptions={this.swipeOptions}>
                        {this.renderSwipeItemView()}
                    </ReactSwipe>
                </div>

                <div>{this.state.text}</div>

            </div>
        )
    }

    onSwipeCallBack(swipeIndex) {

    }

    renderSwipeItemView() {
        return (
            <div>dadada</div>
        )
    }

}

export default MainPage
