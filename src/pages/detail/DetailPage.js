import React from 'react'
import styles from './detailpage.scss'
import {inject, observer} from "mobx-react/index";
import {Link} from 'react-router-dom'
import $ from 'jquery'
import ReactStars from 'react-stars'
import {color_e6, color_fc3} from "../../styles/colors";
import {renderCommonIndicator, renderReloadingView, renderScrollIndicator} from '../../styles/baseView'
import {LOAD_ERROR, LOAD_SUCCESS, LOADING} from "../../data/const/Constant";
import {PullToRefresh,ListView} from 'antd-mobile'

const SECTION_FILMMAKER_COUNT = 6

const scrollStyles = {
    height: document.documentElement.clientHeight,
    overflow: 'auto'
}
let DetailPageScrollTop = 0
let movieId = null;

@inject('themeStore','detailStore')
@observer
class DetailPage extends React.Component{

    componentWillMount() {
        const newMovieId = this.props.match.params.id;
        // 是否需要重置
        if (newMovieId == null || movieId != newMovieId) {
            movieId = newMovieId
            DetailPageScrollTop = 0
            this.props.detailStore.initData() //新页面，主要是为了返回是恢复到原来的位置
        }
    }

    componentDidMount() {
        // css方式实现渐变，内联样式不行
        const themeColor = this.props.themeStore.themeColor
        $("#detail-page-header").css("background",`linear-gradient(to bottom, ${themeColor}, white)`)



        const {requestDetailBaseData,requestMovieStills,requestMovieDiscuss,baseData} = this.props.detailStore
        //初始化请求
        if (!baseData) {
            requestDetailBaseData(movieId) //请求基本数据
            requestMovieStills(movieId,SECTION_FILMMAKER_COUNT) //获取电影剧照
            requestMovieDiscuss(movieId)

            window.addEventListener('scroll', this.handleScroll);
            const ptfElement = document.getElementById("detail-page-lv");
            if (ptfElement) {
                ptfElement.scrollTop = DetailPageScrollTop;
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleScroll)
    }

    handleScroll = () => {
        const scrollY = window.scrollY
        if (scrollY < 220) {
            const changeHeaderOpacity = this.props.detailStore.changeHeaderOpacity
            changeHeaderOpacity(scrollY <= 200 ? scrollY/200 : 1)
        }
    }

    render() {

        const {baseData,scrollRefreshing,discussDataSource,headerOpacity} = this.props.detailStore
        const themeColor = this.props.themeStore.themeColor

        return (
            <div className={styles.container}>
                <div className={styles["header-fixed"]} style={{backgroundColor: themeColor,opacity: headerOpacity}}>
                    <div className={styles["header-fixed-title"]}>{baseData ? baseData.title : ''}</div>
                </div>
                <div className={styles["header-fixed"]}>
                    <Link to={'/'} className={'iconfont base-small-circle-icon '+styles.back}>&#xeb09;</Link>
                </div>
                <div className={styles.header} id={'detail-page-header'}>
                    <img
                        src={baseData ? baseData.images.large : null}
                        className={styles["header-img"]}/>
                </div>
                {this.renderContentView()}
                <ListView
                    id={'detail-page-lv'}
                    dataSource={discussDataSource}
                    renderRow={this.renderDiscussView}
                    pageSize={6}
                    useBodyScroll
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

    renderContentView = () => {
        const {
            baseData,isOpenIntro,openIntro,
            sectionStills,sectionStillsState,
            requestMovieStills
        } = this.props.detailStore
        const themeColor = this.props.themeStore.themeColor

        if (baseData == null) return null

        let stillsView = null
        let stillsBgColor = '#f5f5f5'
        switch (sectionStillsState) {
            case LOADING:
                stillsView = renderCommonIndicator(themeColor,true)
                stillsBgColor = '#9D9D9D'
                break
            case LOAD_SUCCESS:
                const stillPhones = sectionStills.photos;
                stillsView = stillPhones.map((item,index)=>{
                    if (stillPhones.length-1 === index) {
                        return (
                            <div key={item.image+index} onClick={this.enterPhotoDetailPage}>
                                <div className={styles["content-stills-more"]}>
                                    <span className={styles["content-stills-more-text"]}>全部剧照</span>
                                    <div className={styles["content-stills-more-line"]}/>
                                    <span className={styles["content-stills-more-text"]}>{item.photos_count}张</span>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={item.image+index}>
                                <img
                                    src={item.image}
                                    className={styles["content-stills-swipe-img"]}/>
                            </div>
                        )
                    }
                })
                break
            case LOAD_ERROR:
                const reLoadPhotos = () => {
                    requestMovieStills(movieId,SECTION_FILMMAKER_COUNT) //获取电影剧照
                }
                stillsView = renderReloadingView(themeColor,true,reLoadPhotos)
                stillsBgColor = '#9D9D9D'
                break
        }

        return (
            <div className={styles.content}>
                <div className={styles["content-desc"]}>
                    <div className={styles["content-desc-info"]}>
                        <div className={styles["content-desc-info-left"]}>
                            <div className={styles["content-desc-info-left-title"]}>{baseData.title}</div>
                            <div className={styles["content-desc-info-left-text"]}>{baseData.year}/{baseData.genres.join('/')}</div>
                            <div className={styles["content-desc-info-left-text"]}>原名: {baseData.original_title}</div>
                            <div className={styles["content-desc-info-left-text"]}>导演: {baseData.directors[0]!=null ? baseData.directors[0].name : "未知"}</div>
                            <div className={styles["content-desc-info-left-text"]}>主演: {baseData.casts.map((data,i)=>data.name).join(' ')}</div>
                        </div>
                        <div className={styles["content-desc-info-right"]}>
                            <div className={styles["content-desc-info-right-desc"]}>综合评分</div>
                            <div className={styles["content-desc-info-right-score"]}>{baseData.rating.average}</div>
                            <ReactStars
                                count={5}
                                size={14}
                                color1={color_e6}
                                color2={color_fc3}
                                edit={false}
                                value={baseData.rating.average/2} />
                            <div className={styles["content-desc-info-right-desc"]}>{baseData.ratings_count == 0 ? '暂无评论' : baseData.ratings_count+'人'}</div>
                        </div>
                    </div>
                    <div className={styles["content-desc-star"]}>
                        <div className={styles["content-desc-star-tag"]}>我来评分</div>
                        <ReactStars
                            count={5}
                            size={20}
                            color1={color_e6}
                            color2={color_fc3}
                            edit={true} />
                    </div>
                </div>
                <div className={styles["content-intro"]}>
                    <div className={styles["content-intro-tag"]}>简介</div>
                    <div className={styles["content-intro-desc-swipe"]}>
                        <p className={styles["content-intro-desc"]} style={isOpenIntro ? {} : {
                            height: '96px'
                        }}>{baseData.summary}</p>
                        <div
                            style={{color: themeColor,display: isOpenIntro ? 'none' : 'block'}}
                            className={styles["content-intro-open"]}
                            onClick={openIntro}>展开</div>
                    </div>
                </div>
                <div className={styles["content-filmmaker"]}>
                    <div className={styles["content-filmmaker-tag"]}>影人</div>
                    <div className={styles["content-filmmaker-swipe"]}>
                        {
                            baseData.casts.map((item,index)=>{
                                return (
                                    <div key={index+''} className={styles["content-filmmaker-item"]}>
                                        <img src={item.avatars.large} className={styles["content-filmmaker-item-img"]}/>
                                        <div className={styles["content-filmmaker-item-text"]}>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles["content-stills"]}>
                    <div className={styles["content-stills-tag"]}>剧照</div>
                    <div className={styles["content-stills-swipe"]} style={{backgroundColor: stillsBgColor}}>
                        {stillsView}
                    </div>
                </div>
                <div className={styles["content-comment"]}>
                    评论区
                </div>
            </div>
        )
    }

    renderDiscussView = (item, sectionID, index) => {
        const themeColor = this.props.themeStore.themeColor
        return (
            <div className={styles["discuss-item"]}>
                <img
                    style={{borderColor: themeColor}}
                    className={styles["discuss-item-icon"]}
                    src={item.author.avatar}/>
                <div className={styles["discuss-item-content"]}>
                    <div className={styles["discuss-item-content-top"]}>
                        <div className={styles["discuss-item-content-top-one"]}>{item.author.name}</div>
                        <ReactStars
                            count={5}
                            size={14}
                            color1={color_e6}
                            color2={color_fc3}
                            edit={false}
                            value={item.rating.value/2} />
                        <div className={styles["discuss-item-content-top-two"]}>
                            <i className={'iconfont'} style={{color:themeColor,fontSize: 14}}>&#59303;</i>
                            <div className={styles["discuss-item-content-top-two-text"]}>{item.useful_count}</div>
                        </div>
                    </div>
                    <div className={styles["discuss-item-content-desc"]}>{item.content}</div>
                    <div className={styles["discuss-item-content-time"]}>{item.created_at}</div>
                </div>
            </div>
        )
    }

    onScrollRefresh = () => {
        this.props.detailStore.requestMovieDiscuss(movieId)
    }

    enterPhotoDetailPage = () => {
        this.props.history.push(`/photo/${movieId}`)
    }

}

export default DetailPage
