import React from 'react'
import styles from './mainpage.scss'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {CateItems} from "../../data/const/Constant";
import {color_66, color_e6, color_f5, color_fc3, color_ff} from "../../styles/colors";
import {Carousel, Grid, PullToRefresh, WingBlank} from 'antd-mobile'
import ReactStars from 'react-stars'
import {renderScrollIndicator} from "../../styles/baseView";
import ContentLoader from 'react-content-loader'
import {enterDetailPage} from '../../utils/Util'

const scrollStyles = {
    height: document.documentElement.clientHeight - 48,
    overflow: 'auto'
}

let MainPageScrollTop = 0

@inject('themeStore','homeStore')
@observer
class MainPage extends React.Component{

    componentWillUnmount() {
        // 1. 实现滑动到原来位置: 两步
        const ptfElement = document.getElementById("main-page-ptf");
        if (ptfElement) {
            MainPageScrollTop = ptfElement.scrollTop;
        }
    }

    componentDidMount() {
        const {hotMovieItems,requestData} = this.props.homeStore
        if (hotMovieItems.length === 0) requestData()

        // 2. 实现滑动到原来位置: 两步
        const ptfElement = document.getElementById("main-page-ptf");
        if (ptfElement && hotMovieItems.length !== 0) {
            ptfElement.scrollTop = MainPageScrollTop;
        }
    }


    render() {

        const {themeColor} = this.props.themeStore
        const {hotMovieItems,scrollRefreshing} = this.props.homeStore

        if (hotMovieItems.length === 0) return this.renderLoadingView()

        const themeBgObj = {backgroundColor: themeColor}
        return (
            <div className={styles.container}>
                <div className={styles.header} style={themeBgObj}>
                    <Link to={'/theme'} className={'iconfont base-small-circle-icon'}>&#60140;</Link>
                    <div className={'base-title'}>Mung</div>
                    <i className={'iconfont base-small-circle-icon'}>&#60158;</i>
                </div>

                <PullToRefresh
                    id={'main-page-ptf'}
                    damping={64}
                    distanceToRefresh={48}
                    style={scrollStyles}
                    indicator={renderScrollIndicator(themeColor)}
                    direction={'up'}
                    refreshing={scrollRefreshing}
                    onRefresh={this.onScrollRefresh}>

                    <WingBlank className={styles.banner} style={themeBgObj}>
                        {this.renderBannerView()}
                    </WingBlank>

                    <div className={styles.cate} style={themeBgObj}>
                        {this.renderCateView()}
                    </div>

                    <div className={styles.list}>
                        <Grid
                            data={hotMovieItems.filter((item,index)=> index>=4)}
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

    renderBannerView = () => {

        const {hotMovieItems, bannerIndex, setBannerIndex} = this.props.homeStore

        // Carousel开始没有数据之后出数据第一层会不动
        if (hotMovieItems.length === 0) {
            return undefined
        }

        const textMarginClass = styles["banner-item-right-margin"]

        const bannerItemsView = hotMovieItems
            .filter((item,index) => index<4)
            .map((item,index)=>{
                return (
                    <div
                        key={item.id+index}
                        className={styles["banner-item"]}
                        onClick={()=>{
                            enterDetailPage(this.props.history,item.id)
                        }}
                    >
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

        const dotItemViews = hotMovieItems
            .filter((item,index) => index < 4)
            .map((item,index)=>{
                const dotColor = {backgroundColor: bannerIndex === index ? color_ff : color_66 }
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
                    afterChange={setBannerIndex}
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
            <div
                className={styles["list-item"]}
                onClick={()=>{
                    enterDetailPage(this.props.history,item.id)
                }}
            >
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
        const {hotMovieItems,requestData} = this.props.homeStore
        // 有数据后才可上拉刷新
        if (hotMovieItems.length > 0) requestData()
    }

}

export default MainPage
