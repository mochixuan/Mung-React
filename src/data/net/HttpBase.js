const NETWORK_TIMEOUT = 15000; //超时时间15秒

// 数据格式太乱,简单处理一下

export const BaseGetRequest = (urlSuffix) => {
    const opts = {method: 'GET'}
    return timeoutPromise(fetch(urlSuffix,opts),NETWORK_TIMEOUT)
        .then((result)=> errorAnalysis(result))
        .catch((error)=> errorAnalysis(error))

}

const timeoutPromise = (request,timeoutMS) => {
    return new Promise((resolve, reject)=>{
        const requestTimeout = setTimeout(()=>{
            reject(generateErrorData(TIMEOUT_ERROR_CODE))
        },timeoutMS)

        request.then(response => response.json())
            .then((res)=>{
                clearTimeout(requestTimeout)
                res.code = CODE_SUCCESS //全局统一格式
                resolve(res)
            }).catch(()=>{
                reject(generateErrorData(REQUEST_ERROR))
            })
    })
}


export const CODE_SUCCESS = 1   //自定义成功
const REQUEST_ERROR = -100;    //网络请求错误
const TIMEOUT_ERROR_CODE = -101 // 网络超时,请重试!
const INVALID_API_KEY=104; //apikey无线
const BAD_REQUEST = 400; //请求的地址不存在或者包含不支持的参数
const UNAUTHORIZED = 401;  //数据未授权
const FORBIDDEN = 403;  //数据被禁止访问访问
const NOT_FOUND = 404;  //请求的资源不存在或被删除
const INTERNAL_SERVER_ERROR = 500;  //内部错误
const NEED_PERMISSION = 1000;  //数据未授权

const generateErrorData = (code) => {
    return {code: code}
}

const errorAnalysis = (result) => {

    if(!result || result.code === undefined || result.code === null) {
        return {
            code: REQUEST_ERROR,
            error: '网络超时,请重试!',
            data: undefined
        }
    }

    switch (result.code) {
        case CODE_SUCCESS:
            result.error = "请求成功"
            break
        case TIMEOUT_ERROR_CODE:
            result.error = "网络超时,请重试!"
            break
        case REQUEST_ERROR:
            result.error = "网络请求错误";
            break;
        case INVALID_API_KEY:
            result.error = "ApiKey无效了";
            break;
        case BAD_REQUEST:
            result.error = "请求的地址不存在或者包含不支持的参数";
            break;
        case UNAUTHORIZED:
            result.error = "数据未授权";
            break;
        case FORBIDDEN:
            result.error = "数据被禁止访问访问";
            break;
        case NOT_FOUND:
            result.error = "请求的资源不存在或被删除";
            break;
        case INTERNAL_SERVER_ERROR:
            result.error = "内部错误";
            break;
        case NEED_PERMISSION:
            result.error = "数据未授权";
            break;
    }

    return result
}


// webpackDevServer.config.js 配置跨域问题
// package.json 不能配置原因：网上有种说法是react-scripts高版本不支持，未再验证
// "proxy": {
//     // 使用：/api/movie/in_theaters
//     // 访问 ‘/api/movie/in_theaters’ ==> 'https://api.douban.com/v2/movie/in_theaters'
//     "/api": {
//         //代理的目标服务器地址
//         "target": "https://api.douban.com/v2",
//             // https请求需要该设置
//             "secure": false,
//             // 必须设置该项
//             "changeOrigin": true,
//             // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
//             "pathRewrite": {"^/api" : ""}
//     }
// }
