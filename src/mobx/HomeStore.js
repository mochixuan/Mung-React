import {observable,action,runInAction} from 'mobx'
import {requestMovieHot} from '../data/net/HttpMovie'
import {CODE_SUCCESS} from "../data/net/HttpBase";
import {LOAD_ERROR, NONE} from "../data/const/Constant";
import {showToast} from "../utils/Util";

const ONCE_REQUEST_COUNT = 20
/**
 * 数据放这里是为了实现回退在原来位置
 */
export default class HomeStore {

    @observable hotMovieItems = []

    @observable scrollRefreshing = false
    @observable bannerIndex = 0
    @observable curPage = 0
    @observable totalPage = -1

    @action setHotMovieItems = (hotMovieItems) => {
        this.hotMovieItems = hotMovieItems
    }

    @action setScrollRefreshing = (scrollRefreshing) => {
        this.scrollRefreshing = scrollRefreshing
    }

    @action setBannerIndex = (bannerIndex) => {
        this.bannerIndex = bannerIndex
    }

    @action requestData = () => {

        if (this.hotMovieItems.length > 0) {
            this.setScrollRefreshing(true)
        }

        if (this.totalPage >= 0 && this.totalPage <= this.curPage) {
            this.setScrollRefreshing(false)
            showToast("没有数据了亲!",NONE)
            return
        }

        // 豆瓣API有问题
        requestMovieHot(this.curPage+1,ONCE_REQUEST_COUNT)
            .then((result)=>{
                if (result.code === CODE_SUCCESS && result.subjects) {
                    runInAction(()=>{
                        this.curPage = result.start
                        this.totalPage = result.total
                        this.scrollRefreshing = false
                        this.hotMovieItems = [...this.hotMovieItems,...result.subjects]
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)

                    runInAction(()=>{
                        this.scrollRefreshing = false
                    })
                }
            })
    }

}
