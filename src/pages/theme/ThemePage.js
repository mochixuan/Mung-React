import React from 'react'
import styles from './themepage.scss'
import {observer,inject} from 'mobx-react'
import {Link} from 'react-router-dom'

@inject('themeStore')
@observer
class ThemePage extends React.Component{
    render() {

        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}

        return (
            <div className={styles.container}>
                <div className={styles.header} style={themeBgObj}>
                    <Link to={'/'} className={'iconfont base-small-circle-icon'}>&#xeb09;</Link>
                    <div className={'base-title'}>主题颜色</div>
                </div>
            </div>
        )
    }
}

export default ThemePage
