import {observable,action,computed} from 'mobx'
import {ListView} from "antd-mobile/lib/index";
import {requestListMovie,BASE_URL} from '../data/net/HttpMovie'
import {LOAD_ERROR, CateItems, NONE} from "../data/const/Constant";
import {showToast} from "../utils/Util";
import {CODE_SUCCESS} from "../data/net/HttpBase";
import {runInAction} from "mobx/lib/mobx";

export default class ListStore {

    @observable title = ''
    @observable scrollRefreshing = false
    @observable curPage = 0
    @observable totalPage = -1
    @observable items = []

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    @action initData = (title) => {
        this.title = title
        this.scrollRefreshing = false
        this.curPage = 0
        this.totalPage = -1
        this.items = []
    }

    @action requestData = () => {
        if (!this.title || this.title.length === 0) {
            showToast("数据错误,请重新刷新！",LOAD_ERROR)
            return
        }

        if (this.totalPage >= 0 && this.totalPage <= this.curPage) {
            this.scrollRefreshing = false
            showToast("没有数据了亲!",NONE)
            return
        }
        let url = "";
        switch (this.title) {
            case CateItems[0].title:
                url=BASE_URL+"/movie/top250"
                break
            case CateItems[1].title:
                url=BASE_URL+"/movie/weekly"
                break
            case CateItems[2].title:
                url=BASE_URL+"/movie/us_box"
                break
            case CateItems[3].title:
                url=BASE_URL+"/movie/new_movies"
                break
            default:
                url=BASE_URL+"/movie/search"
                break
        }

        requestListMovie(url,this.curPage+1,16,this.title)
            .then((result)=>{
                if (result.code === CODE_SUCCESS && result.subjects) {
                    runInAction(()=>{
                        // Mobx内部有问题，把无用数据剔除也算优化下吧
                        const subjects = result.subjects.map((item,index)=>{
                            const newItem = {}

                            if (item.subject) item = item.subject

                            newItem.large = item.images.large
                            newItem.title = item.title
                            newItem.directors = item.directors[0] != null ? item.directors[0].name:"未知"
                            newItem.casts = item.casts.map((data,i)=>data.name).join(' ')
                            newItem.year = item.year
                            newItem.average = item.rating.average
                            return newItem
                        })
                        this.items = [...this.items,...subjects]
                        this.scrollRefreshing = false

                        if (result.start === undefined || result.total === undefined) {
                            this.curPage = this.curPage+1
                            this.totalPage = 1 //到底了
                        } else {
                            this.curPage = result.start
                            this.totalPage = result.total
                        }

                        if (this.totalPage === 0) {
                            showToast("没有数据",NONE)
                        }

                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                    runInAction(()=>{
                        this.scrollRefreshing = false
                    })
                }
            })
    }

    @computed get itemsDataSource() {
        return this.ds.cloneWithRows(this.items.slice())
    }


}
