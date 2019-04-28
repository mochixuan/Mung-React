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

export const enterDetailPage = (history,id) => {
    if (id === undefined) {
        showToast('数据ID错误',LOAD_ERROR)
        return
    }
    history.push(`detail/${id}`)
}

export const enterListPage = (history,title) => {
    history.push({
        pathname:`/list`,
        search: `title=${title}`
    })
}

export const analysisUrl = (url) => {
    const paramsObj = {}

    try {
        if (!url) {
            return paramsObj
        } else {
            url = decodeURI(url) //中文乱码
            let startIndex = url.indexOf("?")
            if (startIndex >= 0) {
                url = url.substring(startIndex+1,url.length)
            }

            const paramArray = url.split('&');
            for (let paramStr of paramArray) {
                const keyAndValue = paramStr.split('=')
                paramsObj[keyAndValue[0]] = keyAndValue[1]
            }
        }
    } catch (e) {

    }

    return paramsObj
}
