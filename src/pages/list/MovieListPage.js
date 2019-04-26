import React from 'react'
import styles from './movielistpage.scss'
import {analysisUrl, enterDetailPage} from '../../utils/Util'
import {inject, observer} from "mobx-react/index";
import {renderScrollIndicator} from "../../styles/baseView";
import {ListView, PullToRefresh} from 'antd-mobile'
import {color_e6, color_fc3} from "../../styles/colors";
import ReactStars from 'react-stars'

const scrollStyles = {
    height: document.documentElement.clientHeight - 48,
    overflow: 'auto'
}
let ListPageScrollTop = 0
let isReInit = false

@inject('themeStore','listStore')
@observer
class MovieListPage extends React.Component{

    componentWillMount() {
        const params = analysisUrl(this.props.location.search)
        const {title,initData} = this.props.listStore
        if (title == params.title) {
            isReInit = false
        } else {
            isReInit = true
            initData(params.title)
        }

    }

    componentDidMount() {
        // 新进来的
        if (isReInit) {
            this.onScrollRefresh()
            // 2. 实现滑动到原来位置: 两步
            const lvElement = document.getElementById("list-page-lv");
            if (lvElement) {
                lvElement.scrollTop = ListPageScrollTop;
            }
        }
    }

    componentWillUnmount() {
        // 1. 实现滑动到原来位置: 两步
        const lvElement = document.getElementById("list-page-lv");
        if (lvElement) {
            ListPageScrollTop = lvElement.scrollTop;
        }
    }

    render() {
        const themeColor = this.props.themeStore.themeColor
        const {title,scrollRefreshing,itemsDataSource} = this.props.listStore

        return  (
            <div className={styles.container}>
                <div className={styles.header} style={{backgroundColor: themeColor}}>
                    <div onClick={this.props.history.goBack} className={'iconfont base-small-circle-icon '+styles.back}>&#xeb09;</div>
                    <div className={'base-title'}>{title}</div>
                </div>
                <ListView
                    id={'list-page-lv'}
                    dataSource={itemsDataSource}
                    renderRow={this.renderItemView}
                    pageSize={6}
                    useBodyScroll
                    className={styles["item-swipe"]}
                    scrollEventThrottle={60}
                    pullToRefresh={
                        <PullToRefresh
                            damping={64}
                            distanceToRefresh={48}
                            style={scrollStyles}
                            indicator={renderScrollIndicator(themeColor)}
                            direction={'up'}
                            refreshing={scrollRefreshing}
                            onRefresh={this.onScrollRefresh}/>
                    }
                />
            </div>
        )
    }

    renderItemView = (item, sectionID, index) => {
        return (
            <div className={styles.item} onClick={()=>{
                enterDetailPage(this.props.history,item.id)
            }}>
                <img className={styles["item-img"]} src={item.images.large}/>
                <div className={styles["item-content"]}>
                    <div className={styles["item-content-title"]}>{item.title}</div>
                    <div className={styles["item-content-text"]}>导演: {(item.directors[0]!=null?item.directors[0].name:"未知")}</div>
                    <div className={styles["item-content-text"]}>主演: {item.casts.map((data,i)=>data.name).join(' ')}</div>
                    <div className={styles["item-content-text"]}>{item.year}</div>
                    <div className={styles["item-content-star"]}>
                        <ReactStars
                            count={5}
                            size={14}
                            color1={color_e6}
                            color2={color_fc3}
                            edit={false}
                            value={item.rating.average/2} />
                        <div className={styles["item-content-star-text"]}>{item.rating.average.toFixed(1)}</div>
                    </div>
                </div>
            </div>
        )
    }

    onScrollRefresh = () => {
        this.props.listStore.requestData()
    }

}


export default MovieListPage
