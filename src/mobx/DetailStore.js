import {observable,action,runInAction} from 'mobx'
import {requestMovieDetail} from '../data/net/HttpMovie'
import {CODE_SUCCESS} from "../data/net/HttpBase";
import {LOAD_ERROR, NONE} from "../data/const/Constant";
import {showToast} from "../utils/Util";

const ONCE_REQUEST_COUNT = 20
/**
 * 数据放这里是为了实现回退在原来位置
 */
export default class DetailStore {

    @observable baseData = null
    @observable isOpen = false

    @action requestDetailBaseData = (id) => {
        requestMovieDetail(id)
            .then((result)=>{
                console.warn(result)
                if (result.code === CODE_SUCCESS) {
                    runInAction(()=>{
                        this.baseData = result
                    })
                } else {
                    showToast(result.error,LOAD_ERROR)
                }
            })
    }

    @action openIntro = () => {
        this.isOpen = true;
    }

}
