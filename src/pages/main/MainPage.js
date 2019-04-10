import React from 'react'
import styles from './mainpage.scss'
import {inject,observer} from 'mobx-react'
import {requestMovieHot} from '../../data/net/HttpMovie'
import {CODE_SUCCESS} from '../../data/net/HttpBase'
import {showToast} from "../../utils/Util";
import {CateItems, LOAD_ERROR, LOADING, NONE} from "../../data/const/Constant";
import {color_66, color_ff,color_fc3,color_e6,color_f5} from "../../styles/colors";
import {Carousel,WingBlank,Grid,PullToRefresh} from 'antd-mobile'
import ReactStars from 'react-stars'
import {renderScrollIndicator} from "../../styles/baseView";
import ContentLoader, { Facebook } from 'react-content-loader'

const ONCE_REQUEST_COUNT = 20
const scrollStyles = {
    height: document.documentElement.clientHeight - 48,
    overflow: 'auto'
}


@inject('themeStore')
@observer
class MainPage extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            scrollRefreshing: false,
            bannerIndex: 0,
            hotMovieItems: [],
            curPage: 0,
            totalPage: -1,
        }

    }

    componentDidMount() {
        this.onRequestData()
    }

    render() {

        if (this.state.hotMovieItems.length === 0) return this.renderLoadingView()

        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}
        return (
            <div className={styles.container}>
                <div className={styles.header} style={themeBgObj}>
                    <i className={'iconfont base-small-circle-icon'}>&#60140;</i>
                    <div className={'base-title'}>Mung</div>
                    <i className={'iconfont base-small-circle-icon'}>&#60158;</i>
                </div>

                <PullToRefresh
                    damping={64}
                    distanceToRefresh={48}
                    style={scrollStyles}
                    indicator={renderScrollIndicator(this.props.themeStore.themeColor)}
                    direction={'up'}
                    refreshing={this.state.scrollRefreshing}
                    onRefresh={this.onScrollRefresh}>

                    <WingBlank className={styles.banner} style={themeBgObj}>
                        {this.renderBannerView()}
                    </WingBlank>

                    <div className={styles.cate} style={themeBgObj}>
                        {this.renderCateView()}
                    </div>

                    <div className={styles.list}>
                        <Grid
                            data={this.state.hotMovieItems.filter((item,index)=> index>=4)}
                            columnNum={3}
                            hasLine={false}
                            square={false}
                            renderItem={this.renderGirdItemView}
                            itemStyle={{
                                backgroundColor: color_f5
                            }}
                        />
                    </div>

                </PullToRefresh>

            </div>
        )
    }

    renderLoadingView = () => {
        return (
            <div style={{overflow: 'hidden',height: '100vh'}}>
                <div>
                    <ContentLoader height={'48'}>
                        <rect width={'100%'} height={'100%'}/>
                    </ContentLoader>
                </div>
                <div style={{margin: '15px'}}>
                    <ContentLoader height={'200'}>
                        <rect rx={'6'} width="100%" height="100%" />
                    </ContentLoader>
                </div>
                <div style={{marginLeft: '15px',marginRight: '15px'}}>
                    <ContentLoader height={'72'}>
                        <rect rx={'6'} width="100%" height="100%" />
                    </ContentLoader>
                </div>
                <div style={{marginTop: '15px'}}>
                    <ContentLoader height={'200'} >
                        <rect x='1%' rx={'4'} width="32%" height="100%" />
                        <rect x='34%' rx={'4'} width="32%" height="100%" />
                        <rect x='67%' rx={'4'} width="32%" height="100%" />
                    </ContentLoader>
                </div>
                <div style={{marginTop: '5px'}}>
                    <ContentLoader height={'200'} >
                        <rect x='1%' rx={'4'} width="32%" height="100%" />
                        <rect x='34%' rx={'4'} width="32%" height="100%" />
                        <rect x='67%' rx={'4'} width="32%" height="100%" />
                    </ContentLoader>
                </div>
                <div style={{marginTop: '5px'}}>
                    <ContentLoader height={'200'} >
                        <rect x='1%' rx={'4'} width="32%" height="100%" />
                        <rect x='34%' rx={'4'} width="32%" height="100%" />
                        <rect x='67%' rx={'4'} width="32%" height="100%" />
                    </ContentLoader>
                </div>
            </div>
        )
    }

    onSwipeCallBack = (swipeIndex) => {
        this.setState({
            bannerIndex: swipeIndex
        })
    }

    renderBannerView = () => {

        // Carousel开始没有数据之后出数据第一层会不动
        if (this.state.hotMovieItems.length === 0) {
            return undefined
        }

        const textMarginClass = styles["banner-item-right-margin"]

        const bannerItemsView = this.state.hotMovieItems
            .filter((item,index) => index<4)
            .map((item,index)=>{
                return (
                    <div key={item.id+index} className={styles["banner-item"]}>
                        <img
                            src={item.images.large}
                            className={styles["banner-item-icon"]}
                        />
                        <div className={styles["banner-item-right"]}>
                            <div className={`base-white-18 ${textMarginClass}`}>{item.title}</div>
                            <div className={`${styles["banner-item-right-director"]} ${textMarginClass}`}>
                                <img
                                    src={item.directors[0].avatars.small}
                                    className={styles["banner-item-icon"]}
                                />
                                <span>{item.directors[0]!=null?item.directors[0].name:"未知"}</span>
                            </div>
                            <div className={textMarginClass}>主演: {item.casts.map((data,i)=>data.name).join(' ')}</div>
                            <div className={textMarginClass}>{item.collect_count} 看过</div>
                            <div className={`${styles["banner-item-right-star"]} ${textMarginClass}`}>
                                <ReactStars
                                    count={5}
                                    size={14}
                                    color1={color_e6}
                                    color2={color_fc3}
                                    edit={false}
                                    className={styles["banner-item-right-star-view"]}
                                    value={item.rating.average/2} />
                                <span className={styles["banner-item-right-star-text"]} style={{color: color_fc3}}>{item.rating.average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                )
            })

        const dotItemViews = this.state.hotMovieItems
            .filter((item,index) => index < 4)
            .map((item,index)=>{
                const dotColor = {backgroundColor: this.state.bannerIndex === index ? color_ff : color_66 }
                return (
                    <li className={styles["dot-view"]} style={dotColor} key={item.id+index}></li>
                )
            })

        return (
            <React.Fragment>
                <Carousel
                    autoplay={true}
                    infinite={true}
                    dots={false}
                    afterChange={this.onSwipeCallBack}
                >
                    {bannerItemsView}
                </Carousel>
                <ul className={styles["dot-swipe"]}>
                    {dotItemViews}
                </ul>
            </React.Fragment>
        )
    }

    renderCateView = () => {
        const styleClassNames = [
            styles["cate-item-i1"],
            styles["cate-item-i2"],
            styles["cate-item-i3"],
            styles["cate-item-i4"]
        ]
        return CateItems.map((item,index)=>{
            return (
                <div className={styles["cate-item"]} key={item.title+index}>
                    <i className={'iconfont'+" "+styleClassNames[index]}>{item.icon}</i>
                    <span>{item.title}</span>
                </div>
            )
        })
    }

    renderGirdItemView = (item) => {
        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}
        return (
            <div className={styles["list-item"]}>
                <img
                    src={item.images.large}
                    className={styles["list-img"]}
                />
                <div className={styles["list-desc"]} style={themeBgObj}>
                    <span className={styles["list-desc-title"]+' '+'single-line-text'}>{item.title}</span>
                    <div className={styles["list-desc-star"]}>
                        <ReactStars
                            count={5}
                            size={14}
                            color1={color_e6}
                            color2={color_fc3}
                            edit={false}
                            value={item.rating.average/2} />
                        <span style={{color: color_fc3}}>{item.rating.average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        )
    }

    onScrollRefresh = () => {
        // 有数据后才可上拉刷新
        if (this.state.hotMovieItems.length > 0) {
            this.onRequestData()
        }
    }

    onRequestData = () => {

        if (this.state.hotMovieItems.length > 0) {
            this.setState({scrollRefreshing: true})
        }

        if (this.state.totalPage >= 0 && this.state.totalPage <= this.state.curPage) {
            this.setState({scrollRefreshing: false})
            showToast("没有数据了亲!",NONE)
            return
        }

        // 豆瓣API有问题
        requestMovieHot(this.state.curPage+1,ONCE_REQUEST_COUNT)
            .then((result)=>{
                console.warn(result)
                if (result.code === CODE_SUCCESS && result.subjects) {
                    this.setState({
                        curPage: result.start,
                        totalPage: result.total,
                        hotMovieItems: [...this.state.hotMovieItems,...result.subjects],
                        scrollRefreshing: false,
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                    this.setState({scrollRefreshing: false})
                }
            })
    }

}

export default MainPage
