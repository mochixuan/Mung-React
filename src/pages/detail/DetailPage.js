import React from 'react'
import styles from './detailpage.scss'
import {inject, observer} from "mobx-react/index";
import {Link} from 'react-router-dom'
import $ from 'jquery'
import ReactStars from 'react-stars'
import {color_e6, color_fc3} from "../../styles/colors";


@inject('themeStore','detailStore')
@observer
class DetailPage extends React.Component{

    componentDidMount() {
        // css方式实现渐变，内联样式不行
        const themeColor = this.props.themeStore.themeColor
        $("#detail-page-header").css("background",`linear-gradient(to bottom, ${themeColor}, white)`)

        //请求基本数据
        this.props.detailStore.requestDetailBaseData(this.props.match.params.id)
    }

    render() {

        const baseData = this.props.detailStore.baseData
        const themeColor = this.props.themeStore.themeColor

        return (
            <div className={styles.container}>
                <div className={styles["header-fixed"]}>
                    <Link to={'/'} className={'iconfont base-small-circle-icon '+styles.back}>&#xeb09;</Link>
                </div>
                <div className={styles.header} id={'detail-page-header'}>
                    <img
                        src={baseData ? baseData.images.large : null}
                        className={styles["header-img"]}/>
                </div>
                {this.renderContentView()}
            </div>
        )
    }

    renderContentView = () => {
        const {baseData,isOpen,openIntro} = this.props.detailStore
        if (baseData == null) return null

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
                    <p className={styles["content-intro-desc"]}>{baseData.summary}</p>
                    <div onClick={openIntro}>展开</div>
                </div>
            </div>
        )
    }

}

export default DetailPage
