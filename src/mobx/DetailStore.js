import {observable,action,runInAction} from 'mobx'
import {requestMovieHot} from '../data/net/HttpMovie'
import {CODE_SUCCESS} from "../data/net/HttpBase";
import {LOAD_ERROR, NONE} from "../data/const/Constant";
import {showToast} from "../utils/Util";

const ONCE_REQUEST_COUNT = 20
/**
 * 数据放这里是为了实现回退在原来位置
 */
export default class DetailStore {



    @action requestData = () => {

    }

}
