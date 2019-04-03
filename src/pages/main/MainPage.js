import React from 'react'
import styles from './mainpage.scss'
import {inject,observer} from 'mobx-react'

@inject('themeStore')
@observer
class MainPage extends React.Component{

    render() {
        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}
        return (
            <div className={styles.container}>
                <div className={styles.header} style={themeBgObj}>
                    <div>主题</div>
                    <div className={'base-title'}>Mung</div>
                    <div>搜索</div>
                </div>
            </div>
        )
    }

}

export default MainPage
