import {observable} from 'mobx'
import {action} from "mobx/lib/mobx";

export default class HomeStore {

    @observable hotMovieItems = []

    // @observable scrollRefreshing = false
    // @observable bannerIndex = 0
    // @observable curPage = 0
    // @observable totalPage = -1

    @action refreshHotMovieItems = (hotMovieItems) => {
        this.hotMovieItems = hotMovieItems
    }

}
