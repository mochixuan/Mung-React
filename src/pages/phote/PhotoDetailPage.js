import React from 'react'
import styles from './photodetailpage.scss'
import {inject, observer} from "mobx-react/index";
import {Carousel, WingBlank} from 'antd-mobile'
import {LOAD_ERROR} from "../../data/const/Constant";
import {requestMoviePhotos} from "../../data/net/HttpMovie";
import {CODE_SUCCESS} from "../../data/net/HttpBase";
import {showToast} from "../../utils/Util";

@inject('themeStore')
@observer
class PhotoDetailPage extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            photoItems: [],
            curIndex: 0
        }

        this.movieId = this.props.match.params.id
    }

    componentDidMount() {
        requestMoviePhotos(this.movieId,50)
            .then((result)=>{
                if (result.code === CODE_SUCCESS) {
                    this.setState({
                        curIndex: 1,
                        photoItems: result.photos
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                }
            })
    }

    render() {

        const themeBgObj = {backgroundColor: this.props.themeStore.themeColor}

        return (
            <div className={styles.container}>
                <div className={styles.header} style={themeBgObj}>
                    <div onClick={()=> {this.props.history.goBack()}} className={'iconfont base-small-circle-icon'}>&#xeb09;</div>
                    <div className={'base-title'}>{this.state.curIndex+'/'+this.state.photoItems.length}</div>
                </div>
                <WingBlank className={styles.banner}>
                    <Carousel
                        autoplay={false}
                        infinite={false}
                        dots={false}
                        afterChange={this.setBannerIndex}
                    >
                        {this.renderBannerView()}
                    </Carousel>
                </WingBlank>
            </div>
        )
    }

    renderBannerView = () => {
        if (this.state.photoItems.length === 0) {
            return null
        } else {
            return this.state.photoItems.map((item,index)=>{
                return (
                    <div key={index+''} className={styles["banner-item"]}>
                        <img
                            alt={''}
                            src={item.image}
                            className={styles["banner-item-img"]}/>
                    </div>
                )
            })
        }
    }

    setBannerIndex = (index) => {
        this.setState({
            curIndex: index+1
        })
    }

}

export default PhotoDetailPage
