import {observable,action} from 'mobx'
import {ListView} from "antd-mobile/lib/index";
import {requestListMovie,BASE_URL} from '../data/net/HttpMovie'
import {LOAD_ERROR, CateItems, NONE} from "../data/const/Constant";
import {showToast} from "../utils/Util";
import {CODE_SUCCESS} from "../data/net/HttpBase";
import {runInAction} from "mobx/lib/mobx";

const FIXED_COUNT = 16;

export default class ListStore {

    @observable title = ''
    @observable scrollRefreshing = false
    @observable curPage = 0
    @observable totalPage = -1
    @observable items = []
    @observable itemsDataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    @action initData = (title) => {
        this.title = title
        this.scrollRefreshing = false
        this.curPage = 0
        this.totalPage = -1
        this.items = []
        this.itemsDataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
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

        requestListMovie(url,this.curPage+1,16)
            .then((result)=>{
                console.log('requestListMovie',result)
                if (result.code === CODE_SUCCESS && result.subjects) {
                    runInAction(()=>{
                        this.items = [...this.items,...result.subjects]
                        console.log('requestListMovie',this.items.length)
                        this.itemsDataSource = this.itemsDataSource.cloneWithRows(this.items)
                        this.scrollRefreshing = false

                        if (!result.start || !result.total) {
                            this.curPage = this.curPage+1
                            this.totalPage = 1 //到底了
                        } else {
                            this.curPage = result.start
                            this.totalPage = result.total
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


}
