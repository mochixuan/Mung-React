import {action, observable, runInAction,computed} from 'mobx'
import {requestMovieDetail, requestMovieDiscuss, requestMoviePhotos} from '../data/net/HttpMovie'
import {CODE_SUCCESS} from "../data/net/HttpBase";
import {LOAD_ERROR, LOAD_SUCCESS, LOADING, NONE} from "../data/const/Constant";
import {showToast} from "../utils/Util";
import {ListView} from 'antd-mobile'

/**
 * 数据放这里是为了实现回退在原来位置
 */
export default class DetailStore {

    @observable headerOpacity = 0;
    @observable baseData = null
    @observable isOpenIntro = false
    @observable sectionStills = null
    @observable sectionStillsState = NONE
    @observable scrollRefreshing = false
    @observable curPage = 0
    @observable totalPage = -1
    @observable discussItems = []
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    @computed get discussDataSource() {
        return this.ds.cloneWithRows(this.discussItems.slice())
    }

    //为了实现返回时界面不重新加载功能
    @action initData = () => {
        this.headerOpacity = 0;
        this.baseData = null
        this.isOpenIntro = false
        this.sectionStills = null
        this.sectionStillsState = NONE
        this.scrollRefreshing = false
        this.curPage = 0
        this.totalPage = -1
        this.discussItems = []
    }

    @action requestDetailBaseData = (id) => {
        requestMovieDetail(id)
            .then((result)=>{
                if (result.code === CODE_SUCCESS) {
                    runInAction(()=>{
                        this.baseData = result
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                }
            })
    }

    @action requestDetailBaseData = (id) => {
        requestMovieDetail(id)
            .then((result)=>{
                if (result.code === CODE_SUCCESS) {
                    runInAction(()=>{
                        this.baseData = result
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                }
            })
    }

    @action requestMovieStills= (id,count) => {
        this.sectionStillsState = LOADING
        requestMoviePhotos(id,count)
            .then((result)=>{
                if (result.code === CODE_SUCCESS) {
                    runInAction(()=>{
                        this.sectionStillsState = LOAD_SUCCESS
                        this.sectionStills = result
                    })
                } else {
                    runInAction(()=>{
                        this.sectionStillsState = LOAD_ERROR
                    })
                    showToast(result.error,LOAD_ERROR)
                }
            })
    }

    @action openIntro = () => {
        this.isOpenIntro = true;
    }

    @action requestMovieDiscuss = (id) => {

        this.scrollRefreshing = true

        if (this.totalPage >= 0 && this.totalPage <= this.curPage) {
            this.scrollRefreshing = false
            showToast("没有数据了亲!",NONE)
            return
        }

        requestMovieDiscuss(id,this.curPage+1,8)
            .then((result)=>{
                if (result.code === CODE_SUCCESS && result.comments) {
                    runInAction(()=>{
                        this.curPage = result.start
                        this.totalPage = result.total
                        this.scrollRefreshing = false
                        this.discussItems = [...this.discussItems,...result.comments]
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                    runInAction(()=>{
                        this.scrollRefreshing = false
                    })
                }
            })
    }

    @action changeHeaderOpacity = (opacity) => {
        if (opacity !== this.headerOpacity) {
            this.headerOpacity = opacity
        }
    }

}
