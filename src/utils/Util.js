import {Toast} from 'antd-mobile'
import {LOAD_ERROR, LOAD_SUCCESS, LOADING} from "../data/const/Constant";

export const showToast = (data,state) => {
    switch (state) {
        case LOADING:
            Toast.loading(data)
            break
        case LOAD_SUCCESS:
            Toast.success(data)
            break
        case LOAD_ERROR:
            Toast.fail(data)
            break
        default:
            Toast.info(data)
            break
    }
}
