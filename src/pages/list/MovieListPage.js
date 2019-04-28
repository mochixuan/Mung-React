import React from 'react'
import styles from './movielistpage.scss'
import {analysisUrl, enterDetailPage} from '../../utils/Util'
import {inject, observer} from "mobx-react/index";
import {renderScrollIndicator} from "../../styles/baseView";
import {ListView, PullToRefresh} from 'antd-mobile'
import {color_e6, color_fc3} from "../../styles/colors";
import ReactStars from 'react-stars'
import ContentLoader from 'react-content-loader'

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
        if (title === params.title) {
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
        const {title,scrollRefreshing,itemsDataSource,items} = this.props.listStore
        let contextView;
        if (items.length === 0) {
            contextView = this.renderLoadingView()
        } else {
            contextView = (
                <ListView
                    id={'list-page-lv'}
                    dataSource={itemsDataSource}
                    renderRow={this.renderItemView}
                    pageSize={4}
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
            )
        }

        return  (
            <div className={styles.container}>
                <div className={styles.header} style={{backgroundColor: themeColor}}>
                    <div onClick={this.props.history.goBack} className={'iconfont base-small-circle-icon '+styles.back}>&#xeb09;</div>
                    <div className={'base-title'}>{title}</div>
                </div>
                {contextView}
            </div>
        )
    }

    renderLoadingView = () => {
        return (
            <div style={{overflow: 'hidden',flex: '1',marginTop: '48px'}}>
                <div style={{borderBottomWidth: '1px',borderBottomColor: '#f0f0f0'}}>
                    <ContentLoader height={'200'}>
                        <rect width={'100%'} height={'100%'}/>
                    </ContentLoader>
                </div>
                <div style={{borderBottomWidth: '1px',borderBottomColor: '#f0f0f0'}}>
                    <ContentLoader height={'200'}>
                        <rect width={'100%'} height={'100%'}/>
                    </ContentLoader>
                </div>
                <div style={{borderBottomWidth: '1px',borderBottomColor: '#f0f0f0'}}>
                    <ContentLoader height={'200'}>
                        <rect width={'100%'} height={'100%'}/>
                    </ContentLoader>
                </div>
                <div style={{borderBottomWidth: '1px',borderBottomColor: '#f0f0f0'}}>
                    <ContentLoader height={'200'}>
                        <rect width={'100%'} height={'100%'}/>
                    </ContentLoader>
                </div>
            </div>
        )
    }

    renderItemView = (item, sectionID, index) => {
        return (
            <div className={styles.item} onClick={()=>{
                enterDetailPage(this.props.history,item.id)
            }}>
                <img className={styles["item-img"]} src={item.large} alt={''}/>
                <div className={styles["item-content"]}>
                    <div className={styles["item-content-title"]}>{item.title}</div>
                    <div className={styles["item-content-text"]}>导演: {(item.directors)}</div>
                    <div className={styles["item-content-text"]}>主演: {item.casts}</div>
                    <div className={styles["item-content-text"]}>{item.year}</div>
                    <div className={styles["item-content-star"]}>
                        <ReactStars
                            count={5}
                            size={14}
                            color1={color_e6}
                            color2={color_fc3}
                            edit={false}
                            value={item.average/2} />
                        <div className={styles["item-content-star-text"]}>{item.average.toFixed(1)}</div>
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
