import React from 'react'
import styles from './searchpage.scss'
import {inject, observer} from "mobx-react/index";
import {enterListPage, showToast} from "../../utils/Util";
import {NONE} from "../../data/const/Constant";

@inject('themeStore')
@observer
class SearchPage extends React.Component{

    constructor(props) {
        super(props)

        this.recommendItems = [
            '搞笑','爱情','动作','科技',
            '记录','动漫','犯罪','战争'
        ]
    }

    render() {

        const themeColor = this.props.themeStore.themeColor

        return (
            <div className={styles.container}>
                <div className={styles.header} style={{backgroundColor: themeColor}}>
                    <div onClick={this.props.history.goBack} className={'iconfont base-small-circle-icon'}>&#xeb09;</div>
                    <input
                        placeholder={'演员/电影名/类型/关键字'}
                        className={styles["header-input"]}
                        type="text"
                        onKeyUp={this.onKeyUpListener}
                        ref={(input) => this.input = input} />
                    <div className={'iconfont base-small-circle-icon'} onClick={this.search}>&#60158;</div>
                </div>
                <ul className={styles.recommend}>
                    {
                        this.recommendItems.map((item,index)=>{
                            return (
                                <li
                                    onClick={()=>{
                                        this.input.value = item
                                        this.search()
                                    }}
                                    className={styles["recommend-text"]}
                                    key={item+index}
                                >{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    onKeyUpListener = (e) => {
        const evt = window.event || e;
        if (evt.keyCode === 13){
           //回车事件
            this.search()
        }
    }

    search = () => {
        const value = this.input.value
        if (!value || value.length === 0) {
            showToast("请输入数据",NONE)
            return;
        }
        enterListPage(this.props.history,value)
    }

}

export default SearchPage
