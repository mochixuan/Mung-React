import React from 'react'
import styles from './themepage.scss'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {ThemeItems} from '../../data/const/Constant'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

@inject('themeStore')
@observer
class ThemePage extends React.Component{


    constructor(props) {
        super(props)

        this.state = {
            display: false
        }
    }

    componentDidMount() {
        this.setState({
            display: true
        })
    }

    render() {

        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}

        return (
            <div className={styles.container}>
                <Link to={'/'} className={'iconfont base-small-circle-icon '+styles.back}>&#xeb09;</Link>
                <div className={styles.header} style={themeBgObj}>
                    <div className={'base-title'}>主题颜色</div>
                </div>
                {this.renderGirdItemView()}
            </div>
        )
    }

    renderGirdItemView = (item,index) => {
        return (
            <TransitionGroup className={styles.list}>
                {
                    ThemeItems.map((item,index)=>{
                        return (
                            <CSSTransition
                                key={index+item.name}
                                timeout={300}
                                classNames={'wx-a-scale'}
                                unmountOnExit
                                appear={true}
                            >
                                <div className={styles["list-item"]} style={{backgroundColor: item.color}} onClick={()=>this.props.themeStore.changeThemeColor(index)}>
                                    <div className={styles["list-item-bottom"]} style={{color: item.color}}>{item.name}</div>
                                </div>
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        )
    }

}

export default ThemePage
